import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function fixFormSettings() {
  const formId = 'NJZLoMez4714Sf01dLSoZD'

  await client.patch(formId).set({
    settings: {
      submitButtonText: 'Request Demo',
      submitButtonLoadingText: 'Submitting...',
      successTitle: 'Thank you!',
      successMessage: "We'll be in touch within 24 hours.",
      errorMessage: 'Something went wrong. Please try again.',
      enableSpamProtection: true,
    },
  }).unset(['submitText', 'successMessage']).commit()

  console.log('Fixed form settings')
}

fixFormSettings().catch(console.error)
