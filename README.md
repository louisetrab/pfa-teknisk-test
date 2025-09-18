# PFA Teknisk Test

Applikationen er lavet i Vue3. Skrevet i TypeScript og SCSS.

Applikationen henter karakterdata fra API, cacher resultatet i localStorage og præsenterer hver person som et interaktivt kort, der kan vendes for at vise ekstra oplysninger. Brugeren kan filtrere listen efter køn og birth_year-intervallet, og UI’et tilpasser sig automatisk mobil- og desktopstørrelser med et responsivt grid-layout.

Projektet demonstrerer:

- Komponentbaseret arkitektur
- Lokal caching af API-kald for bedre performance
- Interaktive og tilgængelige kort med flip-effekt og tastaturunderstøttelse
- Filtreringslogik, der synkroniserer valgte køn og aldersintervaller
- Scoped SCSS for præcis styling og media queries til responsivt design

Kør demoen:
npm install  
npm run dev

Åbn http://localhost:5173 for at se applikationen
