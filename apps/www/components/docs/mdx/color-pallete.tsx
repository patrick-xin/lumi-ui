export const ColorPallete = ({
  primary,
  secondary,
  accent,
  borderRadius,
}: {
  primary: string;
  secondary: string;
  accent: string;
  borderRadius?: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className="size-6 flex justify-center items-center"
          style={{
            border: `1px solid ${primary}`,
            borderRadius,
          }}
        >
          <div
            className="size-4"
            style={{
              border: `1px dashed ${primary}`,
              borderRadius,
            }}
          />
        </div>
        <div className="flex gap-2">
          {/* Primary */}
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: primary,
              borderRadius,
            }}
          />
          {/* Secondary */}
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: secondary,
              borderRadius,
            }}
          />
          {/* Accent */}
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: accent,
              borderRadius,
            }}
          />
        </div>
      </div>
    </div>
  );
};
