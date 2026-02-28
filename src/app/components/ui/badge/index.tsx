// Badge/index.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils"; // Ajuste o caminho do utilitário
import styles from "./styles.module.css";

const badgeVariants = cva(
  styles.base, // Nossa classe base
  {
    variants: {
      variant: {
        default: styles.variantDefault,
        secondary: styles.variantSecondary,
        destructive: styles.variantDestructive,
        outline: styles.variantOutline,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
