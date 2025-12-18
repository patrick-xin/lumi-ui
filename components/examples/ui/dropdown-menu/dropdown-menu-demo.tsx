"use client";

import {
  ChevronDown,
  ClipboardIcon,
  Eye,
  EyeOff,
  FilePlus,
  Settings,
  Share2,
  Trash2,
  WrapText,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function MenuDemo() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("modified");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="secondary" className="w-60">
              View Options <ChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <FilePlus className="size-4" />
            <span>New File</span>
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>
              <Share2 className="size-4" />
              <span>Share</span>
            </DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuItem>
                <ClipboardIcon />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link href="/settings/sharing" className="w-full">
                    <Settings className="size-4" />
                    <span>Sharing Settings...</span>
                  </Link>
                }
              />
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Editor Layout</DropdownMenuGroupLabel>
            <DropdownMenuCheckboxItem
              checked={showMinimap}
              onCheckedChange={setShowMinimap}
            >
              {showMinimap ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
              <span>Show Minimap</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            >
              <WrapText className="size-4" />
              <span>Enable Word Wrap</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
              disabled
            >
              <Eye className="size-4" />
              <span>Show Status Bar (Locked)</span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Sort Files By</DropdownMenuGroupLabel>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="modified">
                Last Modified
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="created">
                Date Created
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="alpha">
                Alphabetical
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="size-4" />
            <span>Delete Workspace...</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              entire workspace and all of its contents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteDialogOpen(false);
              }}
            >
              Yes, delete workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
