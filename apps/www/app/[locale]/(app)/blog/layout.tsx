import Image from "next/image";
import Grain from "@/components/blog/grain";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      {children}
      <Grain />
      <Image
        alt="bg-image"
        src="/images/bg.svg"
        className="fixed inset-0 -z-50"
        height={1000}
        width={1000}
      />
    </main>
  );
}
