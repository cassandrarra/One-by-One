import { Toaster as Sonner, toast } from "sonner";

import { cn } from "@/lib/utils";

export const TOAST_DURATION_MS = 3000;

/** The visual toast. Exported so /preview can show it in place. */
export function ToastMessage({ message, className }: { message: string; className?: string }) {
  return (
    <div
      className={cn(
        "w-full rounded-card border border-primary bg-primary-tint px-4 py-3 text-text type-body",
        className,
      )}
    >
      {message}
    </div>
  );
}

/** Shows a toast at the bottom that goes away after 3 seconds. */
export function showToast(message: string) {
  return toast.custom(() => <ToastMessage message={message} />, { duration: TOAST_DURATION_MS });
}

/** Mount once in the app shell. */
export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      duration={TOAST_DURATION_MS}
      offset={{ bottom: "6rem" }}
      mobileOffset={{ bottom: "6rem", left: "1.25rem", right: "1.25rem" }}
      toastOptions={{ unstyled: true, className: "w-full" }}
    />
  );
}
