"use client";

import type { DialogRootChangeEventDetails } from "@base-ui/react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
} from "@/registry/ui/alert-dialog";
import { Badge } from "@/registry/ui/badge";
import { MemberCard } from "@/registry/blocks/dialog-01/components/member-card";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Label } from "@/registry/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItemContent,
  SelectTriggerGroup,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { toast } from "@/registry/ui/toast";
import {
  ChevronsUpDownIcon,
  Eye,
  Loader2,
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import * as React from "react";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  initials: string;
};

const menuHandle = createDropdownMenuHandle<TeamMember>();
const editMemberDialogHandle = createDialogHandle<TeamMember>();
const removeMemberDialogHandle = createDialogHandle<TeamMember>();
const confirmDeleteDialogHandle = createAlertDialogHandle<TeamMember>();
const closeConfirmDialogHandle = createAlertDialogHandle();

export function TeamManagement() {
  const [members, setMembers] =
    React.useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [selectedRole, setSelectedRole] = React.useState<
    TeamMember["role"] | null
  >(null);
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(
    null,
  );
  const [editOpen, setEditOpen] = React.useState(false);
  const [editTriggerId, setEditTriggerId] = React.useState<string | null>(null);

  const [removeOpen, setRemoveOpen] = React.useState(false);
  const [removeTriggerId, setRemoveTriggerId] = React.useState<string | null>(
    null,
  );

  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [confirmDeleteTriggerId, setConfirmDeleteTriggerId] = React.useState<
    string | null
  >(null);

  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleReset = () => {
    setMembers(INITIAL_TEAM_MEMBERS);
    setSelectedRole(null);
  };

  const handleDeleteMember = async (memberId: string) => {
    setIsDeleting(true);

    toast.promise(
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const shouldSucceed = Math.random() > 0.1;
          if (shouldSucceed) {
            setMembers((prev) => prev.filter((m) => m.id !== memberId));
            resolve();
          } else {
            reject(new Error("Failed to delete member."));
          }
        }, 1500);
      }),
      {
        error: (err: Error) => {
          setIsDeleting(false);
          return { description: err.message, title: "Error" };
        },
        loading: { title: "Deleting member..." },
        success: () => {
          setConfirmDeleteOpen(false);
          setRemoveOpen(false);
          setIsDeleting(false);
          return {
            description: "Member deleted successfully",
            title: "Success",
          };
        },
      },
    );
  };

  const handleUpdateRole = async (
    memberId: string,
    newRole: TeamMember["role"],
  ) => {
    setIsUpdating(true);

    toast.promise(
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const shouldSucceed = Math.random() > 0.1;
          if (shouldSucceed) {
            setMembers((prev) =>
              prev.map((m) =>
                m.id === memberId ? { ...m, role: newRole } : m,
              ),
            );
            resolve();
          } else {
            reject(new Error("Failed to update role."));
          }
        }, 1500);
      }),
      {
        error: (err: Error) => {
          setIsUpdating(false);
          return { description: err.message, title: "Error" };
        },
        loading: { title: "Updating role..." },
        success: () => {
          setEditOpen(false);
          setSelectedRole(null);
          setIsUpdating(false);
          return { description: "Role updated successfully", title: "Success" };
        },
      },
    );
  };

  const handleConfirmDiscard = () => {
    closeConfirmDialogHandle.close();
    setEditOpen(false);
    setSelectedRole(null);
  };

  const handleEditDialogChange = (
    isOpen: boolean,
    eventDetails: DialogRootChangeEventDetails,
  ) => {
    if (!isOpen && selectedRole !== null && editingMember) {
      if (selectedRole !== editingMember.role) {
        closeConfirmDialogHandle.open(null);
        return; // Prevents the dialog from closing
      }
    }

    setEditOpen(isOpen);

    if (isOpen) {
      setEditTriggerId(eventDetails.trigger?.id ?? null);
    } else {
      setSelectedRole(null);
      setEditingMember(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-md">
      <div className="flex justify-between p-6">
        <div className="space-y-2">
          <div className="text-lg font-semibold">Team Members</div>
          <div className="text-sm text-muted-foreground">
            Manage your team members and their account permissions.
          </div>
        </div>
        <Button onClick={handleReset} size="sm" variant="outline">
          Reset
        </Button>
      </div>
      <Separator />

      <div className="flex flex-col gap-6 p-6 min-h-140">
        {members.map((member) => (
          <div
            className="flex items-center justify-between space-x-4"
            key={member.id}
          >
            <MemberCard member={member} />
            <div className="flex items-center gap-3">
              <Badge
                variant={member.role === "Admin" ? "default" : "secondary"}
              >
                {member.role}
              </Badge>

              {/* Detached Trigger */}
              <DropdownMenuTrigger
                handle={menuHandle}
                payload={member}
                render={(props, state) => {
                  return (
                    <Button
                      className={cn(state.open && "bg-accent hover:bg-accent!")}
                      size="icon-xs"
                      variant={"ghost"}
                      {...props}
                    >
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">
                        Open menu for {member.name}
                      </span>
                    </Button>
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <DropdownMenu handle={menuHandle}>
        {({ payload: member }) => (
          <DropdownMenuContent
            align="center"
            className="w-40"
            matchAnchorWidth={false}
          >
            <DropdownMenuItem
              onClick={() => {
                setEditingMember(member as TeamMember);
                editMemberDialogHandle.openWithPayload(member as TeamMember);
              }}
            >
              <Eye className="size-4" />
              <span>View member</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                removeMemberDialogHandle.openWithPayload(member as TeamMember)
              }
              variant="destructive"
            >
              <Trash2 className="size-4" />
              <span>Delete member</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog
        handle={editMemberDialogHandle}
        onOpenChange={handleEditDialogChange}
        open={editOpen}
        triggerId={editTriggerId}
      >
        {({ payload }) => {
          const currentRole = selectedRole || payload?.role;
          const isDirty = currentRole !== payload?.role;
          const isSaveDisabled = isUpdating || !isDirty;
          return (
            <DialogContent layout="stacked" showCloseButton>
              <DialogHeader>
                <DialogTitle>Edit Permissions</DialogTitle>
                {payload && (
                  <DialogDescription>
                    Change the access level for{" "}
                    <span className="font-medium text-foreground">
                      {payload.name}
                    </span>
                  </DialogDescription>
                )}
              </DialogHeader>
              {payload && (
                <div className="grid gap-6 py-4">
                  <MemberCard member={payload} />

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      disabled={isUpdating}
                      onValueChange={(value) =>
                        setSelectedRole(value as TeamMember["role"])
                      }
                      value={currentRole}
                    >
                      <SelectTriggerGroup
                        indicatorIcon={<ChevronsUpDownIcon />}
                      />
                      <SelectContent alignItemWithTrigger>
                        <SelectItemContent value="Admin">
                          <ShieldAlert className="size-4 opacity-50" />
                          <span>Admin</span>
                        </SelectItemContent>
                        <SelectItemContent value="Member">
                          <ShieldCheck className="size-4 opacity-50" />
                          <span>Member</span>
                        </SelectItemContent>
                        <SelectItemContent value="Viewer">
                          <User className="size-4 opacity-50" />
                          <span>Viewer</span>
                        </SelectItemContent>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <DialogFooter>
                <DialogClose
                  disabled={isUpdating}
                  render={<Button variant="outline" />}
                >
                  Cancel
                </DialogClose>
                <Button
                  disabled={isSaveDisabled}
                  onClick={() => {
                    if (payload && currentRole) {
                      handleUpdateRole(payload.id, currentRole);
                    }
                  }}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
              {/* Discard Confirmation */}
              <AlertDialog handle={closeConfirmDialogHandle}>
                <AlertDialogContent layout="stacked">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. Are you sure you want to close?
                      The changes you made will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose variant="outline">
                      No, Keep Editing
                    </AlertDialogClose>
                    <Button
                      onClick={handleConfirmDiscard}
                      variant="destructive"
                    >
                      Yes, Discard
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogContent>
          );
        }}
      </Dialog>

      {/* Remove Dialog */}
      <Dialog
        handle={removeMemberDialogHandle}
        onOpenChange={(open, event) => {
          setRemoveOpen(open);
          if (open) setRemoveTriggerId(event.trigger?.id ?? null);
        }}
        open={removeOpen}
        triggerId={removeTriggerId}
      >
        {({ payload }) => (
          <DialogContent layout="stacked">
            <DialogHeader>
              <DialogTitle>Remove Member</DialogTitle>
              <DialogDescription>
                Review the member details before removing.
              </DialogDescription>
            </DialogHeader>
            {payload && <MemberCard member={payload} />}
            <DialogFooter>
              <DialogClose
                render={
                  <Button disabled={isDeleting} variant="outline">
                    Cancel
                  </Button>
                }
              />
              <AlertDialogTrigger
                handle={confirmDeleteDialogHandle}
                id={`confirm-delete-trigger-${payload?.id}`}
                payload={payload}
                render={
                  <Button disabled={isDeleting} variant="destructive">
                    Delete Member
                  </Button>
                }
              />
            </DialogFooter>

            {/* Confirm Delete Dialog */}
            <AlertDialog
              handle={confirmDeleteDialogHandle}
              onOpenChange={(open, event) => {
                setConfirmDeleteOpen(open);
                if (open) setConfirmDeleteTriggerId(event.trigger?.id ?? null);
              }}
              open={confirmDeleteOpen}
              triggerId={confirmDeleteTriggerId}
            >
              {({ payload: confirmPayload }) => (
                <AlertDialogContent layout="stacked">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove{" "}
                      <span className="font-medium text-foreground">
                        {confirmPayload?.name}
                      </span>{" "}
                      from the team.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose
                      disabled={isDeleting}
                      onClick={() => {
                        setConfirmDeleteOpen(false);
                      }}
                      variant="outline"
                    >
                      Cancel
                    </AlertDialogClose>
                    <Button
                      disabled={isDeleting}
                      onClick={() => {
                        if (confirmPayload) {
                          handleDeleteMember(confirmPayload.id);
                        }
                      }}
                      variant="destructive"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Confirm Deletion"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    email: "sofia@example.com",
    id: "1",
    initials: "SD",
    name: "Sofia Davis",
    role: "Admin",
  },
  {
    email: "jackson@example.com",
    id: "2",
    initials: "JL",
    name: "Jackson Lee",
    role: "Member",
  },
  {
    email: "isabella@example.com",
    id: "3",
    initials: "IN",
    name: "Isabella Nguyen",
    role: "Viewer",
  },
  {
    email: "lucy@example.com",
    id: "4",
    initials: "LU",
    name: "Lucy Wang",
    role: "Member",
  },
  {
    email: "matt@example.com",
    id: "5",
    initials: "MA",
    name: "Matthew Brown",
    role: "Viewer",
  },
  {
    email: "alex@example.com",
    id: "6",
    initials: "AL",
    name: "Alexander Johnson",
    role: "Admin",
  },
  {
    email: "allen@example.com",
    id: "7",
    initials: "AL",
    name: "Allen Lee",
    role: "Member",
  },
];
