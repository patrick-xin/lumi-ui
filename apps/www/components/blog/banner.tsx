const svg = `<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>`;

export function BlogBanner() {
  return (
    <section
      className="relative rounded overflow-hidden shadow-lg"
      style={{
        backgroundImage: [
          "linear-gradient(120deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 40%)",
          `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        ].join(", "),
      }}
    >
      <div className="relative z-10 flex flex-col items-start justify-center h-56 md:h-64 px-6 md:px-16 py-10 text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm my-6">
          Blogs
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-medium max-w-2xl">
          Explore the latest insights and perspectives on the world of Lumi UI.
        </p>
      </div>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%)",
        }}
      />
    </section>
  );
}
