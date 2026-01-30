"use client";

import { AIChatDialog } from "@/registry/blocks/sidebar-03/components/ai-chat-dialog";
import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";

type TabType = "chat" | "doc";

interface AIChatContextType {
  activeTab: TabType;
  input: string;
  isDialogOpen: boolean;
  setActiveTab: (tab: TabType) => void;
  setInput: (value: string) => void;
  setIsDialogOpen: (open: boolean) => void;
  switchToChat: () => void;
  switchToDocs: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

const AIChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("doc");
  const [input, setInput] = useState("");

  const switchToChat = useCallback(() => {
    setActiveTab("chat");
  }, []);

  const switchToDocs = useCallback(() => {
    setActiveTab("doc");
  }, []);

  return (
    <AIChatContext.Provider
      value={{
        activeTab,
        input,
        isDialogOpen,
        setActiveTab,
        setInput,
        setIsDialogOpen,
        switchToChat,
        switchToDocs,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return context;
};

export const AIChat = () => {
  return (
    <AIChatProvider>
      <AIChatDialog />
    </AIChatProvider>
  );
};
