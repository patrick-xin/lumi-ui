"use client";

import { SearchForm } from "@lumi-ui/ui/blocks/sidebar-05/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lumi-ui/ui/breadcrumb";
import { Button } from "@lumi-ui/ui/button";
import { Separator } from "@lumi-ui/ui/separator";
import { useSidebar } from "@lumi-ui/ui/sidebar";
import { SidebarIcon } from "lucide-react";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
        >
          <SidebarIcon />
        </Button>
        <Separator className="mr-2 h-4" orientation="vertical" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
