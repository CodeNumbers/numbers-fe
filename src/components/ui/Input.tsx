import * as React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  classNames?: {
    container?: string;
    input?: string;
  };
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

function Input(props: Props) {
  const { type, classNames, leftSection, rightSection, ...rest } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2.5 py-1 h-9 rounded-md border border-neutral-300",
        "focus-within:ring-primary focus-within:ring-1 focus-within:border-primary",
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        classNames?.container,
      )}
    >
      {leftSection}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "max-w-[200px] w-full outline-none border-input bg-transparent text-base md:text-sm transition-[color,box-shadow]",
          "file:text-foreground placeholder:text-neutral-400 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          classNames?.input,
        )}
        {...rest}
      />
      {rightSection}
    </div>
  );
}

export { Input };
