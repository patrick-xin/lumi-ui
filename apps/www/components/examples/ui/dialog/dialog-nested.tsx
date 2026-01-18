import { Button } from "@lumi-ui/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lumi-ui/ui/dialog";

export function DialogNestedDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>View notifications</Button>} />
      <DialogContent className="sm:max-w-md" layout="stacked">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            You are all caught up. Good job!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger render={<Button>Customize</Button>} />
            <DialogContent className="sm:max-w-md" layout="stacked">
              <DialogHeader>
                <DialogTitle>Customize notification</DialogTitle>
                <DialogDescription>
                  Review your settings here.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Close</Button>}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
