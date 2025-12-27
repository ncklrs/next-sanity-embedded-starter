// This script is meant to be run with: bunx sanity exec scripts/seed-pages.ts --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function seedPages() {
  console.log('Creating Lumi Spray pages...')

  // Homepage
  const homepage = await client.create({
    _type: 'page',
    title: 'Home',
    slug: { current: 'home', _type: 'slug' },
    modules: [
      {
        _type: 'heroDefault',
        _key: 'hero-1',
        badge: { text: 'Revolutionary Interactive Art', variant: 'gradient' },
        heading: 'Paint With Light',
        headingHighlight: 'Light',
        subheading: 'Wave an LED light to create stunning digital graffiti in real-time. Perfect for events, museums, and brand activations.',
        buttons: [
          { _type: 'simpleButton', _key: 'btn-1', text: 'Get Started', link: '/pricing', variant: 'primary' },
          { _type: 'simpleButton', _key: 'btn-2', text: 'See It In Action', link: '/how-it-works', variant: 'secondary' },
        ],
        backgroundStyle: 'gradient-orbs',
        alignment: 'center',
      },
      {
        _type: 'featuresGrid',
        _key: 'features-1',
        badge: 'Features',
        heading: 'Create Magic With Every Wave',
        headingHighlight: 'Magic',
        subheading: 'Lumi Spray transforms any LED light into a digital paintbrush with professional-grade spray paint effects.',
        columns: 3,
        features: [
          { _key: 'f1', icon: 'zap', title: 'Real-Time Painting', description: 'Zero latency light detection. Your artwork appears instantly as you move the light.' },
          { _key: 'f2', icon: 'paintbrush', title: 'Spray Paint Effects', description: 'Four authentic patterns: Solid, Splatter, Airbrush, and Graffiti textures.' },
          { _key: 'f3', icon: 'smartphone', title: 'iPhone Control', description: 'SprayCan companion app lets you control colors and trigger spray via Bluetooth.' },
          { _key: 'f4', icon: 'layout', title: 'Built-In Stencils', description: 'Shapes like circles, stars, and hearts for structured art.' },
          { _key: 'f5', icon: 'settings', title: 'Easy Calibration', description: '4-step setup works with any camera and display configuration.' },
          { _key: 'f6', icon: 'rocket', title: 'Metal Accelerated', description: 'Hardware-accelerated rendering for smooth 60+ FPS painting.' },
        ],
      },
      {
        _type: 'pricingCards',
        _key: 'pricing-1',
        badge: 'Pricing',
        heading: 'Flexible Plans For Every Need',
        headingHighlight: 'Every Need',
        subheading: 'From single events to permanent installations, we have a solution that fits.',
        plans: [
          {
            _key: 'plan-1',
            name: 'Single Event',
            price: '$399',
            period: '7 days',
            description: 'Perfect for one-time activations',
            features: ['1 Mac license', 'Offline operation', '7-day duration', 'Email support'],
            buttonText: 'Get License',
            buttonVariant: 'secondary',
            popular: false,
          },
          {
            _key: 'plan-2',
            name: 'Annual License',
            price: '$1,299',
            period: '/year',
            description: 'For regular event companies',
            features: ['1 Mac license', 'Unlimited events', 'Free updates', 'Priority support', '1 hardware transfer/year'],
            buttonText: 'Start Now',
            buttonVariant: 'primary',
            popular: true,
          },
          {
            _key: 'plan-3',
            name: 'Enterprise',
            price: '$3,999',
            period: '/year',
            description: 'For large agencies',
            features: ['5 Mac seats', 'Seat management portal', 'Custom branding', '24/7 priority support', 'Dedicated account manager'],
            buttonText: 'Contact Sales',
            buttonVariant: 'secondary',
            popular: false,
          },
        ],
      },
      {
        _type: 'cta.default',
        _key: 'cta-1',
        heading: 'Ready to Create Magic?',
        headingHighlight: 'Magic',
        subheading: 'Get started with Lumi Spray today and transform your next event into an unforgettable experience.',
        buttons: [
          { _type: 'simpleButton', _key: 'cta-btn-1', text: 'Request Demo', link: '/contact', variant: 'primary' },
          { _type: 'simpleButton', _key: 'cta-btn-2', text: 'View Pricing', link: '/pricing', variant: 'secondary' },
        ],
      },
    ],
  })
  console.log('Created homepage:', homepage._id)

  // How It Works page
  const howItWorks = await client.create({
    _type: 'page',
    title: 'How It Works',
    slug: { current: 'how-it-works', _type: 'slug' },
    modules: [
      {
        _type: 'heroMinimal',
        _key: 'hero-1',
        heading: 'How It Works',
        headingHighlight: 'Works',
        subheading: 'Discover the magic behind Lumi Spray - from setup to first masterpiece in minutes.',
      },
      {
        _type: 'steps',
        _key: 'steps-1',
        heading: 'Get Started In 4 Simple Steps',
        headingHighlight: '4 Simple Steps',
        steps: [
          { _key: 's1', title: 'Connect Your Hardware', description: 'Plug in your Mac Mini, webcam, and display. Lumi Spray auto-detects your setup.' },
          { _key: 's2', title: 'Run Calibration', description: '4-corner calibration maps your camera view to the display for pixel-perfect accuracy.' },
          { _key: 's3', title: 'Grab a Light', description: 'Any LED flashlight, wand, or even your iPhone flashlight becomes your paintbrush.' },
          { _key: 's4', title: 'Start Creating', description: 'Wave the light to paint! Switch colors, patterns, and stencils from the control panel.' },
        ],
      },
      {
        _type: 'featuresAlternating',
        _key: 'features-1',
        heading: 'Powerful Features',
        headingHighlight: 'Powerful',
        items: [
          {
            _key: 'i1',
            heading: 'Real-Time Light Detection',
            description: 'Our computer vision pipeline detects light sources in real-time with intelligent color filtering, blob detection, and temporal smoothing for buttery-smooth strokes.',
            features: ['Brightness-based on/off detection', 'Velocity tracking for prediction', 'Ambient light subtraction'],
          },
          {
            _key: 'i2',
            heading: 'Authentic Spray Paint Effects',
            description: 'Particle-based rendering creates organic, natural paint effects with physics-based particles that respond to your movements.',
            features: ['4 spray patterns', 'Adjustable particle density', 'Dwell effect for density buildup'],
          },
          {
            _key: 'i3',
            heading: 'iPhone Remote Control',
            description: 'The SprayCan companion app connects via Bluetooth to give you professional spray control from your palm.',
            features: ['Real-time color selection', 'Brush size control', 'Haptic feedback', 'Spray trigger'],
          },
        ],
      },
    ],
  })
  console.log('Created how-it-works:', howItWorks._id)

  // Pricing page
  const pricing = await client.create({
    _type: 'page',
    title: 'Pricing',
    slug: { current: 'pricing', _type: 'slug' },
    modules: [
      {
        _type: 'heroMinimal',
        _key: 'hero-1',
        heading: 'Simple, Transparent Pricing',
        headingHighlight: 'Pricing',
        subheading: 'Choose the plan that fits your needs. From single events to enterprise deployments.',
      },
      {
        _type: 'pricingCards',
        _key: 'pricing-software',
        badge: 'Software Licenses',
        heading: 'Software Only',
        subheading: 'Already have hardware? Just need the software license.',
        plans: [
          {
            _key: 'sw-1',
            name: 'Single Event',
            price: '$399',
            period: '7 days',
            description: 'Test before committing',
            features: ['One Mac license', 'Offline after activation', '7-day duration', 'Email support'],
            buttonText: 'Buy License',
            buttonVariant: 'secondary',
            popular: false,
          },
          {
            _key: 'sw-2',
            name: 'Annual',
            price: '$1,299',
            period: '/year',
            description: 'Best for regular use',
            features: ['One Mac license', 'Unlimited events', 'Free updates', 'Priority support', 'Hardware transfer 1x/year'],
            buttonText: 'Get Started',
            buttonVariant: 'primary',
            popular: true,
          },
          {
            _key: 'sw-3',
            name: 'Enterprise',
            price: '$3,999',
            period: '/year',
            description: 'For agencies',
            features: ['5 Mac seats', 'Seat management', 'Custom branding', '24/7 support', 'Dedicated manager'],
            buttonText: 'Contact Sales',
            buttonVariant: 'secondary',
            popular: false,
          },
        ],
      },
      {
        _type: 'pricingCards',
        _key: 'pricing-bundles',
        badge: 'Hardware Bundles',
        heading: 'Complete Kits',
        subheading: 'Everything you need to get started, ready to deploy.',
        plans: [
          {
            _key: 'hw-1',
            name: 'Basic Kit',
            price: '$1,299',
            period: 'one-time',
            description: 'Plug-and-play setup',
            features: ['Mac Mini M2', 'Logitech webcam', '5 LED wands', 'Annual license', 'Quick start guide'],
            buttonText: 'Buy Kit',
            buttonVariant: 'secondary',
            popular: false,
          },
          {
            _key: 'hw-2',
            name: 'Pro Kit',
            price: '$1,999',
            period: 'one-time',
            description: 'Professional deployment',
            features: ['Mac Mini M2 16GB', 'Logitech Brio 4K', '10 LED wands', 'Carrying case', 'Annual license', 'Setup call'],
            buttonText: 'Buy Pro Kit',
            buttonVariant: 'primary',
            popular: true,
          },
        ],
      },
      {
        _type: 'pricingCards',
        _key: 'pricing-rentals',
        badge: 'Event Rentals',
        heading: 'Full Service Rentals',
        subheading: 'Zero hassle. We deliver, set up, and support your event.',
        plans: [
          {
            _key: 'r-1',
            name: 'Single Day',
            price: '$1,500',
            period: '1 day',
            description: 'Corporate events, parties',
            features: ['Hardware delivery', 'On-site setup', 'Operator training', 'Teardown included'],
            buttonText: 'Book Now',
            buttonVariant: 'secondary',
            popular: false,
          },
          {
            _key: 'r-2',
            name: 'Weekend',
            price: '$2,500',
            period: '3 days',
            description: 'Festivals, conferences',
            features: ['Everything in Single Day', 'Extended hours', 'Backup equipment', 'On-call support'],
            buttonText: 'Book Weekend',
            buttonVariant: 'primary',
            popular: true,
          },
          {
            _key: 'r-3',
            name: 'Week',
            price: '$4,000',
            period: '7 days',
            description: 'Trade shows, exhibitions',
            features: ['Everything in Weekend', 'Daily check-ins', 'Larger display (43")', 'Priority support'],
            buttonText: 'Book Week',
            buttonVariant: 'secondary',
            popular: false,
          },
        ],
      },
      {
        _type: 'faqAccordion',
        _key: 'faq-1',
        heading: 'Frequently Asked Questions',
        items: [
          { _key: 'faq1', question: 'What hardware do I need?', answer: 'A Mac with M1/M2 or newer, a USB webcam (Logitech C920 or better recommended), any LED light sources, and a display or projector.' },
          { _key: 'faq2', question: 'Can I use it offline?', answer: 'Yes! After initial activation, Lumi Spray works completely offline - perfect for venues with unreliable wifi.' },
          { _key: 'faq3', question: 'How does hardware locking work?', answer: 'Each license is locked to one Mac serial number. Annual licenses can transfer to new hardware once per year.' },
          { _key: 'faq4', question: 'Do you offer custom installations?', answer: 'Yes! Contact us for managed installation services starting at $5,000 for museums and permanent venues.' },
        ],
      },
    ],
  })
  console.log('Created pricing:', pricing._id)

  // Use Cases page
  const useCases = await client.create({
    _type: 'page',
    title: 'Use Cases',
    slug: { current: 'use-cases', _type: 'slug' },
    modules: [
      {
        _type: 'heroMinimal',
        _key: 'hero-1',
        heading: 'Where Light Meets Art',
        headingHighlight: 'Art',
        subheading: 'From corporate events to world-class museums, Lumi Spray creates unforgettable experiences.',
      },
      {
        _type: 'featuresAlternating',
        _key: 'cases-1',
        heading: 'Perfect For Every Venue',
        items: [
          {
            _key: 'c1',
            heading: 'Brand Activations',
            description: 'Create memorable brand experiences that guests will share on social media. Custom backgrounds and branded stencils make every photo on-brand.',
            features: ['Custom branding options', 'Social-ready artwork export', 'Instant engagement'],
          },
          {
            _key: 'c2',
            heading: 'Museums & Exhibitions',
            description: 'Turn visitors into artists with permanent installations that work reliably day after day with managed support.',
            features: ['Remote monitoring', 'Auto-reset between sessions', 'Enterprise support'],
          },
          {
            _key: 'c3',
            heading: 'Corporate Events',
            description: 'Team building, product launches, and holiday parties transformed with interactive art that brings people together.',
            features: ['Easy setup/teardown', 'Works in any venue', 'Rental options available'],
          },
          {
            _key: 'c4',
            heading: 'Trade Shows',
            description: 'Stand out on the show floor with an interactive booth experience that draws crowds and captures leads.',
            features: ['Portable setup', 'Week-long rentals', 'High-traffic ready'],
          },
        ],
      },
    ],
  })
  console.log('Created use-cases:', useCases._id)

  // Contact page
  const contact = await client.create({
    _type: 'page',
    title: 'Contact',
    slug: { current: 'contact', _type: 'slug' },
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
        heading: 'Request a Demo',
        subheading: 'Fill out the form and we\'ll get back to you within 24 hours.',
        fields: [
          { _key: 'f1', name: 'name', label: 'Full Name', type: 'text', required: true },
          { _key: 'f2', name: 'email', label: 'Email', type: 'email', required: true },
          { _key: 'f3', name: 'company', label: 'Company', type: 'text', required: false },
          { _key: 'f4', name: 'message', label: 'Tell us about your event', type: 'textarea', required: true },
        ],
        submitText: 'Request Demo',
        successMessage: 'Thanks! We\'ll be in touch soon.',
      },
    ],
  })
  console.log('Created contact:', contact._id)

  // Update or create site settings
  const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`)

  if (existingSettings) {
    await client.patch(existingSettings._id).set({
      title: 'Lumi Spray',
      description: 'Revolutionary digital graffiti installation. Paint with light in real-time.',
      homepage: { _type: 'reference', _ref: homepage._id },
      footerNavigation: {
        description: 'Paint with light. Create unforgettable experiences.',
        copyrightText: 'Lumi Spray. All rights reserved.',
        linkColumns: [
          {
            _key: 'col-1',
            title: 'Product',
            links: [
              { _key: 'l1', label: 'Features', linkType: 'internal', internalLink: { _type: 'reference', _ref: homepage._id } },
              { _key: 'l2', label: 'Pricing', linkType: 'internal', internalLink: { _type: 'reference', _ref: pricing._id } },
              { _key: 'l3', label: 'How It Works', linkType: 'internal', internalLink: { _type: 'reference', _ref: howItWorks._id } },
            ],
          },
          {
            _key: 'col-2',
            title: 'Solutions',
            links: [
              { _key: 'l4', label: 'Use Cases', linkType: 'internal', internalLink: { _type: 'reference', _ref: useCases._id } },
              { _key: 'l5', label: 'Event Rentals', linkType: 'internal', internalLink: { _type: 'reference', _ref: pricing._id } },
              { _key: 'l6', label: 'Managed Installations', linkType: 'internal', internalLink: { _type: 'reference', _ref: contact._id } },
            ],
          },
          {
            _key: 'col-3',
            title: 'Company',
            links: [
              { _key: 'l7', label: 'Contact', linkType: 'internal', internalLink: { _type: 'reference', _ref: contact._id } },
            ],
          },
        ],
      },
      headerNavigation: {
        showCta: true,
        navLinks: [
          { _key: 'n1', label: 'How It Works', linkType: 'internal', internalLink: { _type: 'reference', _ref: howItWorks._id } },
          { _key: 'n2', label: 'Use Cases', linkType: 'internal', internalLink: { _type: 'reference', _ref: useCases._id } },
          { _key: 'n3', label: 'Pricing', linkType: 'internal', internalLink: { _type: 'reference', _ref: pricing._id } },
        ],
        ctaButtons: [
          { _key: 'cta1', _type: 'button', label: 'Get Demo', linkType: 'internal', internalLink: { _type: 'reference', _ref: contact._id }, variant: 'primary', size: 'md' },
        ],
      },
    }).commit()
    console.log('Updated site settings')
  } else {
    await client.create({
      _type: 'siteSettings',
      title: 'Lumi Spray',
      description: 'Revolutionary digital graffiti installation. Paint with light in real-time.',
      homepage: { _type: 'reference', _ref: homepage._id },
    })
    console.log('Created site settings')
  }

  console.log('\nDone! Pages created:')
  console.log('- Homepage:', homepage._id)
  console.log('- How It Works:', howItWorks._id)
  console.log('- Pricing:', pricing._id)
  console.log('- Use Cases:', useCases._id)
  console.log('- Contact:', contact._id)
}

seedPages().catch(console.error)
