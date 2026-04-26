// Shows & Booking data
// How to update:
// 1) Add new shows in `upcomingShows` with title/date/location/description.
// 2) Set `flyerImage` to a real image URL when your event flyer is ready.
// 3) Set `ticketUrl` to your ticket purchase link (leave blank for coming-soon state).
// 4) Optional: customize CTA text using `ticketButtonText` (e.g., "Buy Tickets", "Reserve Spot").
export const upcomingShows = [
  {
    id: 'show-1',
    title: 'Cyber Garden Live Set',
    date: '2026-08-12',
    location: 'Portland, OR',
    description: 'A cinematic set with projection-mapped temple visuals.',
    flyerImage: 'https://placehold.co/720x420/2b2350/cff5ff?text=Cyber+Garden+Live+Set',
    ticketUrl: '',
    ticketButtonText: 'Buy Tickets'
  },
  {
    id: 'show-2',
    title: 'Elemental Hall Night',
    date: '2026-10-04',
    location: 'Austin, TX',
    description: 'Collaborative music ritual with guest performers.',
    flyerImage: '',
    ticketUrl: '',
    ticketButtonText: 'Buy Tickets'
  }
]

// Booking offers: set iconImage to a custom icon/image URL for each card.
// - Leave iconImage empty to show the circular placeholder icon.
// - bookingType is used to auto-fill the Formspree booking form.
export const bookingOffers = [
  {
    id: 'booking-festival',
    title: 'Festivals',
    description: 'High-energy festival-ready Great Medicine Show performance sets.',
    bookingType: 'Festival',
    iconImage: 'https://placehold.co/120x120/3d244f/d7c7ff?text=Fest',
    bookingUrl: ''
  },
  {
    id: 'booking-private',
    title: 'Private Events',
    description: 'Tailored private event experiences for intimate and large gatherings.',
    bookingType: 'Private Event',
    iconImage: 'https://placehold.co/120x120/203f56/c8f4ff?text=Priv',
    bookingUrl: ''
  },
  {
    id: 'booking-retreat',
    title: 'Retreats',
    description: 'Immersive ceremonial music journeys for retreat environments.',
    bookingType: 'Retreat',
    iconImage: '',
    bookingUrl: ''
  },
  {
    id: 'booking-wedding',
    title: 'Weddings / Celebrations',
    description: 'Bespoke celebratory performances blending ritual, dance, and live music.',
    bookingType: 'Wedding / Celebration',
    iconImage: '',
    bookingUrl: ''
  },
  {
    id: 'booking-performance',
    title: 'Fire / Dance / Performance Packages',
    description: 'Multi-artist performance bundles featuring fire and movement arts.',
    bookingType: 'Fire / Dance / Performance Package',
    iconImage: 'https://placehold.co/120x120/4d2a1f/ffd7b0?text=Fire',
    bookingUrl: ''
  }
]

export const bookingInquiryUrl = ''
