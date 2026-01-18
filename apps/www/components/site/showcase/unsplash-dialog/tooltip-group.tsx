import type { DialogRootChangeEventDetails } from "@base-ui/react";
import { Button } from "@lumi-ui/ui/button";
import {
  createDialogHandle,
  Dialog,
  DialogBackdrop,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "@lumi-ui/ui/dialog";
import { toast } from "@lumi-ui/ui/toast";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lumi-ui/ui/tooltip";
import { BookmarkIcon, PlusIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import type { IImage } from ".";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";

type UserAction = "bookmark" | "add-collection";
type FormType = "signin" | "signup";

type DialogPayload = {
  formType: FormType;
  action: UserAction;
  title: string;
};

const dialogHandle = createDialogHandle<DialogPayload>();
const tooltipHandle = createTooltipHandle<{ label: string }>();

export const TooltipGroup = ({ currentImage }: { currentImage: IImage }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);

  const handleOpenChange = (
    open: boolean,
    eventDetails: DialogRootChangeEventDetails,
  ) => {
    setIsOpen(open);
    if (eventDetails.trigger) {
      setTriggerId(eventDetails.trigger.id);
    }
  };

  const handleSuccess = (action: UserAction) => {
    setIsOpen(false);

    const messages: Record<UserAction, string> = {
      "add-collection": `Added ${currentImage.alt} to collection`,
      bookmark: `Bookmarked ${currentImage.alt}`,
    };

    toast.success({
      description: messages[action] || "Action completed successfully",
      title: "Success",
    });
  };

  return (
    <>
      <TooltipProvider>
        <div className="flex gap-2">
          <TooltipTrigger
            handle={tooltipHandle}
            id="trigger-bookmark"
            payload={{ label: "Bookmark this page" }}
            render={
              <DialogTrigger
                handle={dialogHandle}
                payload={{
                  action: "bookmark",
                  formType: "signin",
                  title: "Welcome Back",
                }}
                render={<Button size={"icon-sm"} variant={"outline"} />}
              >
                <BookmarkIcon aria-label="Bookmark" className="size-5" />
              </DialogTrigger>
            }
          />

          <TooltipTrigger
            handle={tooltipHandle}
            id="trigger-collection"
            payload={{ label: "Add to collection" }}
            render={
              <DialogTrigger
                handle={dialogHandle}
                payload={{
                  action: "add-collection",
                  formType: "signup",
                  title: "Create Account",
                }}
                render={<Button size={"icon-sm"} variant={"outline"} />}
              >
                <PlusIcon aria-label="Add to collection" className="size-5" />
              </DialogTrigger>
            }
          />

          <Tooltip handle={tooltipHandle}>
            {({ payload }) => (
              <TooltipContent showArrow={false} side="bottom" sideOffset={5}>
                <p>{payload?.label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </TooltipProvider>

      <Dialog
        handle={dialogHandle}
        onOpenChange={handleOpenChange}
        open={isOpen}
        triggerId={triggerId}
      >
        {({ payload }) => {
          return (
            <DialogPortal>
              <DialogBackdrop
                className="backdrop-blur-none bg-black/40"
                forceRender
              />
              <DialogPopup
                className={cn(
                  "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-md shadow-md dark:shadow-xs w-full",
                  payload?.formType === "signin" && "max-w-md",
                  payload?.formType === "signup" && "max-w-2xl",
                )}
              >
                {payload?.formType === "signin" && (
                  <LoginForm onSuccess={() => handleSuccess(payload.action)} />
                )}
                {payload?.formType === "signup" && (
                  <SignUpForm
                    image={currentImage}
                    onSuccess={() => handleSuccess(payload.action)}
                  />
                )}
              </DialogPopup>
            </DialogPortal>
          );
        }}
      </Dialog>
    </>
  );
};
