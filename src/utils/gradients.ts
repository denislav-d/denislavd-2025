export type GradientScheme = {
  from: string;
  via: string;
  to: string;
};

// Color interpolation helper function that handles both RGB and RGBA
export function interpolateRGB(
  color1: string,
  color2: string,
  factor: number,
): string {
  const parseColor = (color: string) => {
    const isRGBA = color.includes("rgba");
    const values = color.match(/[\d.]+/g)?.map(Number) || [];

    return {
      r: values[0] || 0,
      g: values[1] || 0,
      b: values[2] || 0,
      a: isRGBA ? (values[3] ?? 1) : 1,
      hasAlpha: isRGBA,
    };
  };

  const color1Parsed = parseColor(color1);
  const color2Parsed = parseColor(color2);

  // Interpolate each channel including alpha
  const r = Math.round(
    color1Parsed.r + (color2Parsed.r - color1Parsed.r) * factor,
  );
  const g = Math.round(
    color1Parsed.g + (color2Parsed.g - color1Parsed.g) * factor,
  );
  const b = Math.round(
    color1Parsed.b + (color2Parsed.b - color1Parsed.b) * factor,
  );
  const a = color1Parsed.a + (color2Parsed.a - color1Parsed.a) * factor;

  const hasAlpha = color1Parsed.hasAlpha || color2Parsed.hasAlpha;

  if (hasAlpha) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Function to get interpolated gradient based on position
export function getInterpolatedGradient(
  position: number,
  gradientSchemes: GradientScheme[],
): {
  from: string;
  via: string;
  to: string;
} {
  const totalSlides = gradientSchemes.length;
  const clampedPosition = Math.max(0, Math.min(totalSlides - 1, position));

  const currentIndex = Math.floor(clampedPosition);
  const nextIndex = Math.min(currentIndex + 1, totalSlides - 1);
  const factor = clampedPosition - currentIndex;

  const currentScheme = gradientSchemes[currentIndex];
  const nextScheme = gradientSchemes[nextIndex];

  // If we're exactly on a slide or at the last slide, return the exact scheme
  if (factor === 0 || currentIndex === nextIndex) {
    return currentScheme;
  }

  return {
    from: interpolateRGB(currentScheme.from, nextScheme.from, factor),
    via: interpolateRGB(currentScheme.via, nextScheme.via, factor),
    to: interpolateRGB(currentScheme.to, nextScheme.to, factor),
  };
}
