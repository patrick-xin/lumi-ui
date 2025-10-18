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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/registry/ui/dialog";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSubMenu,
  MenuSubMenuPopup,
  MenuSubMenuTrigger,
  MenuTrigger,
} from "@/registry/ui/menu";

export function MenuDemo() {
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("modified");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <Button variant="outline">
              View Options <ChevronDown className="ml-2 size-4" />
            </Button>
          }
        />
        <MenuPopup align="start">
          <MenuItem>
            <FilePlus className="size-4" />
            <span>New File</span>
            <MenuShortcut>⌘N</MenuShortcut>
          </MenuItem>
          <MenuSubMenu>
            <MenuSubMenuTrigger>
              <Share2 className="size-4" />
              <span>Share</span>
            </MenuSubMenuTrigger>
            <MenuSubMenuPopup>
              <MenuItem>
                <ClipboardIcon />
                Copy Link
              </MenuItem>
              <MenuItem
                render={
                  <Link href="/settings/sharing" className="w-full">
                    <Settings className="size-4" />
                    <span>Sharing Settings...</span>
                  </Link>
                }
              />
            </MenuSubMenuPopup>
          </MenuSubMenu>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Editor Layout</MenuGroupLabel>
            <MenuCheckboxItem
              checked={showMinimap}
              onCheckedChange={setShowMinimap}
            >
              {showMinimap ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
              <span>Show Minimap</span>
            </MenuCheckboxItem>
            <MenuCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
              <WrapText className="size-4" />
              <span>Enable Word Wrap</span>
            </MenuCheckboxItem>
            <MenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
              disabled
            >
              <Eye className="size-4" />
              <span>Show Status Bar (Locked)</span>
            </MenuCheckboxItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Sort Files By</MenuGroupLabel>
            <MenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <MenuRadioItem value="modified">Last Modified</MenuRadioItem>
              <MenuRadioItem value="created">Date Created</MenuRadioItem>
              <MenuRadioItem value="alpha">Alphabetical</MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="size-4" />
            <span>Delete Workspace...</span>
          </MenuItem>
        </MenuPopup>
      </Menu>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogPopup>
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
        </DialogPopup>
      </Dialog>
    </>
  );
}
