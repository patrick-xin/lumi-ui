function Grain() {
	return (
		<div className="fixed inset-0 -z-50">
			<svg>
				<title>grain</title>
				<filter id="noiseFilter">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.6"
						stitchTiles="stitch"
					/>
				</filter>
			</svg>

			<svg>
				<title>grain</title>
				<filter id="noiseFilter2">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.6"
						stitchTiles="stitch"
					/>
				</filter>
				<clipPath id="rounded-clip">
					<rect x="0" y="0" width="300" height="300" rx="20" ry="20" />
				</clipPath>
			</svg>

			<svg>
				<title>grain</title>
				<filter id="noiseFilter3">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.6"
						stitchTiles="stitch"
					/>
				</filter>
				<clipPath id="rounded-clip2">
					<rect x="0" y="0" width="230" height="70" rx="20" ry="20" />
				</clipPath>
			</svg>
		</div>
	);
}

export default Grain;
