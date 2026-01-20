"use client";

import {
  SiAnthropic,
  SiGoogle,
  SiMeta,
  SiOpenai,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Button } from "@lumi-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@lumi-ui/ui/dropdown-menu";
import { Input } from "@lumi-ui/ui/input";
import { Label } from "@lumi-ui/ui/label";
import { cn } from "@lumi-ui/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@lumi-ui/ui/popover";
import {
  createPreviewCardHandle,
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@lumi-ui/ui/preview-card";
import { RadioGroup, RadioRoot } from "@lumi-ui/ui/radio";
import { ScrollArea } from "@lumi-ui/ui/scroll-area";
import { Separator } from "@lumi-ui/ui/separator";
import {
  TabIndicator,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@lumi-ui/ui/tabs";
import {
  createTooltipHandle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lumi-ui/ui/tooltip";
import {
  Brain,
  Check,
  ChevronDownIcon,
  Eye,
  FileText,
  Filter,
  Image as ImageIcon,
  InfoIcon,
  SlidersHorizontal,
  StarIcon,
  Wrench,
  Zap,
} from "lucide-react";
import React from "react";

const ModelDetailPopoverHandle = createPreviewCardHandle<ModelDetail>();
const ModelTooltipHandle = createTooltipHandle<Pick<ModelDetail, "name">>();

type ModelDetail = {
  value: string;
  name: string;
  provider: string;
  isStarred: boolean;
  description: string;
};

export const T3ModelSelector = () => {
  const [selectedModel, setSelectedModel] = React.useState<ModelDetail | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <>
      <TooltipProvider>
        <Popover modal onOpenChange={setOpen} open={open}>
          <PopoverTrigger
            render={
              <Button
                aria-label="Select model"
                className="group justify-between data-[popup-open]:bg-primary/10 hover:bg-primary/10 bg-primary/5 w-48"
                variant="unstyled"
              >
                {selectedModel?.name || "Select a model"}
                <ChevronDownIcon className="group-data-[popup-open]:rotate-180 transition-transform" />
              </Button>
            }
          />
          <PopoverContent className="flex flex-col p-0 w-80 sm:w-96 bg-background duration-300 h-[40dvh] max-h-[40dvh] overflow-hidden rounded-xl">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-none flex items-center justify-between p-1">
                <Label className="sr-only" htmlFor="searchModel">
                  Search models
                </Label>
                <Input
                  aria-label="Search models"
                  className="caret-primary"
                  id="searchModel"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search models..."
                  value={searchQuery}
                  variant="ghost"
                />
                <FilterMenu />
              </div>
              <Separator />
              <Tabs
                className="flex-1 min-h-0 gap-0"
                defaultValue="starred"
                orientation="vertical"
              >
                <TabsList className="rounded-none outline-none space-y-1.5 bg-background mx-1 my-2">
                  {PROVIDERS.map((provider) => (
                    <TabsTab
                      className="hover:text-foreground size-7"
                      key={provider.value}
                      render={
                        <TooltipTrigger
                          handle={ModelTooltipHandle}
                          payload={{ name: provider.name }}
                        />
                      }
                      value={provider.value}
                    >
                      {provider.icon}
                    </TabsTab>
                  ))}

                  <TabIndicator
                    className={cn(
                      "rounded-md bg-primary/10",
                      "data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
                    )}
                  />
                </TabsList>

                <Separator orientation="vertical" />

                {PROVIDERS.map((provider) => {
                  const filteredModels = MODELS.filter((m) => {
                    const matchesProvider =
                      provider.value === "starred"
                        ? m.isStarred
                        : m.provider === provider.value;

                    const matchesSearch = m.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());

                    return matchesProvider && matchesSearch;
                  });

                  return (
                    <TabsPanel
                      aria-label={`${provider.name} models list`}
                      className="flex-1 flex flex-col min-h-0 p-1"
                      key={provider.value}
                      tabIndex={-1}
                      value={provider.value}
                    >
                      <ScrollArea gradientScrollFade noScrollBar>
                        {filteredModels.length > 0 ? (
                          <RadioGroup
                            className="flex flex-col gap-1"
                            onValueChange={(val: string) => {
                              const model =
                                MODELS.find((m) => m.value === val) ?? null;
                              setSelectedModel(model);
                            }}
                            value={selectedModel?.value ?? ""}
                          >
                            {filteredModels.map((model) => {
                              const labelId = `label-${model.value}`;
                              const descId = `desc-${model.value}`;
                              const isSelected =
                                selectedModel?.value === model.value;

                              return (
                                <div
                                  className={cn(
                                    "group relative flex items-center justify-between rounded-xl px-1 py-1 transition-all",

                                    isSelected
                                      ? "bg-primary/10 border-primary/20"
                                      : "hover:bg-primary/5 border-transparent",
                                  )}
                                  key={model.value}
                                >
                                  <RadioRoot
                                    aria-describedby={descId}
                                    aria-labelledby={labelId}
                                    className="flex-1 flex items-center text-left outline-none cursor-pointer p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20"
                                    onClick={() => setOpen(false)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        setOpen(false);
                                      }
                                    }}
                                    value={model.value}
                                  >
                                    <div className="flex flex-col gap-0.5 pointer-events-none">
                                      <div
                                        className="font-semibold text-sm"
                                        id={labelId}
                                      >
                                        {model.name}
                                      </div>
                                      <div
                                        className="text-xs text-muted-foreground"
                                        id={descId}
                                      >
                                        {model.description}
                                      </div>
                                    </div>
                                  </RadioRoot>
                                  <div className="flex-none pl-1">
                                    <PreviewCardTrigger
                                      delay={300}
                                      handle={ModelDetailPopoverHandle}
                                      payload={model}
                                      render={
                                        <Button
                                          className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus-visible:opacity-100"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                          size="icon-xs"
                                          variant="ghost"
                                        >
                                          <InfoIcon className="size-4" />
                                          <span className="sr-only">
                                            Info for {model.name}
                                          </span>
                                        </Button>
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground text-center">
                            No models found.
                          </div>
                        )}
                      </ScrollArea>
                    </TabsPanel>
                  );
                })}
              </Tabs>
            </div>
          </PopoverContent>
        </Popover>
        <Tooltip handle={ModelTooltipHandle}>
          {({ payload: model }) => (
            <TooltipContent
              className="bg-popover shadow-lg rounded-xl text-popover-foreground"
              showArrow={false}
              side="left"
              sideOffset={1}
            >
              <p>{model?.name}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <PreviewCard handle={ModelDetailPopoverHandle}>
        {({ payload: model }) => {
          return (
            <PreviewCardContent
              align="center"
              className="overscroll-contain"
              side="right"
            >
              <div className="space-y-2">
                <div className="font-medium text-sm leading-none">
                  {model?.name}
                </div>
                <p className="text-sm text-muted-foreground">
                  {model?.description}
                </p>
              </div>
            </PreviewCardContent>
          );
        }}
      </PreviewCard>
    </>
  );
};

const FilterMenu = () => {
  const [filters, setFilters] = React.useState(FILTERS);
  const activeCount = filters.filter((f) => f.checked).length;
  const toggleFilter = (id: string) => {
    setFilters((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={
              activeCount > 0
                ? `Filter (${activeCount} active)`
                : "Filter models"
            }
            className="bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground relative mr-4"
            size="icon-sm"
            variant="secondary"
          >
            <Filter className="size-4" />
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-sm ring-2 ring-background">
                {activeCount}
              </span>
            )}
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        className="w-70 p-2 bg-background border-border/40 text-popover-foreground shadow-xl rounded-2xl"
        matchAnchorWidth={false}
        side="bottom"
      >
        <div className="flex flex-col gap-1">
          {filters.map((item) => (
            <DropdownMenuCheckboxItem
              checked={item.checked}
              className={cn(
                "group flex items-center justify-between w-full px-3 py-1 rounded-xl text-xs cursor-pointer transition-colors outline-none",
                item.checked
                  ? "bg-primary/5"
                  : "hover:bg-primary/5 focus:bg-primary/5",
              )}
              key={item.id}
              onCheckedChange={() => toggleFilter(item.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                    item.checked
                      ? "bg-primary/10 text-primary/50"
                      : "bg-primary/5 text-muted-foreground",
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    item.checked ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </div>
              {item.checked && <Check className="size-4 text-primary" />}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
        <DropdownMenuSeparator className="my-2 bg-border/40" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="w-full px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-primary/5 focus-visible:bg-primary/5"
            unstyled
          >
            Show combined results
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-primary/5 focus-visible:bg-primary/5"
            onClick={() =>
              setFilters(filters.map((f) => ({ ...f, checked: false })))
            }
            unstyled
          >
            Clear filters
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FILTERS = [
  {
    checked: false,
    icon: <Zap className="size-4" />,
    id: "fast",
    label: "Fast",
  },
  {
    checked: false,
    icon: <Eye className="size-4" />,
    id: "vision",
    label: "Vision",
  },
  {
    checked: false,
    icon: <Brain className="size-4" />,
    id: "reasoning",
    label: "Reasoning",
  },
  {
    checked: true,
    icon: <SlidersHorizontal className="size-4" />,
    id: "effort",
    label: "Effort Control",
  },
  {
    checked: true,
    icon: <Wrench className="size-4" />,
    id: "tool",
    label: "Tool Calling",
  },
  {
    checked: true,
    icon: <ImageIcon className="size-4" />,
    id: "image",
    label: "Image Generation",
  },
  {
    checked: false,
    icon: <FileText className="size-4" />,
    id: "pdf",
    label: "PDF Comprehension",
  },
];
const PROVIDERS = [
  { icon: <StarIcon />, name: "Favorites", value: "starred" },
  { icon: <SiOpenai />, name: "OpenAI", value: "openai" },
  { icon: <SiAnthropic />, name: "Anthropic", value: "anthropic" },
  { icon: <SiGoogle />, name: "Google", value: "google" },
  { icon: <SiMeta />, name: "Meta", value: "meta" },
  { icon: <SiX />, name: "XAi", value: "xai" },
];
const MODELS = [
  {
    description:
      "Our high-intelligence flagship model for complex, multi-step tasks.",
    isStarred: true,
    name: "GPT-4o",
    provider: "openai",
    value: "gpt-4o",
  },
  {
    description: "Fast, inexpensive model for simple tasks.",
    isStarred: false,
    name: "GPT-3.5 Turbo",
    provider: "openai",
    value: "gpt-3.5-turbo",
  },
  {
    description: "Most powerful model for highly complex tasks.",
    isStarred: true,
    name: "Claude 3 Opus",
    provider: "anthropic",
    value: "claude-3-opus",
  },
  {
    description: "Balance of intelligence and speed.",
    isStarred: true,
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    value: "claude-3.5-sonnet",
  },
  {
    description:
      "Mid-size multimodal model that scales across a wide range of tasks.",
    isStarred: false,
    name: "Gemini 1.5 Pro",
    provider: "google",
    value: "gemini-1.5-pro",
  },
  {
    description: "The most capable openly available LLM.",
    isStarred: false,
    name: "Llama 3 70B",
    provider: "meta",
    value: "llama-3-70b",
  },
  {
    description: "A rebellious AI with a bit of wit.",
    isStarred: false,
    name: "Grok 1.5",
    provider: "xai",
    value: "grok-1.5",
  },
];
