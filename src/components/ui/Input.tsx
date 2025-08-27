import * as React from 'react';

import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'input'> {
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
        'flex items-center gap-2 px-2.5 py-1 h-9 w-full',
        'rounded-md border border-input shadow-xs',
        'focus-within:border focus-within:border-primary',
        'selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
        classNames?.container
      )}
    >
      {leftSection}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'text-base placeholder:text-neutral-400',
          'w-full outline-none border-input bg-transparent transition-[color,box-shadow]',
          'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          classNames?.input
        )}
        {...rest}
      />
      {rightSection}
    </div>
  );
}

export { Input };
