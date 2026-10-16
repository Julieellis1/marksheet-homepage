(function(){var bar=document.querySelector('.progress'),art=document.querySelector('[data-article]');if(!bar||!art)return;
 function u(){var r=art.getBoundingClientRect(),h=art.offsetHeight-innerHeight;bar.style.width=Math.min(100,Math.max(0,(-r.top/Math.max(h,1))*100))+'%';}addEventListener('scroll',u,{passive:true});u();
 var links=[].slice.call(document.querySelectorAll('.toc a'));if(!links.length||!('IntersectionObserver' in window))return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('is-active',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});
 links.forEach(function(l){var t=document.getElementById(l.getAttribute('href').slice(1));if(t)io.observe(t)});})();
