# Restaurant menu site (Arabic + English)

Static site for Netlify. Pages: `/` (Instagram + menu buttons), `/menu/` (the menu), `/admin/` (CMS).

## Deploy
1. Create a **private** GitHub repo and push this folder.
2. In Netlify: Add new project > Import from Git. Publish directory is already `public` (see netlify.toml). No build command.
3. Edit `public/admin/config.yml`: set `repo: your-user/online-menus`.
4. Enable the CMS login (Decap's GitHub backend needs OAuth):
   - GitHub > Settings > Developer settings > OAuth Apps > New. Homepage: your site URL. Callback: `https://api.netlify.com/auth/done`.
   - Netlify > Project configuration > Access & security > OAuth > Install provider > GitHub, paste Client ID and Secret.
   - Editors need a GitHub account with write access to the repo.
5. Open `/admin/`, log in, edit dishes, upload photos, press Publish. Netlify redeploys in about a minute.

## Notes
- Recipes live in `private/recipes/`, outside `public/`, so Netlify never serves them. Keep the repo private.
- QR code: point it at your own domain (or a dynamic QR service), not the netlify.app address.
- Test locally: `npx decap-server` and `npx serve public`, then open `/admin/`.

---
© 2026 Integrated Path for IT Solutions. All rights reserved.
