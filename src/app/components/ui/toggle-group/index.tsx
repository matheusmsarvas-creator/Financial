// ToggleGroup/index.tsx
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "../utils";
import styles from "./styles.module.css";

// Criamos um contexto simples para gerenciar variantes e tamanhos se necessário
const ToggleGroupContext = React.createContext<{
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
}>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(styles.root, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(styles.item, className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
