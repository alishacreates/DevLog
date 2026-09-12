"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-1">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm transition-colors hover:bg-accent"
        >
          <Icon className="size-4" />

          <span>{label}</span>

          {theme === value ? (
            <Check className="ml-auto size-4 text-primary" />
          ) : null}
        </button>
      ))}
    </div>
  );
}