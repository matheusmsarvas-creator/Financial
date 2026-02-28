// Skeleton/index.tsx
import * as React from "react";
import { cn } from "../utils";
import styles from "./styles.module.css";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

export { Skeleton };
