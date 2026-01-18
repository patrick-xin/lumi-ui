import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "@lumi-ui/ui/toggle";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
} from "@lumi-ui/ui/toolbar";

export default function EditorToolbar() {
  return (
    <Toolbar className="w-96">
      <ToolbarGroup>
        <ToolbarButton aria-label="Bold" render={<Toggle />}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Italic">
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Underline">
          <UnderlineIcon />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton>Format</ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarLink href="#" className="ml-auto text-xs">
        Edited 5 mins ago
      </ToolbarLink>
    </Toolbar>
  );
}
