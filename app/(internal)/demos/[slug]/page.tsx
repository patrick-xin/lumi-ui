import React from "react";
import { components } from "@/registry/__index__";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const componentName = slug;

  // Find all examples that belong to this component
  const examples = Object.values(components).filter((comp) => {
    if (comp.type !== "registry:example") return false;

    // Check registry dependencies
    if (comp.registryDependencies?.includes(componentName)) {
      return true;
    }

    // Fallback to name check if no dependencies listed (or for self-reference if applicable)
    // Also handle the case where the example IS the component demo (e.g. accordion-demo depends on accordion)
    if (comp.name.startsWith(componentName + "-")) {
      return true;
    }

    return false;
  });

  if (examples.length === 0) {
    return <div>No demos found for {componentName}</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-6 space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold capitalize">{componentName}</h1>
        </div>

        {examples.map((example) => {
          const Component = example.component;
          return (
            <div key={example.name} className="space-y-4">
              <h2 className="text-xl font-semibold">{example.name}</h2>
              <div className="border rounded-lg p-10 flex items-center justify-center min-h-[200px] bg-background relative">
                <React.Suspense fallback={<div>Loading...</div>}>
                  {Component && <Component />}
                </React.Suspense>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  // Get all unique component names from examples
  const componentNames = new Set<string>();

  Object.values(components).forEach((comp) => {
    if (comp.type === "registry:example") {
      if (comp.registryDependencies && comp.registryDependencies.length > 0) {
        componentNames.add(comp.registryDependencies[0]);
      } else if (comp.name.includes("-")) {
        // Fallback logic similar to layout
        const parts = comp.name.split("-");
        if (parts[parts.length - 1] === "demo") {
          componentNames.add(parts.slice(0, -1).join("-"));
        } else {
          componentNames.add(parts[0]);
        }
      }
    }
  });

  return Array.from(componentNames).map((slug) => ({
    slug,
  }));
}
