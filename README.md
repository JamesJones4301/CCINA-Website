# CCINA Website

Five-page Vite site for Christ Centered Investors’ Network Austin.

## Live calendar setup

1. Create a Google Sheet named **CCINA Events** and import `sample-events.csv`. Keep the exact column headers: `date,title,type,time,location,description`. Dates use `YYYY-MM-DD`.
2. In Google Sheets open **File > Share > Publish to web**. Select the event tab and **Comma-separated values (.csv)**. Publish and copy the CSV URL. Only publish public event information.
3. In `config.js`, set `SHEET_CSV_URL` to that URL. The browser fetches the published Sheet on page load, so future Sheet edits need no code changes or redeployment. Google publication caching could delay updates.
4. Create the ten-question Google Form from `SURVEY.md`. Publish the Form for responses. Choose Embed HTML and copy the iframe's `src` URL into `FORM_EMBED_URL` in `config.js`.
5. Optionally set `CONTACT_EMAIL` to an approved public CCINA email.
6. Upload the supplied official CCINA image to `assets/logo.jpg` in GitHub. Until the asset is uploaded the site shows a text logo. Colors are CSS variables at the top of `style.css`.

## Deploy

Import `JamesJones4301/CCINA-Website` in Vercel as a Vite project. Build: `npm run build`. Output: `dist`. Vercel auto-deploys commits on main. Verify all pages and mobile layout, published events, holiday highlight and Form functionality before sharing.

## Monthly updates

Edit explicit dated event rows in Google Sheets. Do not calculate recurrence in the code. Use the optional `type` column for calendar filtering. The holiday theme applies only to 2026-12-07 when its title contains Ornament Gifting. Sample dates other than December 7 are illustrations, not confirmed events.

## Development

Run `npm install`, then `npm run dev` or `npm run build`. No member data is stored by this static website; Google Forms holds responses.
