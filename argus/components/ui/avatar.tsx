import * as React from "react";

// Avatar component displays a circular user image
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt = "", className = "", ...props }: AvatarProps) {
  return (
    <div
      className={`h-8 w-8 overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      {src && <img src={src} alt={alt} className="h-full w-full object-cover" />}
    </div>
  );
}
