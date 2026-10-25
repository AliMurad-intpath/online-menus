/* Copyright (c) 2026 Integrated Path for IT Solutions. All rights reserved. */
(function(){
var T={
en:{follow:"Follow us on Instagram",switchTo:"Switch to Arabic",menu:"View the menu",hintLocked:"Follow us first, then your menu unlocks",thanks:"Thanks for following! Enjoy your meal.",skip:"Skip and go to the menu",search:"Search the menu",popular:"Popular right now",soldOut:"Sold out",contains:"Contains",empty:"Nothing found.",close:"Close",
tag_vegan:"Vegan",tag_vegetarian:"Vegetarian",tag_glutenfree:"Gluten-free",tag_spicy:"Spicy",tag_new:"New",
al_gluten:"Gluten",al_dairy:"Dairy",al_eggs:"Eggs",al_nuts:"Nuts",al_peanuts:"Peanuts",al_fish:"Fish",al_shellfish:"Shellfish",al_soy:"Soy",al_sesame:"Sesame"},
ar:{follow:"تابعنا على إنستغرام",switchTo:"التبديل إلى الإنجليزية",menu:"تصفّح القائمة",hintLocked:"تابعنا أولاً لتُفتح القائمة",thanks:"شكراً لمتابعتك! بالهناء والشفاء.",skip:"تخطَّ وانتقل إلى القائمة",search:"ابحث في القائمة",popular:"الأكثر طلباً",soldOut:"نفدت الكمية",contains:"يحتوي على",empty:"لا توجد نتائج.",close:"إغلاق",
tag_vegan:"نباتي بالكامل",tag_vegetarian:"نباتي",tag_glutenfree:"خالٍ من الغلوتين",tag_spicy:"حار",tag_new:"جديد",
al_gluten:"الغلوتين",al_dairy:"الألبان",al_eggs:"البيض",al_nuts:"المكسرات",al_peanuts:"الفول السوداني",al_fish:"السمك",al_shellfish:"القشريات",al_soy:"الصويا",al_sesame:"السمسم"}};
var lang="";
try{lang=localStorage.getItem("lang")||"";}catch(e){}
if(lang!=="ar"&&lang!=="en")lang=/^ar/i.test(navigator.language||"")?"ar":"en";
function apply(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";var c=document.getElementById("cr");if(c){var y=new Date().getFullYear();c.innerHTML='<span dir="ltr">\u00A9 '+y+' Integrated Path for IT Solutions</span><span>'+(lang==="ar"?"جميع الحقوق محفوظة":"All rights reserved.")+"</span>";}}
apply();
var MN=window.MN={data:null,cb:null,
 lang:function(){return lang;},
 t:function(k){return (T[lang]&&T[lang][k])||T.en[k]||k;},
 pick:function(o,k){return o[k+"_"+lang]||o[k+"_en"]||o[k+"_ar"]||"";},
 money:function(v){var r=MN.data.restaurant,c=lang==="ar"?(r.currency_ar||r.currency_en):r.currency_en;return c+" "+Number(v||0).toLocaleString("en",{maximumFractionDigits:2});},
 img:function(i,w){var s=i.image||"/images/placeholder.svg";if(!w||/\.svg(\?|$)/i.test(s)||/^https?:/i.test(s)||/^(localhost|127\.|192\.168\.)/.test(location.hostname))return s;return "/.netlify/images?url="+encodeURIComponent(s)+"&w="+w;},
 setLang:function(l){lang=l;try{localStorage.setItem("lang",l);}catch(e){}apply();if(MN.cb&&MN.data)MN.cb();},
 toggle:function(){MN.setLang(lang==="ar"?"en":"ar");},
 start:function(cb){MN.cb=cb;fetch("/content/menu.json",{cache:"no-cache"}).then(function(r){return r.json();}).then(function(d){MN.data=d;cb();}).catch(function(){document.body.textContent="Couldn’t load the menu. Please refresh.";});}
};
})();
