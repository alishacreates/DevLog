"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Laptop, Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccountMenuProps = {
  user: {
    name?: string | null;
    username: string | null;
    image?: string | null;
  };
};

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

export function AccountMenu({ user }: AccountMenuProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
  className="flex cursor-pointer items-center gap-3 rounded-full outline-none"
  aria-label="Open account menu"
      >
        <div className="hidden text-right sm:block">
          <p className="font-section text-xs font-bold uppercase tracking-widest">
            {user.name}
          </p>

          <p className="text-meta text-muted-foreground">
            @{user.username}
          </p>
        </div>

        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "Profile"}
            width={40}
            height={40}
            className="size-10 rounded-full border border-border object-cover transition-colors hover:border-primary"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
            {(user.name ?? user.username ?? "D")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
  align="end"
  sideOffset={8}
  className="w-60 rounded-4xl p-2"
>
        <div className="px-2 py-2">
          <p className="text-sm font-semibold">
            {user.name}
          </p>

          <p className="mt-1 text-meta text-muted-foreground">
            @{user.username}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="rounded-3xl">
  <Link href="/profile" className="w-full">
    View profile
  </Link>
</DropdownMenuItem>

<DropdownMenuItem className="rounded-3xl">
  <Link href="/profile/edit" className="w-full">
    Edit profile
  </Link>
</DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5">
          <p className="text-section-label text-muted-foreground">
            Appearance
          </p>
        </div>

        <div className="space-y-1 px-1">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-3xl px-2 py-2 text-sm transition-colors hover:bg-accent"
            >
              <Icon className="size-4" />

              <span>{label}</span>

              {theme === value ? (
                <Check className="ml-auto size-4 text-primary" />
              ) : null}
            </button>
          ))}
        </div>

        <DropdownMenuSeparator />

        <button
          type="button"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="flex w-full cursor-pointer items-center rounded-3xl px-2 py-2 text-left text-sm text-destructive outline-none transition-colors hover:bg-destructive/10"
        >
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}