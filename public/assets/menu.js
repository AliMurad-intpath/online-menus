/* Copyright (c) 2026 Integrated Path for IT Solutions. All rights reserved. */
(function(){
var $=function(i){return document.getElementById(i);},q="",io=null;
function e(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
function pic(i,w){var m=e("img");m.src=MN.img(i,w);m.alt=MN.pick(i,"name");m.loading="lazy";m.decoding="async";return m;}
/* Arabic-friendly search: ignore diacritics and common letter variants */
function norm(s){return String(s||"").toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g,"").replace(/[\u0622\u0623\u0625]/g,"\u0627").replace(/\u0629/g,"\u0647").replace(/\u0649/g,"\u064A").trim();}
function smooth(){return window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth";}
function mark(id){var nav=$("cats");[].forEach.call(nav.children,function(b){var on=b.dataset.id===id;b.classList.toggle("on",on);if(on)b.setAttribute("aria-current","true");else b.removeAttribute("aria-current");if(on)fit(b,nav);});}
function fit(b,nav){var n=nav.getBoundingClientRect(),r=b.getBoundingClientRect();if(r.left<n.left+8||r.right>n.right-8)nav.scrollBy({left:(r.left+r.width/2)-(n.left+n.width/2),behavior:smooth()});}
/* carousel: "next" always follows the reading direction (right-to-left in Arabic) */
function rtl(){return document.documentElement.dir==="rtl";}
function carState(){var s=$("snap"),pos=Math.abs(s.scrollLeft),max=s.scrollWidth-s.clientWidth;$("cp").disabled=pos<4;$("cn").disabled=pos>max-4;$("cp").setAttribute("aria-label",MN.t("prev"));$("cn").setAttribute("aria-label",MN.t("next"));}
function carGo(n){var s=$("snap");s.scrollBy({left:(n?1:-1)*(rtl()?-1:1)*s.clientWidth*.8,behavior:smooth()});}
function lgState(){var h=document.querySelector(".hero");if(h)h.classList.toggle("has-logo",!$("lg").hidden);}
function render(){
 var D=MN.data,R=D.restaurant;
 $("nm").textContent=MN.pick(R,"name");$("tg").textContent=MN.pick(R,"tagline");document.title=MN.pick(R,"name");
 var L=$("lng");L.textContent=MN.langLabel();L.setAttribute("aria-label",MN.t("switchTo"));
 $("igT").textContent=MN.t("follow");$("ig").href="https://www.instagram.com/"+encodeURIComponent(R.instagram)+"/";
 var lg=$("lg");if(R.logo){if(lg.getAttribute("src")!==R.logo)lg.src=R.logo;lg.onerror=function(){lg.hidden=true;lgState();};lg.hidden=false;}else lg.hidden=true;lgState();
 $("q").placeholder=MN.t("search");$("q").setAttribute("aria-label",MN.t("search"));
 var pop=D.items.filter(function(i){return i.popular&&i.available!==false;});
 $("pop").hidden=!pop.length;$("popT").textContent=MN.t("popular");
 var sn=$("snap");sn.textContent="";sn.dir=document.documentElement.dir;
 pop.forEach(function(i){var b=e("button","pc");b.type="button";b.appendChild(pic(i,340));var n=e("div","in");n.appendChild(e("b","",MN.pick(i,"name")));n.appendChild(e("span","price",MN.priceText(i)));b.appendChild(n);b.onclick=function(){openDish(i);};sn.appendChild(b);});
 sn.scrollLeft=0;carState();
 var nav=$("cats");nav.textContent="";
 D.categories.forEach(function(c){var b=e("button","",MN.pick(c,"name"));b.type="button";b.dataset.id=c.id;b.onclick=function(){var s=$("c-"+c.id);if(s){mark(c.id);s.scrollIntoView({behavior:smooth(),block:"start"});}};nav.appendChild(b);});
 list();
 buildPopup();startTimer();
}
function list(){
 var D=MN.data,L=$("list"),s=norm(q),n=0;L.textContent="";
 D.categories.forEach(function(c){
  var its=D.items.filter(function(i){return i.category===c.id&&(!s||norm(MN.pick(i,"name")+" "+MN.pick(i,"desc")).indexOf(s)>-1);});
  if(!its.length)return;n+=its.length;
  var sec=e("section","sec");sec.id="c-"+c.id;sec.dataset.id=c.id;sec.appendChild(e("h2","sec-h",MN.pick(c,"name")));
  var g=e("div","grid");
  its.forEach(function(i){
   var off=i.available===false,b=e("button","card"+(off?" off":""));b.type="button";
   var ph=e("span","ph");ph.appendChild(pic(i,400));
   if(!off&&MN.showLabels()&&i.tags&&i.tags.length){var lb=MN.label(i.tags[0]);if(lb)ph.appendChild(e("span","bdg",lb));}
   b.appendChild(ph);
   var t=e("span","ct");t.appendChild(e("b","",MN.pick(i,"name")));
   if(MN.pick(i,"desc"))t.appendChild(e("span","ds",MN.pick(i,"desc")));
   t.appendChild(e("span","price",off?MN.t("soldOut"):MN.priceText(i)));b.appendChild(t);
   b.onclick=function(){openDish(i);};g.appendChild(b);
  });
  sec.appendChild(g);L.appendChild(sec);
 });
 if(!n)L.appendChild(e("p","empty",MN.t("empty")));
 observe();
}
function observe(){
 if(io)io.disconnect();
 var nav=$("cats"),first=nav.children[0];
 /* active band starts just under the two sticky bars */
 var top=$("bar").offsetHeight+nav.offsetHeight+4;
 io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)mark(x.target.dataset.id);});},{rootMargin:"-"+top+"px 0px -65% 0px"});
 [].forEach.call(document.querySelectorAll(".sec"),function(s){io.observe(s);});
 if(first&&!nav.querySelector(".on"))first.classList.add("on");
}
function openDish(i){
 var d=$("dlg");d.textContent="";var w=e("div","sh"),m=pic(i,900);m.className="big";m.loading="eager";w.appendChild(m);
 var x=e("button","x");x.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';x.type="button";x.setAttribute("aria-label",MN.t("close"));x.onclick=function(){d.close();};w.appendChild(x);
 var b=e("div","bd"),h=e("div","hd");h.appendChild(e("h3","",MN.pick(i,"name")));var sz=i.sizes&&i.sizes.length>1?i.sizes:null;
 if(!sz||i.available===false)h.appendChild(e("span","price",i.available===false?MN.t("soldOut"):MN.priceText(i)));b.appendChild(h);
 if(MN.pick(i,"desc"))b.appendChild(e("p","",MN.pick(i,"desc")));
 if(sz&&i.available!==false){var ul=e("ul","sz");sz.forEach(function(z){var li=e("li");li.appendChild(e("span","",MN.pick(z,"label")));li.appendChild(e("span","price",MN.money(z.price)));ul.appendChild(li);});b.appendChild(ul);}
 if(MN.showLabels()){var tg=e("div");(i.tags||[]).forEach(function(k){var lb=MN.label(k);if(lb)tg.appendChild(e("span","chip",lb));});if(tg.children.length)b.appendChild(tg);}
 if(i.allergens&&i.allergens.length)b.appendChild(e("p","al",MN.t("contains")+": "+i.allergens.map(function(k){return MN.t("al_"+k);}).join(MN.lang()==="ar"?"، ":", ")));
 w.appendChild(b);d.appendChild(w);d.showModal();
}
/* ---- Instagram reminder pop-up (text and timing come from the CMS) ---- */
var active=0,timer=null,shown=false,SEEN="ig_popup_seen";
function igKey(){return "ig_"+MN.data.restaurant.instagram;}
function ppSkip(){try{return sessionStorage.getItem(SEEN)==="1"||localStorage.getItem(igKey())==="1";}catch(x){return false;}}
function ppText(k){var P=MN.data.popup||{};return MN.pick(P,k)||MN.t("pp_"+k);}
function buildPopup(){
 var d=$("igp"),R=MN.data.restaurant;d.textContent="";
 var x=e("button","x");x.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';x.type="button";x.setAttribute("aria-label",MN.t("close"));x.onclick=function(){d.close();};
 var ic=e("div","pp-ic");ic.innerHTML='<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';d.appendChild(ic);
 d.appendChild(e("h3","",ppText("title")));d.appendChild(e("p","",ppText("text")));
 var a=e("a","btn ig",ppText("button"));a.href="https://www.instagram.com/"+encodeURIComponent(R.instagram)+"/";a.target="_blank";a.rel="noopener";
 a.onclick=function(){try{localStorage.setItem(igKey(),"1");}catch(x){}d.close();};d.appendChild(a);
 var l=e("button","later",ppText("later"));l.type="button";l.onclick=function(){d.close();};d.appendChild(l);d.appendChild(x);
}
function startTimer(){
 if(timer)return;
 timer=setInterval(function(){
  var P=MN.data.popup||{};
  if(shown||P.enabled===false||ppSkip()||document.visibilityState!=="visible")return;
  active++;
  if(active>=(Number(P.delay)||10)&&!$("dlg").open){shown=true;try{sessionStorage.setItem(SEEN,"1");}catch(x){}$("igp").showModal();}
 },1000);
}
$("snap").addEventListener("scroll",carState,{passive:true});$("cp").onclick=function(){carGo(false);};$("cn").onclick=function(){carGo(true);};window.addEventListener("resize",carState);
$("igp").addEventListener("click",function(ev){if(ev.target===this)this.close();});
$("q").oninput=function(){q=this.value;list();};
$("lng").onclick=MN.toggle;
$("dlg").addEventListener("click",function(ev){if(ev.target===this)this.close();});
MN.start(render);
})();
