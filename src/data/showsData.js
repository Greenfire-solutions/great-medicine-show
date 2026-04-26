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

export const bookingOffers = [
  {
    id: 'booking-festival',
    title: 'Festivals',
    date: 'Seasonal',
    location: 'Regional + National',
    description: 'High-energy festival-ready Great Medicine Show performance sets.',
    bookingUrl: ''
  },
  {
    id: 'booking-private',
    title: 'Private Events',
    date: 'Year-round',
    location: 'On-site + Destination',
    description: 'Tailored private event experiences for intimate and large gatherings.',
    bookingUrl: ''
  },
  {
    id: 'booking-retreat',
    title: 'Retreats',
    date: 'By request',
    location: 'Retreat Centers',
    description: 'Immersive ceremonial music journeys for retreat environments.',
    bookingUrl: ''
  },
  {
    id: 'booking-wedding',
    title: 'Weddings / Celebrations',
    date: 'By request',
    location: 'Destination + Local',
    description: 'Bespoke celebratory performances blending ritual, dance, and live music.',
    bookingUrl: ''
  },
  {
    id: 'booking-performance',
    title: 'Fire / Dance / Performance Packages',
    date: 'Custom dates',
    location: 'Venue dependent',
    description: 'Multi-artist performance bundles featuring fire and movement arts.',
    bookingUrl: ''
  }
]

export const bookingInquiryUrl = ''
