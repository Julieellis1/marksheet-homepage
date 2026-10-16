/* Accessible tabs (roles) */
(function(){
  document.querySelectorAll('[data-tabs]').forEach(function(root){
    var tabs=[].slice.call(root.querySelectorAll('[role=tab]'));
    function sel(t,focus){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});if(focus)t.focus();}
    tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});
      t.addEventListener('keydown',function(e){var k=e.key,j=null;if(k==='ArrowRight')j=(i+1)%tabs.length;if(k==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(k==='Home')j=0;if(k==='End')j=tabs.length-1;if(j!==null){e.preventDefault();sel(tabs[j],true);}});});
    var h=location.hash.slice(1),start=tabs.filter(function(t){return t.dataset.key===h})[0]||tabs[0];sel(start);
  });
})();
