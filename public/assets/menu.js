/* Copyright (c) 2026 Integrated Path for IT Solutions. All rights reserved. */
(function(){
var $=function(i){return document.getElementById(i);},q="",io=null;
function e(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
function pic(i){var m=e("img");m.src=MN.img(i);m.alt=MN.pick(i,"name");m.loading="lazy";return m;}
function render(){
 var D=MN.data,R=D.restaurant;
 $("nm").textContent=MN.pick(R,"name");$("tg").textContent=MN.pick(R,"tagline");document.title=MN.pick(R,"name");
 $("lng").textContent=MN.lang()==="ar"?"EN":"عربي";$("q").placeholder=MN.t("search");
 var pop=D.items.filter(function(i){return i.popular&&i.available!==false;});
 $("pop").hidden=!pop.length;$("popT").textContent=MN.t("popular");
 var sn=$("snap");sn.textContent="";
 pop.forEach(function(i){var b=e("button","pc");b.appendChild(pic(i));var n=e("div","in");n.appendChild(e("b","",MN.pick(i,"name")));n.appendChild(e("span","price",MN.money(i.price)));b.appendChild(n);b.onclick=function(){openDish(i);};sn.appendChild(b);});
 var nav=$("cats");nav.textContent="";
 D.categories.forEach(function(c){var b=e("button","",MN.pick(c,"name"));b.dataset.id=c.id;b.onclick=function(){var s=$("c-"+c.id);if(s)s.scrollIntoView({behavior:"smooth",block:"start"});};nav.appendChild(b);});
 list();
}
function list(){
 var D=MN.data,L=$("list"),s=q.trim().toLowerCase(),n=0;L.textContent="";
 D.categories.forEach(function(c){
  var its=D.items.filter(function(i){return i.category===c.id&&(!s||(MN.pick(i,"name")+" "+MN.pick(i,"desc")).toLowerCase().indexOf(s)>-1);});
  if(!its.length)return;n+=its.length;
  var sec=e("section","sec");sec.id="c-"+c.id;sec.dataset.id=c.id;sec.appendChild(e("h2","sec-h",MN.pick(c,"name")));
  its.forEach(function(i){
   var off=i.available===false,b=e("button","row"+(off?" off":""));b.appendChild(pic(i));
   var t=e("div","tx");t.appendChild(e("b","",MN.pick(i,"name")));t.appendChild(e("p","",MN.pick(i,"desc")));
   t.appendChild(e("span","price",off?MN.t("soldOut"):MN.money(i.price)));b.appendChild(t);b.onclick=function(){openDish(i);};sec.appendChild(b);
  });
  L.appendChild(sec);
 });
 if(!n)L.appendChild(e("p","empty",MN.t("empty")));
 observe();
}
function observe(){
 if(io)io.disconnect();
 var btns=[].slice.call($("cats").children);
 io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;btns.forEach(function(b){var on=b.dataset.id===x.target.dataset.id;b.classList.toggle("on",on);if(on)b.scrollIntoView({inline:"center",block:"nearest"});});});},{rootMargin:"-70px 0px -70% 0px"});
 [].forEach.call(document.querySelectorAll(".sec"),function(s){io.observe(s);});
}
function openDish(i){
 var d=$("dlg");d.textContent="";var w=e("div","sh"),m=pic(i);m.className="big";w.appendChild(m);
 var x=e("button","x","✕");x.setAttribute("aria-label",MN.t("close"));x.onclick=function(){d.close();};w.appendChild(x);
 var b=e("div","bd"),h=e("div","hd");h.appendChild(e("h3","",MN.pick(i,"name")));h.appendChild(e("span","price",i.available===false?MN.t("soldOut"):MN.money(i.price)));b.appendChild(h);
 if(MN.pick(i,"desc"))b.appendChild(e("p","",MN.pick(i,"desc")));
 var tg=e("div");(i.tags||[]).forEach(function(k){tg.appendChild(e("span","chip",MN.t("tag_"+k)));});b.appendChild(tg);
 if(i.allergens&&i.allergens.length)b.appendChild(e("p","al",MN.t("contains")+": "+i.allergens.map(function(k){return MN.t("al_"+k);}).join(MN.lang()==="ar"?"، ":", ")));
 w.appendChild(b);d.appendChild(w);d.showModal();
}
$("q").oninput=function(){q=this.value;list();};
$("lng").onclick=MN.toggle;
$("dlg").addEventListener("click",function(ev){if(ev.target===this)this.close();});
MN.start(render);
})();
