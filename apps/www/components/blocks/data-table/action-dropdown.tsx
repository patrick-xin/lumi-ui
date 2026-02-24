import { Copy, DollarSign, Settings, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
} from "@/registry/ui/dropdown-menu";
import { toast } from "@/registry/ui/toast";
import {
  accountDialogHandle,
  actionMenuHandle,
  deleteAlertDialogHandle,
  paymentDialogHandle,
} from "./index";

export function ActionDropdown() {
  return (
    <DropdownMenu handle={actionMenuHandle}>
      {({ payload: action }) => {
        return (
          <DropdownMenuContent
            align="start"
            matchAnchorWidth={false}
            side="left"
          >
            <DropdownMenuItem
              onClick={() =>
                toast.success({
                  description: `${action?.id} has been copied to the clipboard`,
                  title: "Action ID copied",
                })
              }
            >
              <Copy /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              closeOnClick
              onClick={() => {
                accountDialogHandle.openWithPayload({
                  id: action?.id ?? 1,
                  name: action?.name ?? "",
                  owner: action?.owner ?? "",
                  url: action?.url ?? "",
                });
              }}
            >
              <Settings /> View Account
            </DropdownMenuItem>
            <DropdownMenuLinkItem
              closeOnClick
              onClick={() => {
                paymentDialogHandle.openWithPayload({
                  id: action?.id ?? 1,
                  name: action?.name ?? "",
                  owner: action?.owner ?? "",
                  url: action?.url ?? "",
                });
              }}
            >
              <DollarSign /> View payment details
            </DropdownMenuLinkItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                deleteAlertDialogHandle.openWithPayload({
                  id: action?.id ?? 1,
                  name: action?.name ?? "",
                  owner: action?.owner ?? "",
                  url: action?.url ?? "",
                });
              }}
              variant="destructive"
            >
              <Trash /> Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        );
      }}
    </DropdownMenu>
  );
}
