import { DropdownMenuDemo } from "../../../components/examples/menubar/a";
import ExampleMenubar1 from "../../../components/examples/menubar/d";
import { StatefulMenubar } from "../../../components/examples/menubar/f";
import ExampleMenubar from "../../../components/examples/menubar/menubar-demo";

export default function Home() {
  return (
    <div className="flex h-[calc(100dvh-12rem)] justify-center items-center">
      {/* <HeroSection /> */}
      <ExampleMenubar1 />
      <ExampleMenubar />
      <StatefulMenubar />
      <DropdownMenuDemo />
    </div>
  );
}
