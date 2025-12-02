import { DocsSidebar } from "@/components/docs/sidebar";
import { components } from "@/registry/__index__";
import type { DocPageNode, DocRoot } from "@/types";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Filter for example components
  const examples = Object.values(components).filter(
    (comp) => comp.type === "registry:example",
  );

  // Group examples by their prefix (e.g., "alert-dialog-demo" -> "alert-dialog")
  const groups: Record<string, DocPageNode[]> = {};

  for (const example of examples) {
    const name = example.name;
    let groupName = "others";

    // Better approach: Use the first registry dependency if available, as that's likely the parent component
    if (
      example.registryDependencies &&
      example.registryDependencies.length > 0
    ) {
      groupName = example.registryDependencies[0];
    } else if (name.includes("-")) {
      const parts = name.split("-");
      // If it ends with demo, the prefix is likely the component name
      if (parts[parts.length - 1] === "demo") {
        groupName = parts.slice(0, -1).join("-");
      } else {
        groupName = parts[0];
      }
    }

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push({
      $id: name,
      name: name,
      url: `/demos/${groupName}`, // URL now points to the component page
      type: "page",
      status: "planned", // Default status
    });
  }

  // Construct the tree
  // The DocsSidebar expects top-level items to be sections (headers), and children to be links.
  // So we wrap all component pages under a "Components" folder.

  const tree: DocRoot = {
    $id: "root",
    name: "Demos",
    children: [
      {
        $id: "components",
        name: "Components",
        type: "folder",
        index: undefined,
        children: Object.entries(groups)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([groupName, items]) => ({
            $id: groupName,
            name: `${groupName} (${items.length})`, // Add count
            type: "page",
            url: `/demos/${groupName}`,
            status: undefined,
          })),
      },
    ],
  };

  return (
    <div className="container relative flex-1">
      <DocsSidebar tree={tree} />

      <div className="md:grid md:grid-cols-[minmax(200px,240px)_1fr] xl:grid-cols-[minmax(220px,260px)_1fr]">
        <div className="hidden md:block" />

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
