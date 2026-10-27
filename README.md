# The Writing Wall — Pinterest-Inspired Writing Portfolio

Frontend-only, no backend, deployable to GitHub Pages.

## Features
- Responsive masonry board (CSS columns, varying card heights)
- 5 card types: text, editorial (cover image), short, featured, quote
- Category filtering (client-side)
- Client-side search (title, excerpt, tags, category)
- Individual static article pages for SEO + direct URLs
- Light/dark theme with localStorage
- Reading progress bar, related articles, RSS feed
- Markdown-based content workflow
- Accessible: keyboard, focus, semantic HTML

## Quick Start
```
python -m http.server 8000
# http://localhost:8000
```

## Publishing a new article
1. Create `content/articles/my-new-article.md`
2. Add entry to `content/articles.json`:
```json
{
  "slug": "my-new-article",
  "title": "My Title",
  "excerpt": "Short intro...",
  "category": "Ideas & Essays",
  "tags": ["ideas"],
  "date": "2026-10-26",
  "readingTime": 4,
  "coverImage": "",
  "featured": false,
  "type": "text"
}
```
Types: `text`, `editorial`, `short`, `quote`. Use `featured:true` for larger cards.

3. Run `python build.py` to generate `articles/my-new-article/index.html` and RSS.

## GitHub Pages
- Push all files to main branch
- Settings → Pages → Source: main / root
- Relative paths already configured, direct `/articles/<slug>/` URLs work via index.html fallback
- No secrets, no paid APIs, no database

## Config
- `config.json`: brand name, categories, contact links
- `about.json`: about text
- Contact uses mailto — no fake form

## Limitations
- No browser-only permanent saving without backend. Publishing is via repo files.
- Search is client-side over articles.json; for 500+ posts consider lunr.js index.
- Sample articles are placeholder content.

## Performance
- Lazy loading, semantic HTML, visible focus, good contrast, print-friendly, Open Graph tags.
