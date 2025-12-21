import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export default function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>View notifications</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            You are all caught up. Good job!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <div className="mr-auto flex">
            <Dialog>
              <DialogTrigger render={<Button>Customize</Button>} />
              <DialogContent>
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
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
