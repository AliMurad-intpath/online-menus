/* Copyright (c) 2026 Integrated Path for IT Solutions. All rights reserved. */
(function(){
var $=function(i){return document.getElementById(i);},pend=0,ok=false,just=false;
var ARROW='<svg class="flip" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var LOCK='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
/* Instagram profile widget: accepts a profile link or a username, ignores post/reel links */
function igHandle(u){u=String(u||"").trim();var m=u.match(/instagram\.com\/([A-Za-z0-9._]+)/i),h=m?m[1]:(/^@?[A-Za-z0-9._]+$/.test(u)?u.replace(/^@/,""):"");return /^(p|reel|reels|tv|explore|stories|accounts|direct)$/i.test(h)?"":h;}
function igWidget(R){
 var W=$("igw"),h=igHandle(R.instagram_url);
 document.body.classList.toggle("has-igw",!!h);
 if(!h){W.hidden=true;W.textContent="";W.removeAttribute("data-h");return;}
 if(W.getAttribute("data-h")!==h){
  W.textContent="";W.setAttribute("data-h",h);
  var ph=document.createElement("span");ph.className="igw-ph";ph.textContent="@"+h;W.appendChild(ph);
  var f=document.createElement("iframe");f.src="https://www.instagram.com/"+encodeURIComponent(h)+"/embed/";f.title="Instagram @"+h;f.loading="lazy";f.referrerPolicy="strict-origin-when-cross-origin";f.setAttribute("allowtransparency","true");W.appendChild(f);
 }
 W.hidden=false;
}
function key(){return "ig_"+MN.data.restaurant.instagram;}
function render(){
 var D=MN.data,R=D.restaurant,lock=R.lock!==false,open=ok||!lock;
 $("nm").textContent=MN.pick(R,"name");document.title=MN.pick(R,"name");
 $("lng").textContent=MN.langLabel();$("lng").setAttribute("aria-label",MN.t("switchTo"));
 $("igT").textContent=MN.t("follow");$("mnT").textContent=MN.t("menu");$("sk").textContent=MN.t("skip");
 $("ig").href="https://www.instagram.com/"+encodeURIComponent(R.instagram)+"/";
 var m=$("mn");m.classList.toggle("locked",!open);m.setAttribute("aria-disabled",String(!open));
 if(open)m.href="/menu/";else m.removeAttribute("href");
 $("mnI").innerHTML=open?ARROW:LOCK;
 $("hint").textContent=open?(just?MN.t("thanks"):""):MN.t("hintLocked");
 $("sk").hidden=open||R.skip===false;
 var L=$("logo");
 if(R.logo){
  var im=L.firstChild;
  if(!im){im=document.createElement("img");im.alt="";im.decoding="async";im.onerror=function(){L.hidden=true;};L.appendChild(im);}
  if(im.getAttribute("src")!==R.logo)im.src=R.logo;
  L.hidden=false;
 }else{L.hidden=true;}
 if(R.cover)document.body.style.setProperty("--cover","url("+R.cover+")");
 igWidget(R);
}
function unlock(){if(!MN.data)return;var lock=MN.data.restaurant.lock!==false;if(!lock||ok||!pend||Date.now()-pend<2500)return;ok=true;just=true;pend=0;try{localStorage.setItem(key(),"1");}catch(e){}render();}
$("ig").addEventListener("click",function(){pend=Date.now();});
$("mn").addEventListener("click",function(ev){if(this.classList.contains("locked"))ev.preventDefault();});
$("sk").addEventListener("click",function(){location.href="/menu/";});
$("lng").addEventListener("click",MN.toggle);
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")unlock();});
window.addEventListener("pageshow",unlock);window.addEventListener("focus",unlock);
MN.start(function(){if(!ok){try{ok=localStorage.getItem(key())==="1";}catch(e){}}render();});
})();
