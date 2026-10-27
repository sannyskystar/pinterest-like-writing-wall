import json, re
from pathlib import Path
root = Path(__file__).parent

def md_to_html(md):
    lines = md.splitlines()
    if lines and lines[0].strip()=='---':
        try:
            idx = lines[1:].index('---')+1
            md = "\n".join(lines[idx+1:])
        except: pass
    html = md
    html = re.sub(r'```(\w+)?\n(.*?)\n```', r'<pre><code>\2</code></pre>', html, flags=re.DOTALL)
    html = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1">', html)
    html = re.sub(r'^>\s*(.*)$', r'<blockquote>\1</blockquote>', html, flags=re.MULTILINE)
    html = re.sub(r'^###\s+(.*)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^##\s+(.*)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^#\s+(.*)$', r'<h1 style="display:none">\1</h1>', html, flags=re.MULTILINE)
    parts = re.split(r'\n\s*\n', html)
    out=[]
    for p in parts:
        p=p.strip()
        if not p: continue
        if p.startswith('<h') or p.startswith('<blockquote') or p.startswith('<pre') or p.startswith('<img'): out.append(p)
        elif p.startswith('- ') or p.startswith('1. '):
            lis=[]
            for it in p.split('\n'):
                it=re.sub(r'^[\-\d\.]+\s*','',it).strip()
                if it: lis.append(f'<li>{it}</li>')
            out.append('<ul>'+''.join(lis)+'</ul>')
        else: out.append(f'<p>{p}</p>')
    return '\n'.join(out)

meta = json.loads((root/'content/articles.json').read_text())
tmpl = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} — The Writing Wall</title><link href="https://fonts.googleapis.com/css2?family=Instrument+Sans&family=Newsreader&display=swap" rel="stylesheet"><link rel="stylesheet" href="../../assets/css/style.css"></head><body><div class="progress" id="progress"></div><header><div class="container header-inner"><a class="logo" href="../../">The Writing Wall</a><div class="actions"><button id="themeBtn" class="icon-btn">☀</button></div></div></header><main class="article-wrap"><a class="back" href="../../">← Back to wall</a><div class="article-meta"><span>{category}</span><span>•</span><span>{date}</span><span>•</span><span>{reading} min</span></div><h1>{title}</h1><p class="excerpt">{excerpt}</p><div class="markdown">{content}</div><div class="related"><h3 style="font-family:var(--font-serif)">Related</h3><div class="related-grid">{related}</div></div></main><script>const b=document.getElementById('themeBtn');const s=localStorage.getItem('tww-theme');if(s)document.documentElement.setAttribute('data-theme',s);if(b){{b.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'☾':'☀';b.addEventListener('click',()=>{{const c=document.documentElement.getAttribute('data-theme');const n=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('tww-theme',n);b.textContent=n==='dark'?'☾':'☀';}});}}window.addEventListener('scroll',()=>{{const h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';}});</script></body></html>'''
for m in meta:
    slug=m['slug']
    md_path=root/f"content/articles/{slug}.md"
    md_text=md_path.read_text() if md_path.exists() else m['excerpt']
    content=md_to_html(md_text)
    rel=[x for x in meta if x['slug']!=slug][:2]
    rel_html=''.join([f'<a href="../{r["slug"]}/" class="card" style="margin:0"><div class="card-body"><div class="kicker">{r["category"]}</div><h3 style="font-size:18px">{r["title"]}</h3></div></a>' for r in rel])
    out=root/f"articles/{slug}"; out.mkdir(parents=True, exist_ok=True)
    (out/"index.html").write_text(tmpl.format(title=m['title'], excerpt=m['excerpt'], category=m['category'], date=m['date'], reading=m['readingTime'], content=content, related=rel_html))
print(f"Built {len(meta)} articles")
