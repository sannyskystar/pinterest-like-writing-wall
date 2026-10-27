
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
let ARTICLES=[]; let activeCategory='All Writing'; let searchQuery='';
async function loadConfig(){
 try{
  const cfg=await fetch('../config.json').catch(()=>fetch('./config.json')).then(r=>r.json());
  if($('#brand')) $('#brand').textContent = cfg.brandName ? cfg.tagline ? 'A wall of words, ideas, and perspectives.' : cfg.brandName : '';
  if($('#logoText')) $('#logoText').innerHTML = (cfg.brandName||'The Writing Wall').replace('Wall','<span>Wall</span>');
 }catch(e){}
 try{
  const about=await fetch('../about.json').catch(()=>fetch('./about.json')).then(r=>r.json());
  if($('#aboutTitle')) $('#aboutTitle').textContent=about.title;
  if($('#aboutBody')) $('#aboutBody').textContent=about.body;
 }catch(e){}
}
async function loadArticles(){
 try{
  ARTICLES=await fetch('./content/articles.json').then(r=>r.json());
 }catch{
  ARTICLES=await fetch('../content/articles.json').then(r=>r.json()).catch(()=>[]);
 }
 renderFilters(); renderBoard();
}
function renderFilters(){
 const cats=['All Writing','Technology','Content Writing','Technical Writing','Ideas & Essays','Creativity','Short Reads'];
 const wrap=$('#filters'); if(!wrap) return;
 wrap.innerHTML='';
 cats.forEach(c=>{
  const b=document.createElement('button'); b.className='chip'+(c===activeCategory?' active':''); b.textContent=c;
  b.onclick=()=>{activeCategory=c; $$('.chip',wrap).forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderBoard();};
  wrap.appendChild(b);
 });
 const searchWrap=document.createElement('div'); searchWrap.className='toolbar';
 searchWrap.innerHTML=`<label class="search"><span aria-hidden="true">⌕</span><input id="q" placeholder="Search writing…"></label>`;
 wrap.appendChild(searchWrap);
 const input=$('#q'); if(input) input.addEventListener('input',e=>{searchQuery=e.target.value.toLowerCase().trim(); renderBoard();});
}
function filtered(){
 return ARTICLES.filter(a=>{
  const catMatch=activeCategory==='All Writing'||a.category===activeCategory;
  if(!catMatch) return false;
  if(!searchQuery) return true;
  const hay=`${a.title} ${a.excerpt} ${a.tags.join(' ')} ${a.category}`.toLowerCase();
  return hay.includes(searchQuery);
 });
}
function cardHTML(a){
 const img=a.coverImage?`<img src="${a.coverImage}" alt="" loading="lazy">`:'';
 const pinned=a.featured?`<span style="margin-left:auto;background:var(--accent);color:white;padding:2px 8px;border-radius:999px;font-size:10px">FEATURED</span>`:'';
 return `<article class="card ${a.featured?'featured':''} ${a.type}" data-slug="${a.slug}">
  ${img}<div class="card-body"><div class="kicker"><span class="dot"></span>${a.category.toUpperCase()}${pinned}</div><h3>${a.title}</h3><p>${a.excerpt}</p><div class="card-meta"><span>${a.date}</span><span>•</span><span>${a.readingTime} min</span></div></div></article>`;
}
function renderBoard(){
 const list=filtered(); const board=$('#board'); if(!board) return;
 if(list.length===0){board.innerHTML=`<div class="empty"><h3 style="font-family:var(--font-serif);font-size:24px;margin:0">No matches</h3><p>Try another category or clear search.</p><button class="chip active" onclick="document.getElementById('q').value='';searchQuery='';activeCategory='All Writing';document.querySelectorAll('.chip').forEach((c,i)=>c.classList.toggle('active',i===0));renderBoard()">Clear filters</button></div>`; return;}
 list.sort((a,b)=>(b.featured-a.featured)||new Date(b.date)-new Date(a.date));
 board.innerHTML=list.map(cardHTML).join('');
 $$('.card',board).forEach(el=>{
  el.addEventListener('click',()=>{location.href=`./articles/${el.dataset.slug}/`;});
  el.setAttribute('tabindex','0'); el.setAttribute('role','link');
  el.addEventListener('keydown',e=>{if(e.key==='Enter') location.href=`./articles/${el.dataset.slug}/`;});
 });
}
function initTheme(){
 const saved=localStorage.getItem('tww-theme'); const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
 const theme=saved||(prefersDark?'dark':'light'); document.documentElement.setAttribute('data-theme',theme);
 const btn=$('#themeBtn'); if(btn) btn.textContent=theme==='dark'?'☾':'☀';
}
function toggleTheme(){
 const cur=document.documentElement.getAttribute('data-theme'); const next=cur==='dark'?'light':'dark';
 document.documentElement.setAttribute('data-theme',next); localStorage.setItem('tww-theme',next);
 const btn=$('#themeBtn'); if(btn) btn.textContent=next==='dark'?'☾':'☀';
}
window.addEventListener('DOMContentLoaded',async()=>{
 initTheme(); const btn=$('#themeBtn'); if(btn) btn.addEventListener('click',toggleTheme);
 await loadConfig(); await loadArticles(); const y=$('#year'); if(y) y.textContent=new Date().getFullYear();
});
