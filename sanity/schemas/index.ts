import {
  page,
  post,
  siteSettings,
  formSubmission,
  subscriber,
  form,
} from "./documents";
import * as objects from "./objects";
import * as modules from "./modules";

export const schemaTypes = [
  // Documents
  page,
  post,
  siteSettings,
  formSubmission,
  subscriber,
  form,
  // Objects
  ...Object.values(objects),
  // Modules
  ...Object.values(modules),
];
