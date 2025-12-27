import ExampleCreatableComboboxA from "../../../components/examples/ui/combobox/a";
import ExampleCreatableCombobox from "../../../components/examples/ui/combobox/b";

export default function Home() {
  return (
    <div className="flex h-[calc(100dvh-12rem)] justify-center items-center">
      <ExampleCreatableCombobox />
      <ExampleCreatableComboboxA />
    </div>
  );
}
