"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { deleteDevLogImage } from "../actions/delete-devlog-image";

type DevLogImageUploaderProps = {
  initialImages?: string[];
};

export function DevLogImageUploader({
  initialImages = [],
}: DevLogImageUploaderProps) {


  const inputRef = useRef<HTMLInputElement>(null);
const [images, setImages] = useState<string[]>(initialImages);


  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const remaining = 4 - images.length;

    if (remaining <= 0) {
      setError("You can upload up to 4 images.");
      return;
    }

    const selectedFiles = files.slice(0, remaining);

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `${file.name} is larger than 5 MB.`
          );
        }

        if (
          ![
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ].includes(file.type)
        ) {
          throw new Error(
            `${file.name} is not a supported image type.`
          );
        }

        const blob = await upload(
  `devlogs/tmp/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl:
              "/api/devlog-images/upload",
          }
        );

        uploadedUrls.push(blob.url);
      }

      setImages((current) => [
        ...current,
        ...uploadedUrls,
      ]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

 async function removeImage(url: string) {
  const isExistingImage = initialImages.includes(url);

  // Existing edit image:
  // only remove from form state.
  // update-devlog.ts will delete Blob after Save.
  if (isExistingImage) {
    setImages((current) =>
      current.filter((image) => image !== url)
    );
    return;
  }

  // Newly uploaded image:
  // delete immediately because nothing references it yet.
  try {
    await deleteDevLogImage(url);

    setImages((current) =>
      current.filter((image) => image !== url)
    );
  } catch (error) {
    console.error(error);
    setError("Could not remove image.");
  }
}

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            Screenshots
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Add up to 4 images. PNG, JPG, WebP or GIF.
          </p>
        </div>

        <button
          type="button"
          disabled={uploading || images.length >= 4}
          onClick={() => inputRef.current?.click()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ImagePlus className="size-4" />

          {uploading ? "Uploading..." : "Add image"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {images.length > 0 ? (
        <div
          className={
            images.length === 1
              ? "grid grid-cols-1 gap-2"
              : "grid grid-cols-2 gap-2"
          }
        >
          {images.map((url) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-xl border border-border bg-muted"
            >
              <Image
                src={url}
                alt="DevLog screenshot"
                width={800}
                height={600}
                className="aspect-video w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:text-destructive"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {images.map((url) => (
        <input
          key={url}
          type="hidden"
          name="images"
          value={url}
        />
      ))}
    </div>
  );
}