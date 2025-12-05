/**
 * Form Action Handlers
 *
 * Orchestrates execution of all form actions.
 */

import {
  handleDiscordWebhook,
  type DiscordWebhookAction,
} from "./discord";
import {
  handleGenericWebhook,
  type GenericWebhookAction,
} from "./webhook";
import {
  handleEmailNotification,
  type EmailNotificationAction,
} from "./email";

export type FormAction =
  | DiscordWebhookAction
  | GenericWebhookAction
  | EmailNotificationAction
  | SanityStorageAction;

export interface SanityStorageAction {
  _type: "sanityStorageAction";
  _key: string;
  enabled: boolean;
  name?: string;
  formNameOverride?: string;
}

export interface ActionResult {
  actionType: string;
  actionName?: string;
  success: boolean;
  error?: string;
}

export interface FormConfig {
  _id: string;
  name: string;
}

/**
 * Execute all enabled form actions in parallel
 *
 * Note: SanityStorageAction is handled separately in the main submit function
 * since it creates the formSubmission document with action results.
 */
export async function executeFormActions(
  actions: FormAction[],
  formData: Record<string, unknown>,
  formConfig: FormConfig
): Promise<ActionResult[]> {
  // Filter to only enabled actions (excluding Sanity storage which is handled separately)
  const enabledActions = actions.filter(
    (action) => action.enabled && action._type !== "sanityStorageAction"
  );

  if (enabledActions.length === 0) {
    return [];
  }

  // Execute all actions in parallel
  const results = await Promise.allSettled(
    enabledActions.map(async (action) => {
      try {
        await executeAction(action, formData, formConfig);
        return {
          actionType: action._type,
          actionName: action.name,
          success: true,
        };
      } catch (error) {
        return {
          actionType: action._type,
          actionName: action.name,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    })
  );

  // Convert PromiseSettledResult to ActionResult
  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    return {
      actionType: enabledActions[index]._type,
      actionName: enabledActions[index].name,
      success: false,
      error: result.reason?.message || "Action failed",
    };
  });
}

/**
 * Execute a single action based on its type
 */
async function executeAction(
  action: FormAction,
  formData: Record<string, unknown>,
  formConfig: FormConfig
): Promise<void> {
  switch (action._type) {
    case "discordWebhookAction":
      await handleDiscordWebhook(action, formData, formConfig);
      break;

    case "genericWebhookAction":
      await handleGenericWebhook(action, formData, formConfig);
      break;

    case "emailNotificationAction":
      await handleEmailNotification(action, formData, formConfig);
      break;

    case "sanityStorageAction":
      // Handled separately in the main submit function
      break;

    default:
      throw new Error(`Unknown action type: ${(action as { _type: string })._type}`);
  }
}

/**
 * Check if Sanity storage is enabled for this form
 */
export function isSanityStorageEnabled(actions: FormAction[]): boolean {
  return actions.some(
    (action) =>
      action._type === "sanityStorageAction" && action.enabled
  );
}

/**
 * Get Sanity storage action config
 */
export function getSanityStorageAction(
  actions: FormAction[]
): SanityStorageAction | undefined {
  return actions.find(
    (action): action is SanityStorageAction =>
      action._type === "sanityStorageAction" && action.enabled
  );
}

// Re-export individual handlers for direct use
export { handleDiscordWebhook } from "./discord";
export { handleGenericWebhook } from "./webhook";
export { handleEmailNotification } from "./email";
