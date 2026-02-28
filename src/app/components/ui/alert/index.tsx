// Alert/index.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";
import styles from "./styles.module.css";

const alertVariants = cva(
  styles.alert, // Classe base
  {
    variants: {
      variant: {
        default: styles.default,
        destructive: styles.destructive,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(styles.title, className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
