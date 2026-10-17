"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!rounded-full !border-transparent !px-5 !py-3 !shadow-lg",

          default:
            "!bg-primary !text-primary-foreground dark:!bg-accent-warm dark:!text-[#101513]",

          success:
            "!bg-success !text-success-foreground",

          error:
            "!bg-destructive !text-white",

          title:
            "!text-sm !font-semibold !text-current",

          description:
            "!text-xs !text-current !opacity-75",

          closeButton:
            "!border-current !bg-transparent !text-current",
        },
      }}
    />
  );
}