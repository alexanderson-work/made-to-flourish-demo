// Every image on the site, stored in src/assets and optimized by Astro at build time (resized, converted to WebP).
// The photos are the 2026 event's, kept as references and examples; a new site should use its own photography.
// The artwork (hero illustration, title card, florals) matches the Figma file's Visuals page.
import heroIllustration from '../assets/art/hero-illustration.jpg';
import lockupCardWithLilies from '../assets/art/lockup-card-with-lilies.png';
import liliesTall from '../assets/art/lilies-tall.png';
import liliesWide from '../assets/art/lilies-wide.png';
import daffodils from '../assets/art/daffodils.png';
import venue from '../assets/photos/venue.jpg';
import stadium from '../assets/photos/stadium.jpg';
import gathering1 from '../assets/photos/gathering-1.jpg';
import gathering2 from '../assets/photos/gathering-2.jpg';
import gathering3 from '../assets/photos/gathering-3.jpg';
import gathering4 from '../assets/photos/gathering-4.jpg';
import gathering5 from '../assets/photos/gathering-5.jpg';
import gathering6 from '../assets/photos/gathering-6.jpg';
import venue1 from '../assets/photos/venue-1.jpg';
import venue2 from '../assets/photos/venue-2.jpg';
import venue3 from '../assets/photos/venue-3.jpg';
import venue4 from '../assets/photos/venue-4.jpg';
import stadium1 from '../assets/photos/stadium-1.jpg';
import stadium2 from '../assets/photos/stadium-2.jpg';
import stadium3 from '../assets/photos/stadium-3.jpg';
import andyCrouch from '../assets/speakers/andy-crouch.jpg';
import tomNelson from '../assets/speakers/tom-nelson.jpg';
import mattRusten from '../assets/speakers/matt-rusten.jpg';
import chrisHollyJustice from '../assets/speakers/chris-holly-justice.jpg';
import marcellusCasey from '../assets/speakers/marcellus-casey.jpg';
import thomasKim from '../assets/speakers/thomas-kim.png';
import stephenBruner from '../assets/speakers/stephen-bruner.png';
import dameinSchitter from '../assets/speakers/damein-schitter.jpg';

export const art = {
  heroBackground: heroIllustration, // Visuals → Illustration / Hero Background
  lockupWithLilies: lockupCardWithLilies, // Visuals → Lockup / Title Card with Lilies
  liliesTall, // florals-01
  liliesWide, // florals-03
  daffodils, // florals-04
};

export const photos = {
  venue,
  stadium,
  gathering: [
    { src: gathering1, alt: 'A speaker on stage beside a panel of guests' },
    { src: gathering2, alt: 'Guests listening at round tables' },
    { src: gathering3, alt: 'A panel conversation on a leather sofa' },
    { src: gathering4, alt: 'A speaker presenting leadership training on stage' },
    { src: gathering5, alt: 'A copy of Tom Nelson’s book Why Your Work Matters on a table' },
    { src: gathering6, alt: 'Guests talking in a hotel ballroom foyer' },
  ],
  venueStrip: [
    { src: venue1, alt: 'The hotel rooftop terrace at dusk' },
    { src: venue2, alt: 'The hotel bar and lounge' },
    { src: venue3, alt: 'A hotel suite with a brick wall' },
    { src: venue4, alt: 'A hotel guest room' },
  ],
  stadiumStrip: [
    { src: stadium1, alt: 'Arrowhead Stadium from the upper deck' },
    { src: stadium2, alt: 'Arrowhead Stadium from outside' },
    { src: stadium3, alt: 'Chiefs fans in red at a rally' },
  ],
};

export const speakerPhotos: Record<string, ImageMetadata> = {
  'andy-crouch': andyCrouch,
  'tom-nelson': tomNelson,
  'matt-rusten': mattRusten,
  'chris-holly-justice': chrisHollyJustice,
  'marcellus-casey': marcellusCasey,
  'thomas-kim': thomasKim,
  'stephen-bruner': stephenBruner,
  'damein-schitter': dameinSchitter,
};
