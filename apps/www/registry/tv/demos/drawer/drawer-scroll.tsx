import { Button } from "@/registry/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerDragHandle,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { ScrollArea } from "@/registry/ui/scroll-area";

export function DrawerScrollDemo() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Drawer>
        <DrawerTrigger
          render={<Button variant="outline">Drawer with ScrollArea</Button>}
        />
        <DrawerContent>
          <DrawerDragHandle />
          <DrawerHeader>
            <DrawerTitle>Drawer</DrawerTitle>
            <DrawerDescription>
              This is a drawer that slides in from the bottom, with scrollable
              content.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[40dvh]" gradientScrollFade noScrollBar>
            <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                  key={String(i)}
                >
                  <span className="font-medium text-sm">{i + 1}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DrawerFooter className="max-w-4xl mx-auto w-full flex justify-center">
            <DrawerClose
              render={
                <Button className="w-fit ml-auto" variant="outline">
                  Close
                </Button>
              }
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger
          render={<Button variant="outline">Open Drawer</Button>}
        />
        <DrawerContent>
          <DrawerDragHandle />
          <DrawerHeader>
            <DrawerTitle>Drawer</DrawerTitle>
            <DrawerDescription>
              This is a drawer that slides in from the bottom, with scrollable
              content.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  className="flex h-48 w-full shrink-0 items-center justify-center rounded-md bg-accent/30"
                  key={String(i)}
                >
                  <span className="font-medium text-sm">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline">Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
