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
  DropdownMenuCheckboxItemContent,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItemContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTriggerGroup,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";

export function DropdownMenuDemo() {
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
            <Button className="w-60 justify-between">
              View Options <ChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent align="start" showArrow>
          <DropdownMenuItem>
            <FilePlus className="size-4" />
            <span>New File</span>
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTriggerGroup>
              <Share2 className="size-4" />
              <span>Share</span>
            </DropdownMenuSubMenuTriggerGroup>
            <DropdownMenuSubMenuContent>
              <DropdownMenuItem>
                <ClipboardIcon />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link className="w-full" href="/settings/sharing">
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
            <DropdownMenuCheckboxItemContent
              checked={showMinimap}
              onCheckedChange={setShowMinimap}
            >
              {showMinimap ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
              <span>Show Minimap</span>
            </DropdownMenuCheckboxItemContent>
            <DropdownMenuCheckboxItemContent
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            >
              <WrapText className="size-4" />
              <span>Enable Word Wrap</span>
            </DropdownMenuCheckboxItemContent>
            <DropdownMenuCheckboxItemContent
              checked={showStatusBar}
              disabled
              onCheckedChange={setShowStatusBar}
            >
              <Eye className="size-4" />
              <span>Show Status Bar (Locked)</span>
            </DropdownMenuCheckboxItemContent>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Sort Files By</DropdownMenuGroupLabel>
            <DropdownMenuRadioGroup onValueChange={setSortBy} value={sortBy}>
              <DropdownMenuRadioItemContent value="modified">
                Last Modified
              </DropdownMenuRadioItemContent>
              <DropdownMenuRadioItemContent value="created">
                Date Created
              </DropdownMenuRadioItemContent>
              <DropdownMenuRadioItemContent value="alpha">
                Alphabetical
              </DropdownMenuRadioItemContent>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            variant="destructive"
          >
            <Trash2 className="size-4" />
            <span>Delete Workspace...</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog onOpenChange={setDeleteDialogOpen} open={isDeleteDialogOpen}>
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
              onClick={() => setDeleteDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setDeleteDialogOpen(false);
              }}
              variant="destructive"
            >
              Yes, delete workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
