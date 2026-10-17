"use client";

import {
  useState,
} from "react";
import {
  Bold,
  Code2,
  FileCode2,
  Italic,
  Link2,
} from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import type { ReactNode } from "react";

type RichCommentEditorProps = {
  compact?: boolean;
  footerAction?: ReactNode;
  onTextChange?: (text: string) => void;
};

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        aria-label={label}
        className={`
          inline-flex size-7 items-center justify-center
          rounded-md transition-colors
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary/30
          disabled:pointer-events-none
          disabled:opacity-35
          dark:focus-visible:ring-accent-warm/30
          ${
            active
              ? "bg-primary/10 text-primary dark:bg-accent-warm/10 dark:text-accent-warm"
              : "text-muted-foreground hover:bg-muted hover:text-primary dark:hover:text-accent-warm"
          }
        `}
      >
        {children}
      </button>

      <span
        role="tooltip"
        className="
          pointer-events-none absolute
          bottom-full left-1/2 z-20
          mb-2 -translate-x-1/2
          whitespace-nowrap rounded-md
          border border-border
          bg-foreground px-2 py-1
          text-[10px] font-medium
          text-background shadow-md

          opacity-0
          transition-opacity

          group-hover:opacity-100
          group-focus-within:opacity-100
        "
      >
        {label}
      </span>
    </div>
  );
}
export function RichCommentEditor({
  compact = false,
  footerAction,
  onTextChange,
}: RichCommentEditorProps) {
    
  const [plainText, setPlainText] =
    useState("");

  const [contentJson, setContentJson] =
    useState("");

  const [linkOpen, setLinkOpen] =
    useState(false);

  const [linkUrl, setLinkUrl] =
    useState("");

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        horizontalRule: false,
        strike: false,
      }),

      Link.configure({
        openOnClick: false,
        autolink: false,
        linkOnPaste: false,
        protocols: ["http", "https"],
      }),

      Placeholder.configure({
        placeholder: "Add to the discussion...",
      }),
    ],

    editorProps: {
      attributes: {
       class: compact
  ? "min-h-[34px] max-h-[120px] overflow-y-auto outline-none font-section text-sm leading-6"
  : "min-h-[82px] max-h-[220px] overflow-y-auto outline-none font-section text-sm leading-6",
      },
    },

    onUpdate({ editor }) {
      const text = editor
        .getText({
          blockSeparator: "\n",
        })
        .trim();
        
      onTextChange?.(text);
      setPlainText(text);
      setContentJson(
        JSON.stringify(editor.getJSON()),
      );
    },
  });


  if (!editor) {
    return null;
  }

  const activeEditor = editor;

  const hasSelection =
  activeEditor.state.selection.from !==
  activeEditor.state.selection.to;

  function openLinkEditor() {
    if (!hasSelection) {
      return;
    }

    const existing =
  activeEditor.getAttributes("link").href ?? "";

    setLinkUrl(existing);
    setLinkOpen(true);
  }

  function applyLink() {
    const url = linkUrl.trim();

    if (!url) {
  activeEditor
    .chain()
    .focus()
    .unsetLink()
    .run();

  setLinkOpen(false);
  return;
}

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      return;
    }

    activeEditor
  .chain()
  .focus()
  .setLink({
    href: url,
  })
  .run();

    setLinkOpen(false);
  }

  return (
    <>
      <input
        type="hidden"
        name="content"
        value={plainText}
      />

      <input
        type="hidden"
        name="contentJson"
        value={contentJson}
      />

      <EditorContent
        editor={activeEditor}
        className="
          [&_.tiptap]:text-foreground
          [&_.tiptap_p]:my-0

          [&_.tiptap_code]:rounded-md
          [&_.tiptap_code]:bg-muted
          [&_.tiptap_code]:px-1.5
          [&_.tiptap_code]:py-0.5
          [&_.tiptap_code]:font-mono
          [&_.tiptap_code]:text-[0.9em]

          [&_.tiptap_pre]:my-2
          [&_.tiptap_pre]:overflow-x-auto
          [&_.tiptap_pre]:rounded-xl
          [&_.tiptap_pre]:border
          [&_.tiptap_pre]:border-border
          [&_.tiptap_pre]:bg-muted/60
          [&_.tiptap_pre]:p-3
          [&_.tiptap_pre]:font-mono
          [&_.tiptap_pre]:text-xs
        "
      />

      <div
        className="
          mt-2 flex items-center
          justify-between gap-3
          border-t border-border/60 pt-2
        "
      >
        <div className="flex items-center gap-0.5">
          <ToolbarButton
            label="Bold"
            active={activeEditor.isActive("bold")}
            onClick={() =>
              activeEditor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
          >
            <Bold className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            label="Italic"
            active={activeEditor.isActive("italic")}
            onClick={() =>
              activeEditor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
          >
            <Italic className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            label="Inline code"
            active={activeEditor.isActive("code")}
            onClick={() =>
              activeEditor
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
          >
            <Code2 className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            label="Code block"
            active={activeEditor.isActive(
              "codeBlock",
            )}
            onClick={() =>
              activeEditor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
          >
            <FileCode2 className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            label={
              hasSelection
                ? "Add link"
                : "Select text to add link"
            }
            disabled={!hasSelection}
            active={activeEditor.isActive("link")}
            onClick={openLinkEditor}
          >
            <Link2 className="size-3.5" />
          </ToolbarButton>
        </div>
<div className="flex items-center gap-3">
  {plainText.length > 1000 ? (
    <span className="text-xs font-medium text-destructive">
      Comment is too long
    </span>
  ) : null}

  {footerAction}
</div>
      </div>

      {linkOpen ? (
        <div
          className="
            mt-2 flex items-center gap-2
            rounded-lg border border-border
            bg-background p-2
          "
        >
          <input
            type="url"
            value={linkUrl}
            onChange={(event) =>
              setLinkUrl(
                event.target.value,
              )
            }
            placeholder="https://example.com"
            className="
              min-w-0 flex-1 bg-transparent
              px-2 py-1 text-xs
              outline-none
              placeholder:text-muted-foreground/60
            "
          />

          <button
            type="button"
            onClick={applyLink}
            className="
              rounded-full bg-primary
              px-3 py-1.5
              font-section text-[9px]
              font-bold uppercase
              tracking-widest
              text-primary-foreground
              dark:bg-accent-warm
              dark:text-[#101513]
            "
          >
            Apply
          </button>

          <button
            type="button"
            onClick={() =>
              setLinkOpen(false)
            }
            className="
              px-2 py-1 text-xs
              text-muted-foreground
              hover:text-foreground
            "
          >
            Cancel
          </button>
        </div>
      ) : null}
    </>
  );
}