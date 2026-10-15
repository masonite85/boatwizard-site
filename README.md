# BoatWizard website

Static React site (Vite + Tailwind), hosted on GitHub Pages.

## Publish
1. Push this folder to a GitHub repo (branch `main`).
2. In the repo: Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` rebuilds and publishes the site.

## Service request form
Submissions are emailed to gwaoutdoors@gmail.com through FormSubmit
(endpoint at the top of `client/src/components/ContactSection.tsx`).
The first submission sends an activation email to that inbox — click it once.

## Local preview
    npm install
    npm run dev
