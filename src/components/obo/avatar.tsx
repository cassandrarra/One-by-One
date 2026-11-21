import { useState } from "react";

import { cn } from "@/lib/utils";

export type AvatarSize = 40 | 64 | 96;

const sizeClass: Record<AvatarSize, string> = {
  40: "size-10 text-[1rem]",
  64: "size-16 text-[1.625rem]",
  96: "size-24 text-[2.5rem]",
};

type AvatarProps = {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
};

/** Round photo; falls back to the first initial when there's no photo. */
export function Avatar({ name, src, size = 64, className }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPhoto = Boolean(src) && failedSrc !== src;
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-tint font-display font-semibold leading-none text-text",
        sizeClass[size],
        className,
      )}
    >
      {showPhoto ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          onError={() => setFailedSrc(src ?? null)}
        />
      ) : (
        <span role="img" aria-label={name}>
          {initial}
        </span>
      )}
    </span>
  );
}
