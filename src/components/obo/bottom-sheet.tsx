import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Drawer } from "vaul";

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Slides up from the bottom, dims the screen, closes on swipe down, backdrop tap, Escape or the close button. */
export function BottomSheet({ open, onOpenChange, title, description, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-text/40" />
        <Drawer.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90dvh] w-full max-w-app flex-col rounded-t-card bg-surface text-text shadow-soft outline-none"
        >
          <div aria-hidden className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-border" />
          <div className="flex items-start gap-3 px-5 pt-3">
            <div className="min-w-0 flex-1 pt-2">
              <Drawer.Title className="type-h2">{title}</Drawer.Title>
              {description ? (
                <Drawer.Description className="mt-1 text-text-muted type-body">
                  {description}
                </Drawer.Description>
              ) : null}
            </div>
            <Drawer.Close
              aria-label="Close"
              className="focus-ring -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-text pressed:bg-border"
            >
              <X aria-hidden className="size-5" />
            </Drawer.Close>
          </div>
          <div className="overflow-y-auto px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
