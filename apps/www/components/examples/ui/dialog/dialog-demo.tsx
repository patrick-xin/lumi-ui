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
import { Field, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Show Dialog</Button>} />
      <DialogContent>
        <Form>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Courtney Henry" type="text" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="courtney.henry" type="text" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
