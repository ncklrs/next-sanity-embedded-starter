"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import { assist } from "@sanity/assist";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "default",
  title: "Next Sanity Embedded Starter",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool(),
    unsplashImageAsset(),
    media({
      creditLine: {
        enabled: true,
        excludeSources: ["unsplash"],
      },
      maximumUploadSize: 10000000, // 10MB
    }),
    assist(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
