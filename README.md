# Flávio Filho — Portfolio

An editorial, bilingual portfolio built with React, Vite and Tailwind CSS. It presents digital services, professional experience and verified contact channels.

## Development

```bash
npm install
npm run dev
```

Validation: `npm run lint` and `npm run build`.

## Structure

- `src/components/Sections.jsx`: page sections and shared editorial heading.
- `src/components/EditorialMark.jsx`: the drawn underline used in editorial headings and selected copy.
- `src/components/SiteChrome.jsx`: navigation, language and theme controls, footer.
- `src/i18n/locales/`: English and Brazilian Portuguese content.
- `src/hooks/useScrollReveal.js`: GSAP ScrollTrigger entrances with cleanup and reduced-motion support.
- `src/hooks/useHeroParallax.js`: restrained desktop scroll movement for the portrait.
- `src/hooks/useSectionNavigation.js`: eased navigation to sections, with sticky-header offset and an instant reduced-motion path.
- `src/hooks/useTheme.js`: system theme detection and persistent manual selection.
- `src/hooks/useMotionPreference.js`: enables motion by default and remembers a visitor's choice to reduce it.
- `src/index.css` and `tailwind.config.js`: semantic design tokens and typography.

The professional work cards describe responsibilities from employment history; they are not presented as independent client case studies. Academic details come from the previous portfolio content and should be reviewed against the latest résumé before publication.
