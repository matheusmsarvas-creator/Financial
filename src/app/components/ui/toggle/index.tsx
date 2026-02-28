// Toggle/index.tsx
"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";
import styles from "./styles.module.css";

const toggleVariants = cva(styles.toggle, {
  variants: {
    variant: {
      default: styles.variant_default,
      outline: styles.variant_outline,
    },
    size: {
      default: styles.size_default,
      sm: styles.size_sm,
      lg: styles.size_lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
