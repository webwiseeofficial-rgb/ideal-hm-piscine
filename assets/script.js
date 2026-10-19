const ar=document.documentElement.lang==="ar";
document.querySelector(".burger").addEventListener("click",e=>{const o=document.querySelector(".links").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)});
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("in")),{threshold:.12});document.querySelectorAll(".rv").forEach(el=>io.observe(el));
const f=document.getElementById("devis");
if(f){const msg=()=>{const d=Object.fromEntries(new FormData(f));
return ar?`مرحبا IDEAL HM PISCINE،\nالاسم: ${d.nom}\nالهاتف: ${d.tel}\nالخدمة: ${d.service}\nالموقع: ${d.ville||"غير محدد"}\n${d.msg||""}`:`Bonjour IDEAL HM PISCINE,\nNom: ${d.nom}\nTéléphone: ${d.tel}\nService: ${d.service}\nLocalisation: ${d.ville||"Non précisée"}\n${d.msg||""}`};
f.addEventListener("submit",e=>{e.preventDefault();window.open("https://wa.me/213793041789?text="+encodeURIComponent(msg()),"_blank")});
document.getElementById("mailbtn")?.addEventListener("click",()=>{if(!f.reportValidity())return;location.href="mailto:idealhmpiscine@gmail.com?subject="+encodeURIComponent(ar?"طلب عرض سعر":"Demande de devis")+"&body="+encodeURIComponent(msg())});
const q=new URLSearchParams(location.search).get("s");if(q&&f.msg)f.msg.value=(ar?"أرغب في عرض سعر بخصوص: ":"Je souhaite un devis pour : ")+q}
const sw=document.querySelector(".sw");if(sw){const g=[...document.querySelectorAll(".prog i")];const up=()=>{const c=sw.firstElementChild,i=Math.round(Math.abs(sw.scrollLeft)/(c.offsetWidth+14));g.forEach((x,k)=>x.classList.toggle("on",k<=i))};sw.addEventListener("scroll",up,{passive:true});up()}
const fl=document.querySelector(".chips[data-filter]");if(fl){fl.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;fl.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(".gal.u .ph").forEach(p=>p.style.display=!b.dataset.f||p.dataset.t===b.dataset.f?"":"none")});
const lb=document.createElement("div");lb.className="lb";lb.innerHTML=`<img alt=""><button aria-label="${ar?"إغلاق":"Fermer"}">×</button>`;document.body.appendChild(lb);document.querySelectorAll(".gal.u .ph img").forEach(i=>i.addEventListener("click",()=>{lb.querySelector("img").src=i.src;lb.classList.add("on")}));lb.addEventListener("click",()=>lb.classList.remove("on"))}
document.querySelectorAll(".gal.u").forEach(g=>g.dataset.n=g.children.length);
