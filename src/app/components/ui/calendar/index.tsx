// Calendar/index.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../utils"; // Ajuste o caminho conforme necessário
import { buttonVariants } from "../button"; // Certifique-se de que a rota aponta para o Button refatorado
import styles from "./styles.module.css";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.root, className)}
      classNames={{
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.caption_label,
        nav: styles.nav,
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          styles.nav_button,
        ),
        nav_button_previous: styles.nav_button_previous,
        nav_button_next: styles.nav_button_next,
        table: styles.table,
        head_row: styles.head_row,
        head_cell: styles.head_cell,
        row: styles.row,
        cell: cn(
          styles.cell,
          // Lógica mantida para arredondar cantos em seleção única vs range
          props.mode === "range"
            ? "" // Tratado no CSS via :has(.day_range_start) e .day_range_end
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(buttonVariants({ variant: "ghost" }), styles.day),
        day_range_start: cn(
          "day_range_start",
          styles.day_range_start,
          styles.day_selected,
        ),
        day_range_end: cn(
          "day_range_end",
          styles.day_range_end,
          styles.day_selected,
        ),
        day_selected: styles.day_selected,
        day_today: styles.day_today,
        day_outside: styles.day_outside,
        day_disabled: styles.day_disabled,
        day_range_middle: styles.day_range_middle,
        day_hidden: styles.day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn(styles.icon, className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn(styles.icon, className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
