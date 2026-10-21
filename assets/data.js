(async()=>{const C=window.IHP||{};if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(C.url||"")||!C.key||location.pathname.startsWith("/admin"))return;
const H={apikey:C.key},ar=document.documentElement.lang==="ar",esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const get=p=>fetch(C.url+"/rest/v1/"+p,{headers:H}).then(r=>r.ok?r.json():[]).catch(()=>[]);
const post=(t,b)=>fetch(C.url+"/rest/v1/"+t,{method:"POST",keepalive:true,headers:{...H,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(b)}).catch(()=>{});
/* analytics (anonymous, no cookies, no IP stored, respects Do Not Track) */
const dev=innerWidth<768?"mobile":innerWidth<1100?"tablet":"desktop";let vid="";try{vid=localStorage.ihp||(localStorage.ihp=Math.random().toString(36).slice(2,12))}catch(e){}
const off=/bot|crawl|spider|headless/i.test(navigator.userAgent)||navigator.doNotTrack==="1";
const ev=t=>{if(off)return;let ref="";try{ref=document.referrer?new URL(document.referrer).hostname:""}catch(e){}if(ref===location.hostname)ref="";post("events",{type:t,path:location.pathname.slice(0,200),lang:document.documentElement.lang,device:dev,ref:ref.slice(0,120),vid})};
window.IHPlead=d=>{post("leads",{name:(d.nom||"").slice(0,120),phone:(d.tel||"").slice(0,40),service:(d.service||"").slice(0,120),city:(d.ville||"").slice(0,120),message:(d.msg||"").slice(0,2000),lang:document.documentElement.lang,page:location.pathname.slice(0,200)});ev("lead")};
ev("view");document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a)return;const h=a.getAttribute("href")||"";if(h.startsWith("tel:"))ev("call");else if(h.includes("wa.me"))ev("whatsapp");else if(h.startsWith("mailto:"))ev("email")});
/* settings */
const S=Object.fromEntries((await get("site_settings?select=key,value")).map(r=>[r.key,r.value]));
const OLD={ph:["0793 04 17 89","0778 33 01 53","0541 95 35 46"],em:"idealhmpiscine@gmail.com",af:"Blida, Bouinan",aa:"البليدة، بوينان"},dg=s=>String(s).replace(/\D/g,"").replace(/^0/,"");
function swap(text,href){const T=(s,l)=>{l.forEach(([a],k)=>s=s.split(a).join("\u0000"+k+"\u0000"));l.forEach(([,b],k)=>s=s.split("\u0000"+k+"\u0000").join(b));return s};
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)?2:1});let n;while(n=w.nextNode()){const v=T(n.nodeValue,text);if(v!==n.nodeValue)n.nodeValue=v}
document.querySelectorAll("a[href]").forEach(a=>{const h=a.getAttribute("href"),v=T(h,href);if(v!==h)a.setAttribute("href",v)})}
const c=S.contact;if(c){const text=[],href=[];(c.phones||[]).forEach((p,i)=>{if(p&&OLD.ph[i]&&p!==OLD.ph[i]){text.push([OLD.ph[i],p]);href.push(["+213"+dg(OLD.ph[i]),"+213"+dg(p)],["wa.me/213"+dg(OLD.ph[i]),"wa.me/213"+dg(p)])}});
if(c.email&&c.email!==OLD.em){text.push([OLD.em,c.email]);href.push([OLD.em,c.email]);window.IHPmail=c.email}
const af=ar?c.address_ar:c.address_fr,od=ar?OLD.aa:OLD.af;if(af&&af!==od)text.push([od,af]);
if(c.phones&&c.phones[0]&&dg(c.phones[0])!==dg(OLD.ph[0]))window.IHPwa="213"+dg(c.phones[0]);
if(text.length||href.length)swap(text,href)}
if(S.images)document.querySelectorAll('img[src^="/assets/"]').forEach(i=>{const f=i.getAttribute("src").split("/").pop().replace(/\.\w+$/,"");if(S.images[f])i.src=S.images[f]});
/* realisations */
const gal=document.querySelector(".gal.u"),rail=document.querySelector(".rail");
if(gal||rail){let rows=await get("realisations?select=*&published=eq.true&order=sort.asc,created_at.desc");
if(rows.length){const TAG={"Piscine":"مسبح","Hydraulique":"الهيدروليك","Bâtiment":"البناء","Autre":"أخرى"};
const card=r=>{const t=(ar&&r.title_ar)||r.title_fr,sub=[r.place,r.year].filter(Boolean).join(" · ");return `<div class="ph rv in" data-t="${esc(r.type)}"><img src="${esc(r.image_url)}" alt="${esc(t)}" loading="lazy"><em class="tg">${esc(ar?(TAG[r.type]||r.type):r.type)}</em><span>${esc(t)}${sub?" — "+esc(sub):""}</span></div>`};
if(gal){const all=!!document.querySelector(".chips[data-filter]"),list=all?rows:rows.filter(r=>r.type==="Piscine");if(list.length){gal.innerHTML=list.map(card).join("");gal.dataset.n=list.length;window.initGal&&initGal()}}
if(rail)rail.innerHTML=rows.slice(0,6).map(card).join("")}}})();
