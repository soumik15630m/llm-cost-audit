import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Basic PWA manifest (theme color = deep ink). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} - Inference cost audits`,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0908",
    theme_color: "#0a0908",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
