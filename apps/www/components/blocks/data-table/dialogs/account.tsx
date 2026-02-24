import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/ui/dialog";
import { accountDialogHandle } from "../index";

export function AccountDialog() {
  return (
    <Dialog handle={accountDialogHandle}>
      {({ payload: action }) => {
        return (
          <DialogContent layout="top" showCloseButton>
            <DialogHeader>
              <DialogTitle>View account {action?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>
                Account ID: <span className="text-primary">{action?.id}</span>
              </p>
              <p>
                Account Name:{" "}
                <span className="text-primary">{action?.name}</span>
              </p>
              <p>
                Account URL: <span className="text-primary">{action?.url}</span>
              </p>
            </div>
          </DialogContent>
        );
      }}
    </Dialog>
  );
}
