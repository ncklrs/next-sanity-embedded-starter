import { page, post, siteSettings } from "./documents";
import * as objects from "./objects";
import * as modules from "./modules";

export const schemaTypes = [
  // Documents
  page,
  post,
  siteSettings,
  // Objects
  ...Object.values(objects),
  // Modules
  ...Object.values(modules),
];
