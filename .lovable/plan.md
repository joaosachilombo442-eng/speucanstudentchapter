# SPE UCAN Student Chapter Website

## Goal
Build the first complete public institutional website and an administrative interface that follows the supplied brief, uses the official logo, and never presents unverified organizational details as facts.

## Experience
- Portuguese (Angola) public pages: Início, Sobre Nós, Actividades e Eventos, Notícias, Programas e Projectos, Parcerias, Membros, Galeria and Contactos.
- Responsive shared navigation and footer, with a clear membership call to action.
- Editorial home page with relevant energy-industry photography, the supplied institutional description, activity areas and honest empty states for events, news and partners.
- Supporting pages with the supplied organization details, editable/awaiting-confirmation placeholders where required, and functional navigation, filters and accessible forms.
- `/admin` interface clearly identified as a visual preview only; no mock login, invented statistics, or claims that content has been saved.

## Design
Use the brief's SPE Royal Blue, Deep Navy, white, Ice Grey and restrained Energy Cyan palette; Manrope headings and Inter body/navigation; a corporate-academic editorial layout; and the uploaded logo without alteration. Do not invent people, dates, partners, achievements, contact/social details beyond those supplied, or event/news records.

## Technical approach
Use the existing TanStack Start and Tailwind v4 setup. Give each public section its own file-based route and metadata, with shared navigation/content components. Keep forms frontend-only and state explicitly that submission is not stored until a real backend is configured. Use the uploaded logo as a CDN asset and a padded square favicon; use relevant generated industrial photography without depicting identifiable UCAN people.

## Work sequence
1. Establish design tokens and shared institutional layout; add the official logo and homepage.
2. Add the public pages and their navigation, content states, and route-specific metadata.
3. Add the admin preview and clearly bounded frontend-only form interactions.
4. Check route coverage, tests, preview behavior and current build diagnostics; close the task roadmap.
