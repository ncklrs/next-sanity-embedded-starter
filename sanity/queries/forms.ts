/**
 * Form Queries
 *
 * Queries for fetching form configurations.
 * IMPORTANT: Separates server-side (with actions) from client-side (without sensitive data)
 */

// Shared form field projection - used by multiple queries
const formFieldsProjection = `fields[]{
  _key,
  name,
  label,
  type,
  required,
  placeholder,
  helpText,
  defaultValue,
  width,
  options[]{ label, value },
  rows,
  accept,
  multiple,
  validation
}`;

// Form settings projection
const formSettingsProjection = `settings{
  submitButtonText,
  submitButtonLoadingText,
  successTitle,
  successMessage,
  errorMessage,
  enableSpamProtection
}`;

/**
 * SERVER-SIDE: Fetch form config with actions for submission processing
 * Includes action configurations needed to execute form submission
 * Note: Actions are explicitly defined - no spread operator for security
 */
export const formConfigWithActionsQuery = `*[_type == "form" && _id == $formId][0]{
  _id,
  name,
  identifier,
  ${formFieldsProjection},
  actions[]{
    _type,
    _key,
    enabled,
    name,
    // Webhook action fields
    _type == "webhookAction" => {
      url,
      method,
      headers[]{key, value}
    },
    // Discord action fields
    _type == "discordAction" => {
      webhookUrl,
      username,
      avatarUrl,
      embedTitle,
      embedColor
    },
    // Email action fields
    _type == "emailAction" => {
      to,
      from,
      subject,
      template
    },
    // Sanity storage action fields
    _type == "sanityStorageAction" => {
      formNameOverride
    }
  },
  ${formSettingsProjection}
}`;

/**
 * CLIENT-SIDE: Fetch form config by ID for rendering
 * Excludes sensitive action data
 */
export const formConfigByIdQuery = `*[_type == "form" && _id == $formId][0]{
  _id,
  name,
  identifier,
  description,
  ${formFieldsProjection},
  ${formSettingsProjection}
}`;

/**
 * CLIENT-SIDE: Fetch form config by identifier (slug)
 * Excludes sensitive action data
 */
export const formConfigByIdentifierQuery = `*[_type == "form" && identifier.current == $identifier][0]{
  _id,
  name,
  identifier,
  description,
  ${formFieldsProjection},
  ${formSettingsProjection}
}`;

/**
 * Fetch all form identifiers for static generation
 */
export const allFormIdentifiersQuery = `*[_type == "form" && defined(identifier.current)][].identifier.current`;

/**
 * Fetch form summary for listing/admin
 */
export const allFormsSummaryQuery = `*[_type == "form"] | order(_createdAt desc) {
  _id,
  name,
  identifier,
  description,
  "fieldCount": count(fields),
  "actionCount": count(actions),
  _createdAt,
  _updatedAt
}`;

/**
 * Check if form exists by identifier
 */
export const formExistsByIdentifierQuery = `count(*[_type == "form" && identifier.current == $identifier]) > 0`;
