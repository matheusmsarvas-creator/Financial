// Pagination/index.tsx
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "../utils";
import { buttonVariants } from "../button";
import { VariantProps } from "class-variance-authority";
import styles from "./styles.module.css";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(styles.nav, className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(styles.list, className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

// Corrigindo o tipo: Pegamos as variantes do botão e unimos com as props do link <a>
type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  variant,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : (variant ?? "ghost"),
          size,
        }),
        styles.link,
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  // Destruturamos o size aqui para evitar o erro de "specified more than once"
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      className={cn(styles.linkWithText, styles.linkPrev, className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className={styles.textHidden}>Anterior</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      className={cn(styles.linkWithText, styles.linkNext, className)}
      {...props}
    >
      <span className={styles.textHidden}>Próximo</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontalIcon className={styles.ellipsisIcon} />
      <span className={styles.srOnly}>Mais páginas</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
