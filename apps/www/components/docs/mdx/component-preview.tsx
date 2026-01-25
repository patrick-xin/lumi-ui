import { components } from "@/registry/__index__";
import type { ComponentName } from "@/registry/__registry";
import { ComponentPreviewTabs } from "./component-preview-tabs";
import { ComponentSourceCode } from "./component-source-code";

export async function ComponentPreview({
  name,
  className,
  collapsible = false,
  hideSource,
}: React.ComponentProps<"div"> & {
  name: ComponentName;
  collapsible?: boolean;
  hideSource?: boolean;
}) {
  const { component: Component } = components[name];

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  if (hideSource) {
    return (
      <div className="grid w-full *:[figure]:h-[420px] *:[figure]:overflow-scroll *:[figure]:no-scrollbar">
        <Component />
      </div>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      component={<Component />}
      source={
        <ComponentSourceCode collapsible={collapsible} lang="tsx" name={name} />
      }
    />
  );
}
