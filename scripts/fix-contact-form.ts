import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function fixContactForm() {
  console.log('Creating form document...')

  // Create a reusable contact form document
  const contactForm = await client.create({
    _type: 'form',
    name: 'Contact Demo Request',
    description: 'Request a demo of Lumi Spray',
    fields: [
      { _key: 'f1', name: 'name', label: 'Full Name', type: 'text', required: true },
      { _key: 'f2', name: 'email', label: 'Email', type: 'email', required: true },
      { _key: 'f3', name: 'company', label: 'Company', type: 'text', required: false },
      { _key: 'f4', name: 'message', label: 'Tell us about your event', type: 'textarea', required: true },
    ],
    submitText: 'Request Demo',
    successMessage: "Thanks! We'll be in touch soon.",
  })
  console.log('Created form document:', contactForm._id)

  // Find the contact page
  const contactPage = await client.fetch(`*[_type == "page" && slug.current == "contact"][0]`)
  if (!contactPage) {
    console.log('Contact page not found')
    return
  }

  // Update the contact page with correct formContact module
  await client.patch(contactPage._id).set({
    modules: [
      {
        _type: 'heroMinimal',
        _key: 'hero-1',
        heading: 'Get In Touch',
        headingHighlight: 'Touch',
        subheading: 'Ready to bring Lumi Spray to your next event? Request a demo or ask us anything.',
      },
      {
        _type: 'formContact',
        _key: 'form-1',
        form: { _type: 'reference', _ref: contactForm._id },
        heading: 'Request a Demo',
        subheading: "Fill out the form and we'll get back to you within 24 hours.",
      },
    ],
  }).commit()
  console.log('Updated contact page')
}

fixContactForm().catch(console.error)
