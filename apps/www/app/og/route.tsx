import { ImageResponse } from "next/og";

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    <div
      tw="flex h-full w-full bg-slate-900 text-slate-100 relative"
      style={{ fontFamily: "Geist Sans" }}
    >
      <div tw="flex border absolute inset-y-0 border-slate-700 left-16 w-[px]" />
      <div tw="flex border absolute border-slate-700 inset-x-0 h-[px] bottom-16" />
      <div tw="flex absolute flex-row bottom-24 right-24 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="70 190 400 110"
          width={72}
          height={48}
          //@ts-expect-error
          tw="text-slate-500"
        >
          <title tw="hidden">Lumi UI</title>
          <path
            fill="currentColor"
            d="m154 270-1-1-12 12h-1l-2 2h-1l-1 1h-1l-2 2h-2l-1 1h-1l-1 1h-2l-1 1h-4l-1 1 1 1h32l1-1ZM273 262l-1 1v2l-1 1v2l-1 1v1l-1 1v2l-1 1v1l-2 2v1l-1 1v1l-3 3v1l-6 6 1 1h16l1-1v-27ZM391 198l-1 2 4 4 2 4v73l-1 1v2l-5 6 1 1h32l1-1-3-3-3-6v-73l1-1v-2l5-5v-1l-1-1ZM346 198l-1 1v5l1 1v13l1 1v12l1 1v13l1 1v12l1 1v13l1 1v9l-1 1v2l-5 5 1 1h32l1-1-5-6-1-2v-3l-1-1-1-27-1-1-1-26-1-1v-15l2-4 4-4v-1l-1-1ZM268 198l-1 1 9 8 3 6v2l2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l4 8 1 5 2 3v2l2 3v2l2 3v2l2 3v2l2 3v2l4 8 2-2v-2l2-3v-2l3-6 1-5 2-3v-2l1-1v-4l-3-6v-2l-2-3v-2l-2-3v-2l-2-3-1-5-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-3v-2l-2-2ZM255 198h-14l-1 1v26l1 1 1-1v-2l1-1v-2l1-1v-2l1-1v-1l1-1v-2l2-2v-1l1-1v-1l7-7v-1ZM163 198l-1 2 3 2 3 5v51l1 1v6l1 1v3l5 9 6 6 9 5h2l4 2h3l1 1h4l1-1-1-1-4-1-6-6-2-4v-2l-1-1v-4l-1-1v-62l1-1v-2l5-6v-1l-1-1ZM76 198l-1 2 5 5 1 2v75l-2 4-4 4 1 1h26l1-1v-82l2-4 4-4v-1l-1-1Z"
          ></path>
        </svg>
      </div>
      <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
        <div
          tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
          style={{
            textWrap: "balance",
            fontWeight: 600,
            fontSize: title && title.length > 20 ? 64 : 80,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </div>

        <div
          tw="text-[32px] leading-[1.5] flex-grow-1 text-slate-400"
          style={{
            fontWeight: 500,
            textWrap: "balance",
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 628,
      fonts,
    },
  );
}


