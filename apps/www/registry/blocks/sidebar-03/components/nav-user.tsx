"use client";

import {
  BookIcon,
  ChevronsUpDown,
  LogOut,
  PenIcon,
  PlugIcon,
  Settings,
  SmileIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { TimelineDemo } from "@/components/examples/ui/timeline/timeline-demo";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogElementOutsideContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { ScrollArea } from "@/registry/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/ui/sidebar";
import { Textarea } from "@/registry/ui/textarea";
import { toast } from "@/registry/ui/toast";
import { PreferencesDialogContent } from "./preference";

const preferenceDialogHandle = createDialogHandle();

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const { isCollapsed } = useSidebar();
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  className="data-popup-open:bg-accent data-popup-open:text-accent-foreground"
                  size="lg"
                >
                  {isCollapsed ? (
                    <UserIcon className="size-4 mx-auto" />
                  ) : (
                    <>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </>
                  )}
                </SidebarMenuButton>
              }
            />
            <DropdownMenuContent
              align="start"
              matchAnchorWidth={!isCollapsed}
              sideOffset={6}
            >
              <DropdownMenuItem
                className="justify-between py-2"
                onClick={() => setPreferenceOpen(true)}
              >
                <div className="flex flex-col text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <Settings />
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="justify-between py-2"
                  onClick={() => setFeedbackOpen(true)}
                >
                  Feedback
                  <SmileIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="justify-between py-2"
                  onClick={() => setOpen(true)}
                >
                  Connect Integrations
                  <PlugIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="justify-between py-2"
                  onClick={() => setChangelogOpen(true)}
                >
                  Changelog
                  <PenIcon />
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-between py-2">
                  Doc
                  <BookIcon />
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-between py-2">
                  Log out
                  <LogOut />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <IntegrationsDialog onOpenChange={setOpen} open={open} />
      <DialogCloseConfirmation
        onOpenChange={setFeedbackOpen}
        open={feedbackOpen}
      />
      <ChangelogDialog onOpenChange={setChangelogOpen} open={changelogOpen} />
      <PreferencesDialog
        onOpenChange={setPreferenceOpen}
        open={preferenceOpen}
      />
    </>
  );
}

const integrations = ["GitHub", "Slack", "Linear"];

export function IntegrationsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent layout="stacked">
        <DialogHeader>
          <DialogTitle>Integrations</DialogTitle>
          <DialogDescription>
            Manage your active third-party integrations.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          {integrations.map((app) => (
            <IntegrationItem appName={app} key={app} />
          ))}
        </div>

        <DialogFooter>
          <DialogClose render={<Button>Done</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IntegrationItem({ appName }: { appName: string }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded bg-primary/10 grid place-items-center">
          <span className="text-xs font-bold text-primary">{appName[0]}</span>
        </div>
        <div className="text-sm font-medium">{appName}</div>
      </div>
      <Dialog>
        <DialogTrigger
          render={
            <Button size="sm" variant="outline">
              Configure
            </Button>
          }
        />
        <DialogContent layout="stacked">
          <DialogHeader>
            <DialogTitle>Configure {appName}</DialogTitle>
            <DialogDescription>
              Enter your API key to connect this service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <Label htmlFor={`api-key-${appName}`}>API Key</Label>
            <Input
              defaultValue="sk_test_123456789"
              id={`api-key-${appName}`}
              type="password"
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Back</Button>} />
            <DialogClose render={<Button>Save Configuration</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DialogCloseConfirmation({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && textareaValue) {
          setConfirmationOpen(true);
        } else {
          setTextareaValue("");
          onOpenChange(open);
        }
      }}
      open={open}
    >
      <DialogContent className="sm:max-w-96" layout="stacked" showCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SmileIcon className="size-5" /> Send Feedback
          </DialogTitle>
        </DialogHeader>
        <form
          className="mt-4 flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            onOpenChange(false);
          }}
        >
          <Textarea
            className="min-h-48 resize-none"
            onChange={(event) => setTextareaValue(event.target.value)}
            placeholder="Please describe the bug or issue you are experiencing..."
            required
            value={textareaValue}
          />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button disabled={!textareaValue} type="submit">
              Send Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <AlertDialog onOpenChange={setConfirmationOpen} open={confirmationOpen}>
        <AlertDialogContent className="sm:max-w-md" layout="stacked">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard this
              feedback?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="outline" />}>
              Keep Editing
            </AlertDialogClose>
            <Button
              onClick={() => {
                setConfirmationOpen(false);
                onOpenChange(false);
              }}
              variant="destructive"
            >
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

export function ChangelogDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogElementOutsideContent className="overflow-hidden max-w-4xl p-4 sm:p-6">
        <DialogClose
          className="absolute right-2 top-2 size-6 sm:size-8 xl:right-4 xl:top-4 xl:size-10 pointer-events-auto"
          render={
            <Button variant="secondary">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          }
        />
        <DialogHeader className="flex-none">
          <DialogTitle>Changelog</DialogTitle>
          <DialogDescription>
            Stay updated with the latest changes.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="min-h-0" gradientScrollFade noScrollBar>
          <TimelineDemo />
        </ScrollArea>
        <DialogFooter>
          <DialogClose render={<Button>Done</Button>} />
        </DialogFooter>
      </DialogElementOutsideContent>
    </Dialog>
  );
}

const PreferencesDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-3xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>Manage your preferences.</DialogDescription>
        </DialogHeader>
        <PreferencesDialogContent />
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <Button
            onClick={() => {
              toast.success({
                description: "Your preferences have been saved successfully.",
                title: "Preferences saved",
              });
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
