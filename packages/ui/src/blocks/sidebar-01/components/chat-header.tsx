import { useAIChat } from "@lumi-ui/ui/blocks/sidebar-01/components/ai-chat";
import { Input } from "@lumi-ui/ui/input";
import { Tabs, TabsListContent, TabsTab } from "@lumi-ui/ui/tabs";
import { BookIcon, Sparkles } from "lucide-react";

export const ChatDialogHeader = () => {
  const { activeTab, input, setInput, setActiveTab } = useAIChat();
  return (
    <div className="flex items-center justify-between px-4 py-2 h-14 rounded-md rounded-b-none">
      {activeTab === "chat" && (
        <div className="font-semibold text-sm">Ask AI</div>
      )}
      {activeTab === "doc" && (
        <Input
          autoFocus
          className="px-0"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Seach for anything..."
          value={input}
          variant={"ghost"}
        />
      )}
      <Tabs onValueChange={(v) => setActiveTab(v)} value={activeTab}>
        <TabsListContent className="bg-background border">
          <TabsTab
            className="w-16 cursor-pointer hover:text-foreground text-xs"
            value="doc"
          >
            <BookIcon className="size-3" /> Doc
          </TabsTab>
          <TabsTab
            className="w-16 cursor-pointer hover:text-foreground text-xs"
            value="chat"
          >
            <Sparkles className="size-3" /> Chat
          </TabsTab>
        </TabsListContent>
      </Tabs>
    </div>
  );
};
