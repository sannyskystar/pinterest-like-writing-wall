# The Writing Wall v5.4 - Hybrid

- Tries fetch('data.json') first (no-store). If fails or empty, falls back to embedded const DATA.
- Edit only data.json to add posts after deploy. No need to edit index.html.
- Features:
  - 4 boxes per row (responsive)
  - Search, tags filter, sort newest/oldest, shuffle
  - Markdown **bold** *italic* `code` [link](url) - list
  - Reading time + word count
  - Copy link / Share / Copy text
  - Pinned posts
  - Logo as home link, warm light theme (#FFF7ED), dark mode toggle highly visible
  - Legal pages: About, Privacy, Terms, Disclaimer, Contact

Deploy to GitHub Pages: push all files to root of gh-pages branch. Keep .nojekyll.

Add new post: edit data.json -> push. That's it.
