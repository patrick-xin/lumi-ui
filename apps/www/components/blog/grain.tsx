function Grain() {
  return (
    <div className="fixed inset-0 -z-50">
      <svg>
        <title>grain</title>
        <filter id="noiseFilter">
          <feTurbulence
            baseFrequency="0.6"
            stitchTiles="stitch"
            type="fractalNoise"
          />
        </filter>
      </svg>

      <svg>
        <title>grain</title>
        <filter id="noiseFilter2">
          <feTurbulence
            baseFrequency="0.6"
            stitchTiles="stitch"
            type="fractalNoise"
          />
        </filter>
        <clipPath id="rounded-clip">
          <rect height="300" rx="20" ry="20" width="300" x="0" y="0" />
        </clipPath>
      </svg>

      <svg>
        <title>grain</title>
        <filter id="noiseFilter3">
          <feTurbulence
            baseFrequency="0.6"
            stitchTiles="stitch"
            type="fractalNoise"
          />
        </filter>
        <clipPath id="rounded-clip2">
          <rect height="70" rx="20" ry="20" width="230" x="0" y="0" />
        </clipPath>
      </svg>
    </div>
  );
}

export default Grain;
