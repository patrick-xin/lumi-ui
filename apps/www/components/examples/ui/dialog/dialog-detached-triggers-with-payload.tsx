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
  DialogTrigger,
} from "@/registry/ui/dialog";

type User = {
  id: number;
  name: string;
  role: string;
};

// The payload can be strongly typed by providing a type argument to the `createDialogHandle()` function.
const editUserDialogHandle = createDialogHandle<User>();

const USERS: User[] = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
  { id: 3, name: "Charlie", role: "Viewer" },
];

export default function UserList() {
  return (
    <div>
      <div className="flex gap-2">
        {USERS.map((user) => (
          <DialogTrigger
            key={user.id}
            handle={editUserDialogHandle}
            payload={user}
            render={<Button>Edit {user.name}</Button>}
          />
        ))}
      </div>
      <Dialog handle={editUserDialogHandle}>
        {({ payload }) => (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {payload?.name}?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete item ID:{" "}
                <span className="font-semibold text-primary">
                  {payload?.id}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button>Yes, Delete</Button>} />
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
