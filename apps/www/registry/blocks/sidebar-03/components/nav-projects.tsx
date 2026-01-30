"use client";

import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";
import {
  createDropdownMenuHandle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/ui/sidebar";
import { toast } from "@/registry/ui/toast";
import {
  Folder,
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

const projectMenuHandle = createDropdownMenuHandle<Project>();
const deleteProjectDialogHandle = createDialogHandle<Project>();

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
                <DropdownMenuItem
                  onClick={() => {
                    if (project) {
                      deleteProjectDialogHandle.openWithPayload(project);
                    }
                  }}
                  variant={"destructive"}
                >
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          );
        }}
      </DropdownMenu>
      <Dialog handle={deleteProjectDialogHandle}>
        {({ payload: project }) => {
          return (
            <DialogContent layout="center">
              <DialogHeader>
                <DialogTitle>
                  Delete
                  <span className="ml-2 text-destructive/80">
                    {project?.name}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <DialogClose
                  onClick={() =>
                    toast.promise(
                      new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                          const shouldSucceed = Math.random() > 0.1;
                          if (shouldSucceed) {
                            resolve();
                          } else {
                            reject(
                              new Error(`Failed to delete ${project?.name}.`),
                            );
                          }
                        }, 1500);
                      }),
                      {
                        error: (err: Error) => {
                          return { description: err.message, title: "Error" };
                        },
                        loading: { title: `Deleting ${project?.name}...` },
                        success: () => {
                          return {
                            description: " Drag top/right to close",
                            title: `${project?.name} deleted`,
                          };
                        },
                      },
                    )
                  }
                  render={<Button variant="destructive">Delete</Button>}
                />
              </DialogFooter>
            </DialogContent>
          );
        }}
      </Dialog>
    </>
  );
}
