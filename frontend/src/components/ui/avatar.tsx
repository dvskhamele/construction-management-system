import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Avatar = ({ children, className = '', ...props }: AvatarProps) => {
  return (
    <span
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const AvatarFallback = ({ children, className = '', ...props }: AvatarFallbackProps) => {
  return (
    <span
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export { Avatar, AvatarFallback };
export type { AvatarProps, AvatarFallbackProps };