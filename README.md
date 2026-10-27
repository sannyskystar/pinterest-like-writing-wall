
# The Writing Wall — Pinterest Board v4

A no-backend, GitHub Pages-ready Pinterest-style writing wall.

### Live Demo
`username.github.io/repo`

### Features
- 4 equal boxes per row (1:1 square, same dimensions)
- Rows auto-expand with posts
- Search bar on top — searches keywords + title
- Keywords shown below each image
- Date-wise auto sort — newest on top, old goes down
- Click image → full post in modal
- Site name visible in header: "The Writing Wall"
- Day/Night toggle with localStorage
- No backend, no database

### Structure
```
/
├── index.html   # Board UI
├── data.json    # Posts: image links + keywords + date + post text
├── .nojekyll    # Fixes Jekyll build error on GitHub Pages
└── README.md
```

### How It Works
Images are NOT uploaded to backend. Use image hosting:

1. Upload image to ImgBB / PostImages / Cloudinary
2. Copy Direct Link (https://i.ibb.co/...jpg)
3. Paste in `data.json`:

```json
{
  "id": "2026-10-26-01",
  "image": "PASTE_LINK_HERE",
  "keywords": ["writing", "tech", "ideas"],
  "title": "My Post Title",
  "date": "2026-10-26",
  "post": "Full post text shown on click"
}
```

Newest date = appears first automatically.

