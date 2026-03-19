import { Button } from "@/registry/tv/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/tv/drawer";

export function DrawerBasicDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Drawer swipeDirection="up">
        <DrawerTrigger render={<Button />}>Open basic top</DrawerTrigger>
        <DrawerContent layout="responsive" side="top">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection="down">
        <DrawerTrigger render={<Button />}>Open basic bottom</DrawerTrigger>
        <DrawerContent side="bottom">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection="left">
        <DrawerTrigger render={<Button />}>Open basic left</DrawerTrigger>
        <DrawerContent side="left">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button />}>Open basic right</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
