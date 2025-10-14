import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";

export function AlertDialogCustom() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete Account</Button>}
      />
      <AlertDialogPopup
        classNames={{
          backdrop: "backdrop-blur-2xl",
          popup: "bg-destructive/70 text-destructive-foreground",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-destructive-foreground/10">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
