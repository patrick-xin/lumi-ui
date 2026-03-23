import { tv } from "tailwind-variants";

const pass = (label) => console.log(`  ✓ ${label}`);
const fail = (label, expected, got) => {
  console.log(`  ✗ ${label}`);
  console.log(`    expected: ${expected}`);
  console.log(`    got:      ${got}`);
};
const check = (label, value, expected) => {
  if (value === expected) pass(label);
  else fail(label, expected, value);
};
const has = (str, token) => str.split(" ").includes(token);
const hasAll = (str, tokens) => tokens.every(t => has(str, t));
const hasNone = (str, tokens) => tokens.every(t => !has(str, t));

// ============================================================
// TEST 1: Non-slot parent → slotted child (base dropped)
// ============================================================
console.log("\n=== TEST 1: Non-slot parent → slotted child ===");
console.log("Q: Does parent base merge into child base slot?\n");

const parent1 = tv({
  base: "text-red bg-blue rounded",
  variants: {
    size: { sm: "p-1", lg: "p-4" },
  },
  defaultVariants: { size: "sm" },
});

const child1 = tv({
  extend: parent1,
  slots: {
    base: "flex gap-2",
    label: "font-bold",
  },
});

const c1 = child1();
check("parent base → base slot", hasAll(c1.base(), ["text-red", "bg-blue", "rounded"]), false);
check("child base slot has own classes", hasAll(c1.base(), ["flex", "gap-2"]), true);
check("parent variant → base slot", has(c1.base(), "p-1"), true);
check("label slot is independent", c1.label(), "font-bold");

// ============================================================
// TEST 2: Slotted parent → slotted child (slots merge)
// ============================================================
console.log("\n=== TEST 2: Slotted parent → slotted child ===");
console.log("Q: Do matching slot names merge base classes?\n");

const parent2 = tv({
  slots: {
    base: "text-red bg-blue",
    header: "font-bold",
  },
  variants: {
    size: {
      sm: { base: "p-1", header: "text-sm" },
      lg: { base: "p-4", header: "text-lg" },
    },
  },
  defaultVariants: { size: "sm" },
});

const child2 = tv({
  extend: parent2,
  slots: {
    base: "flex gap-2",       // same slot name as parent
    header: "underline",      // same slot name as parent
    footer: "border-t",       // new slot
  },
});

const c2 = child2();
check("base slot merges parent+child", hasAll(c2.base(), ["text-red", "bg-blue", "flex", "gap-2"]), true);
check("header slot merges parent+child", hasAll(c2.header(), ["font-bold", "underline"]), true);
check("parent variant on base slot", has(c2.base(), "p-1"), true);
check("parent variant on header slot", has(c2.header(), "text-sm"), true);
check("new child slot works", c2.footer(), "border-t");

// ============================================================
// TEST 3: Slotted parent → non-slot child
// ============================================================
console.log("\n=== TEST 3: Slotted parent → non-slot child ===");
console.log("Q: What happens when a non-slot child extends a slotted parent?\n");

const parent3 = tv({
  slots: {
    base: "text-red bg-blue",
    header: "font-bold",
  },
  variants: {
    size: {
      sm: { base: "p-1" },
      lg: { base: "p-4" },
    },
  },
  defaultVariants: { size: "sm" },
});

const child3 = tv({
  extend: parent3,
  base: "flex gap-2",
});

const c3 = child3();
// Does it become slotted or non-slotted?
const isSlotted3 = typeof c3 === "object" && typeof c3 !== "string";
console.log(`  result type: ${isSlotted3 ? "slotted (object)" : "non-slotted (string)"}`);
if (isSlotted3) {
  check("base slot has parent classes", hasAll(c3.base(), ["text-red", "bg-blue"]), true);
  check("base slot has child classes", hasAll(c3.base(), ["flex", "gap-2"]), true);
  check("header slot preserved", has(c3.header(), "font-bold"), true);
} else {
  console.log(`  output: "${c3}"`);
  check("has parent base classes", hasAll(c3, ["text-red", "bg-blue"]), true);
  check("has child base classes", hasAll(c3, ["flex", "gap-2"]), true);
}

// ============================================================
// TEST 4: compoundVariants format across boundary
// ============================================================
console.log("\n=== TEST 4: Parent CV (string) → slotted child ===");
console.log("Q: Does a string-format CV from non-slot parent route to base slot?\n");

const parent4 = tv({
  base: "text-red",
  variants: {
    color: { blue: "bg-blue", green: "bg-green" },
  },
  compoundVariants: [
    { color: "blue", className: "ring-2 ring-blue" },
  ],
  defaultVariants: { color: "blue" },
});

const child4 = tv({
  extend: parent4,
  slots: {
    base: "flex",
    icon: "size-4",
  },
});

const c4 = child4({ color: "blue" });
check("parent CV routes to base slot", hasAll(c4.base(), ["ring-2", "ring-blue"]), true);
check("parent CV does NOT touch icon slot", hasNone(c4.icon(), ["ring-2", "ring-blue"]), true);

const c4green = child4({ color: "green" });
check("parent CV not applied for non-matching variant", hasNone(c4green.base(), ["ring-2", "ring-blue"]), true);

// ============================================================
// TEST 5: Slotted parent CV → slotted child
// ============================================================
console.log("\n=== TEST 5: Slotted parent CV → slotted child ===");
console.log("Q: Do slot-object CVs from slotted parent propagate?\n");

const parent5 = tv({
  slots: {
    base: "flex",
    header: "font-bold",
  },
  variants: {
    color: { blue: {}, green: {} },
  },
  compoundVariants: [
    {
      color: "blue",
      className: {
        base: "bg-blue",
        header: "text-blue",
      },
    },
  ],
  defaultVariants: { color: "blue" },
});

const child5 = tv({
  extend: parent5,
  slots: {
    base: "gap-2",           // extend existing slot
    footer: "border-t",       // new slot
  },
});

const c5 = child5({ color: "blue" });
check("parent CV → base slot", has(c5.base(), "bg-blue"), true);
check("parent CV → header slot", has(c5.header(), "text-blue"), true);
check("parent CV does NOT touch new child slot", hasNone(c5.footer(), ["bg-blue", "text-blue"]), true);

// ============================================================
// TEST 6: Variant override in child
// ============================================================
console.log("\n=== TEST 6: Child overrides parent variant values ===");
console.log("Q: When child redefines a variant key, what wins?\n");

const parent6 = tv({
  base: "rounded",
  variants: {
    size: {
      sm: "p-1 text-sm",
      md: "p-2 text-base",
      lg: "p-4 text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

const child6 = tv({
  extend: parent6,
  variants: {
    size: {
      sm: "p-0.5",        // override sm
      md: "p-1.5",        // override md
      // lg NOT redefined
    },
  },
});

const c6sm = child6({ size: "sm" });
const c6md = child6({ size: "md" });
const c6lg = child6({ size: "lg" });

check("sm: child value wins", has(c6sm, "p-0.5"), true);
check("sm: parent text-sm kept?", has(c6sm, "text-sm"), true);
check("md: child value wins", has(c6md, "p-1.5"), true);
check("lg: parent-only key preserved", has(c6lg, "p-4"), true);
check("lg: parent text-lg kept", has(c6lg, "text-lg"), true);

// ============================================================
// TEST 7: defaultVariants merge
// ============================================================
console.log("\n=== TEST 7: defaultVariants merge ===");
console.log("Q: Child defaults override parent defaults?\n");

const parent7 = tv({
  base: "rounded",
  variants: {
    size: { sm: "p-1", lg: "p-4" },
    color: { red: "text-red", blue: "text-blue" },
  },
  defaultVariants: { size: "sm", color: "red" },
});

const child7 = tv({
  extend: parent7,
  defaultVariants: { size: "lg" },
  // does NOT set default for color
});

const c7 = child7();
check("child default wins for size", has(c7, "p-4"), true);
check("parent default preserved for color", has(c7, "text-red"), true);

// ============================================================
// TEST 8: 3-level extend chain (non-slot → non-slot → slotted)
// ============================================================
console.log("\n=== TEST 8: 3-level chain (non-slot → non-slot → slotted) ===");
console.log("Q: Do L0 and L1 base classes both get dropped?\n");

const L0 = tv({
  base: "text-red rounded",
  variants: { a: { on: "underline" } },
  defaultVariants: { a: "on" },
});

const L1 = tv({
  extend: L0,
  base: "bg-blue border",
  variants: { b: { on: "italic" } },
  defaultVariants: { b: "on" },
});

const L2 = tv({
  extend: L1,
  slots: {
    base: "flex",
    item: "block",
  },
});

const c8 = L2();
check("L0 base dropped", hasNone(c8.base(), ["text-red", "rounded"]), true);
check("L1 base dropped", hasNone(c8.base(), ["bg-blue", "border"]), true);
check("L2 base slot has own class", has(c8.base(), "flex"), true);
check("L0 variant propagates", has(c8.base(), "underline"), true);
check("L1 variant propagates", has(c8.base(), "italic"), true);
check("item slot is independent", c8.item(), "block");

// ============================================================
// TEST 9: compoundSlots inheritance
// ============================================================
console.log("\n=== TEST 9: compoundSlots inheritance ===");
console.log("Q: Do parent compoundSlots propagate to child?\n");

const parent9 = tv({
  slots: {
    base: "flex",
    item: "block",
    icon: "size-4",
  },
  variants: {
    size: { sm: {}, lg: {} },
  },
  compoundSlots: [
    { slots: ["item", "icon"], size: "sm", class: "text-xs" },
    { slots: ["item", "icon"], size: "lg", class: "text-lg" },
  ],
  defaultVariants: { size: "sm" },
});

const child9 = tv({
  extend: parent9,
  slots: {
    base: "gap-2",
  },
});

const c9sm = child9({ size: "sm" });
const c9lg = child9({ size: "lg" });
check("compoundSlots sm → item", has(c9sm.item(), "text-xs"), true);
check("compoundSlots sm → icon", has(c9sm.icon(), "text-xs"), true);
check("compoundSlots lg → item", has(c9lg.item(), "text-lg"), true);
check("compoundSlots lg → icon", has(c9lg.icon(), "text-lg"), true);

// ============================================================
// TEST 10: tailwind-merge conflicts across extend
// ============================================================
console.log("\n=== TEST 10: tw-merge conflicts across extend ===");
console.log("Q: When parent and child have conflicting classes, who wins?\n");

const parent10 = tv({
  slots: {
    base: "p-4 text-red bg-blue rounded-lg",
  },
});

const child10 = tv({
  extend: parent10,
  slots: {
    base: "p-2 text-green rounded-sm",  // conflicts: p, text, rounded
  },
});

const c10 = child10();
check("child p-2 wins over parent p-4", has(c10.base(), "p-2") && !has(c10.base(), "p-4"), true);
check("child text-green wins over parent text-red", has(c10.base(), "text-green") && !has(c10.base(), "text-red"), true);
check("child rounded-sm wins over parent rounded-lg", has(c10.base(), "rounded-sm") && !has(c10.base(), "rounded-lg"), true);
check("non-conflicting parent bg-blue kept", has(c10.base(), "bg-blue"), true);

// ============================================================
// Summary
// ============================================================
console.log("\n=== SUMMARY ===\n");
console.log("1. Non-slot → slotted: parent BASE dropped, variants/CVs route to base slot");
console.log("2. Slotted → slotted: slots merge by name, new slots added");
console.log("3. Slotted → non-slot: child inherits slots, stays slotted");
console.log("4. String CV → slotted child: routes to base slot only");
console.log("5. Slot-object CV → slotted child: routes to matching slots");
console.log("6. Variant override: child values win, parent-only keys preserved");
console.log("7. defaultVariants: shallow merge, child wins on conflict");
console.log("8. 3-level chain: ALL non-slot base classes dropped at slot boundary");
console.log("9. compoundSlots: NOT inherited — silently dropped! ✗");
console.log("10. tw-merge conflicts: child wins (last-write-wins)");
