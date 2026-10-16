/* Marksheet site — shared behaviour: nav, theme, reveal, consent, ribbon */
(function(){
  var d=document, C=window.MS||{};
  var $=function(s,r){return (r||d).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
  // mobile nav
  var tog=$('[data-nav-toggle]'), mnav=$('#mobile-nav');
  if(tog&&mnav){tog.addEventListener('click',function(){var o=tog.getAttribute('aria-expanded')==='true';tog.setAttribute('aria-expanded',String(!o));mnav.hidden=o;});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mnav.hidden){mnav.hidden=true;tog.setAttribute('aria-expanded','false');tog.focus();}});}
  // theme
  var tt=$('[data-theme-toggle]');
  function syncTheme(){if(tt)tt.setAttribute('aria-pressed',String(d.documentElement.dataset.theme==='dark'));}
  syncTheme();
  if(tt)tt.addEventListener('click',function(){var n=d.documentElement.dataset.theme==='dark'?'light':'dark';d.documentElement.dataset.theme=n;try{localStorage.setItem('ms-theme',n)}catch(e){}syncTheme();});
  // ribbon
  var rb=$('[data-ribbon]');
  if(rb){try{if(sessionStorage.getItem('ms-ribbon')==='0')rb.hidden=true}catch(e){}
    var rc=$('[data-ribbon-close]',rb); if(rc)rc.addEventListener('click',function(){rb.hidden=true;try{sessionStorage.setItem('ms-ribbon','0')}catch(e){}});}
  // reveal on scroll
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    $$('.reveal').forEach(function(el){io.observe(el)});}else{$$('.reveal').forEach(function(el){el.classList.add('is-in')});}
  // app links: rewrite to configured app origin
  $$('[data-app]').forEach(function(a){var p=(C.appPaths||{})[a.dataset.app];if(p&&C.appOrigin)a.href=C.appOrigin.replace(/\/$/,'')+p;});
  // consent-gated analytics (Plausible, only if a domain is configured)
  var box=$('[data-consent]');
  function load(){if(!C.analyticsDomain||d.getElementById('pa'))return;var s=d.createElement('script');s.id='pa';s.defer=true;s.src='https://plausible.io/js/script.js';s.setAttribute('data-domain',C.analyticsDomain);d.head.appendChild(s);}
  var choice=null;try{choice=localStorage.getItem('ms-consent')}catch(e){}
  if(choice==='yes')load(); else if(!choice&&box&&C.analyticsDomain)box.hidden=false;
  $$('[data-consent-choice]').forEach(function(b){b.addEventListener('click',function(){var v=b.dataset.consentChoice;try{localStorage.setItem('ms-consent',v)}catch(e){}if(box)box.hidden=true;if(v==='yes')load();});});
  $$('[data-consent-reset]').forEach(function(b){b.addEventListener('click',function(){try{localStorage.removeItem('ms-consent')}catch(e){}if(box){box.hidden=false;var f=$('button',box);if(f)f.focus();}});});
  // naira formatting helper shared by tools
  window.MSfmt=function(n){return '\u20A6'+Math.round(n).toLocaleString('en-NG');};
})();
