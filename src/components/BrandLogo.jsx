import { useState } from "react";

/**
 * Simple brand logo with a graceful fallback (text) if the image is missing.
 * Put generated assets in /public/brand/: logo-color-256.png, logo-white-256.png
 */
export default function BrandLogo({
  variant = "color",   // "color" | "white"
  size = 28,           // height in px
  className = "",
  alt = "BVTronix",
}) {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback so the app never crashes/looks blank
    return (
      <span
        className={`font-extrabold tracking-wide ${className}`}
        style={{ fontSize: size * 0.9 }}
      >
        BVTRONIX
      </span>
    );
  }

  const src =
    variant === "white"
      ? "/brand/logo-white-256.png"
      : "/brand/logo-color-256.png";

  return (
    <img
      src={src}
      alt={alt}
      height={size}
      style={{ height: size }}
      className={`w-auto select-none ${className}`}
      draggable="false"
      onError={() => setError(true)}
    />
  );
}
