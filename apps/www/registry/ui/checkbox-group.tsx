import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "@/registry/lib/utils";
import { Checkbox } from "@/registry/ui/checkbox";

function CheckboxGroup({ className, ...props }: BaseCheckboxGroup.Props) {
  return (
    <BaseCheckboxGroup
      className={cn("grid gap-3", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export { CheckboxGroup, Checkbox as CheckboxGroupItem };
