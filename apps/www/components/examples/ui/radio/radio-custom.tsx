import { RadioGroup, RadioIndicator, RadioRoot } from "@lumi-ui/ui/radio";

export function RadioCustom() {
  return (
    <RadioGroup defaultValue="fuji">
      <div className="font-medium">Best apple</div>
      <label className="flex items-center gap-3 text-sm" htmlFor="fuji">
        <RadioRoot
          className="flex size-4 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary data-[unchecked]:border data-[unchecked]:border-input"
          id="fuji"
          value="fuji"
        >
          <RadioIndicator className="flex before:size-1.5 before:rounded-full before:bg-background dark:before:bg-foreground" />
        </RadioRoot>
        Fuji
      </label>
      <label className="flex items-center gap-3 text-sm" htmlFor="granny-smith">
        <RadioRoot
          className="flex size-4 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary data-[unchecked]:border data-[unchecked]:border-input"
          id="granny-smith"
          value="granny-smith"
        >
          <RadioIndicator className="flex before:size-1.5 before:rounded-full before:bg-background dark:before:bg-foreground" />
        </RadioRoot>
        Granny Smith
      </label>
    </RadioGroup>
  );
}
