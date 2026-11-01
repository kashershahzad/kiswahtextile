// Kiswah Textile - catalogue logic. Product data lives in js/products.js
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const grid=$('#grid'),fb=$('#fb'),ff=$('#ff'),fc=$('#fc'),q=$('#q'),lb=$('#lb');
const uniq=k=>[...new Set(PRODUCTS.map(p=>p[k]).filter(Boolean))];
function opts(sel,label,vals){sel.innerHTML='<option value="">All '+label+'</option>'+vals.map(v=>`<option>${v}</option>`).join('')}
opts(fb,'collections',uniq('brand'));opts(ff,'fabrics',uniq('fabric'));opts(fc,'styles',uniq('category'));

function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('show'),3500)}
function wa(msg){
  if(/X/i.test(WHATSAPP_NUMBER)){toast('WhatsApp number is not set yet. The shop owner must edit WHATSAPP_NUMBER in js/products.js.');return}
  window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(msg),'_blank','noopener');
}
const title=p=>'D# '+p.code, msgFor=p=>`Assalam o Alaikum, I would like details for ${p.brand} ${title(p)} (Kiswah Textile).`;
function img(src,alt,extra=''){const i=document.createElement('img');i.src=src;i.alt=alt;i.onerror=()=>{i.classList.add('noimg');i.alt='Image coming soon'};if(extra)i.loading=extra;return i}

function render(){
  const s=q.value.trim().toLowerCase();
  const list=PRODUCTS.filter(p=>(!fb.value||p.brand===fb.value)&&(!ff.value||p.fabric===ff.value)&&(!fc.value||p.category===fc.value)&&(!s||(p.code+' '+(p.name||'')+' '+p.brand).toLowerCase().includes(s)));
  grid.innerHTML='';
  list.forEach(p=>{
    const b=document.createElement('button');b.className='card';b.type='button';
    b.append(img(p.image,`${p.brand} design ${p.code}, ${p.fabric} ${p.category.toLowerCase()} suit`,'lazy'));
    const d=document.createElement('div');d.className='ci';
    d.innerHTML=`<b>${title(p)}</b><small>${p.brand} &middot; ${p.fabric} &middot; ${p.pieces} pcs</small>${p.price?`<small>${p.price}</small>`:''}<span class="go">View details</span>`;
    b.append(d);b.onclick=()=>open(p);grid.append(b);
  });
  $('#count').textContent=list.length+' of '+PRODUCTS.length+' designs';
  $('#empty').hidden=list.length>0;
}
let cur;
function show(src,p){const i=$('#lb-img');i.src=src;i.alt=`${p.brand} design ${p.code}, full poster`;$$('#lb-th button').forEach(b=>b.setAttribute('aria-current',b.dataset.s===src))}
function open(p){
  cur=p;$('#lb-t').textContent=title(p);
  $('#lb-m').textContent=[p.brand,p.fabric,p.pieces+' pieces',p.availability,p.price].filter(Boolean).join(' · ');
  $('#lb-d').innerHTML=p.details.map(x=>`<li>${x}</li>`).join('');
  const th=$('#lb-th');th.innerHTML='';
  if(p.gallery.length>1)p.gallery.forEach((g,i)=>{const b=document.createElement('button');b.type='button';b.dataset.s=g;b.setAttribute('aria-label','View image '+(i+1));b.append(img(g,''));b.onclick=()=>show(g,p);th.append(b)});
  show(p.gallery[0],p);lb.showModal();
}
$('.x').onclick=()=>lb.close();
lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
$('#lb-wa').onclick=()=>wa(msgFor(cur));
$$('.wa[data-wa]').forEach(b=>b.onclick=()=>wa("Assalam o Alaikum, I would like to enquire about your ladies' suits (Kiswah Textile)."));
[fb,ff,fc].forEach(e=>e.onchange=render);q.oninput=render;

function setBrand(v){fb.value=v;ff.value='';fc.value='';q.value='';render()}
$$('[data-filter-brand]').forEach(a=>a.addEventListener('click',()=>setBrand(a.dataset.filterBrand)));
$$('[data-cat]').forEach(a=>a.addEventListener('click',()=>{setBrand('');fc.value=a.dataset.cat;render()}));
$('#show-g').onclick=()=>{setBrand('Gulkari');$('#collection').scrollIntoView()};

const burger=$('.burger'),menu=$('#menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

const links=Object.entries(SOCIAL).filter(([,u])=>u);
$('#social').innerHTML=links.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n[0].toUpperCase()+n.slice(1)}</a>`).join(' &middot; ');
$('#yr').textContent=new Date().getFullYear();
render();
})();
