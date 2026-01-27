"use client";

import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import {
  Folder,
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar";

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

const projectMenuHandle = createDropdownMenuHandle<Project>();

export function NavProjects({ projects }: { projects: Project[] }) {
  const { isMobile } = useSidebar();

  return (
    <>
      <SidebarGroup className="group-data-[state=collapsed]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                render={
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                    <SidebarMenuAction
                      render={
                        <DropdownMenuTrigger
                          handle={projectMenuHandle}
                          id={item.name}
                          payload={item}
                        />
                      }
                      showOnHover
                    >
                      <MoreHorizontal className="text-sidebar-foreground/70" />
                    </SidebarMenuAction>
                  </a>
                }
              ></SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <DropdownMenu handle={projectMenuHandle}>
        {({ payload: project }) => {
          return (
            <DropdownMenuContent
              align={isMobile ? "end" : "start"}
              className="w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
            >
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>{project?.name}</DropdownMenuGroupLabel>
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant={"destructive"}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          );
        }}
      </DropdownMenu>
    </>
  );
}
