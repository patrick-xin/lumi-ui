"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    href: "/docs/components/alert-dialog",
    title: "Alert Dialog",
  },
  {
    description:
      "For sighted users to preview content available behind a link.",
    href: "/docs/components/hover-card",
    title: "Hover Card",
  },
  {
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    href: "/docs/components/progress",
    title: "Progress",
  },
  {
    description: "Visually or semantically separates content.",
    href: "/docs/components/scroll-area",
    title: "Scroll-area",
  },
  {
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    href: "/docs/components/tabs",
    title: "Tabs",
  },
  {
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    href: "/docs/components/tooltip",
    title: "Tooltip",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                  href="/"
                >
                  <div className="mb-2 text-lg font-medium sm:mt-4">
                    Lumi UI
                  </div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Optimized for Agents. Built for Humans.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Base UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  href={component.href}
                  key={component.title}
                  title={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/docs">Docs</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  }
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink render={<Link href="#">Components</Link>} />
                <NavigationMenuLink
                  render={<Link href="#">Documentation</Link>}
                />
                <NavigationMenuLink render={<Link href="#">Blocks</Link>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink
                  render={
                    <Link className="flex-row items-center gap-2" href="#">
                      <CircleHelpIcon />
                      Backlog
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link className="flex-row items-center gap-2" href="#">
                      <CircleIcon />
                      To Do
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link className="flex-row items-center gap-2" href="#">
                      <CircleCheckIcon />
                      Done
                    </Link>
                  }
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        }
      />
    </li>
  );
}
