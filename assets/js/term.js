/* Twelve-week term scrubber */
(function(){
  var root=document.querySelector('[data-term]'); if(!root)return;
  var weeks=[].slice.call(root.querySelectorAll('.term-week')), panels=[].slice.call(root.querySelectorAll('.term-panel')), live=root.querySelector('[data-term-live]');
  function pick(w){weeks.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.week===String(w)))});
    var ph=root.querySelector('.term-week[data-week="'+w+'"]').dataset.phase;
    panels.forEach(function(p){p.hidden=p.dataset.phase!==ph});
    if(live)live.textContent='Week '+w+' selected.';}
  weeks.forEach(function(b){b.addEventListener('click',function(){pick(b.dataset.week)});
    b.addEventListener('keydown',function(e){var i=weeks.indexOf(b);if(e.key==='ArrowRight'&&i<11){weeks[i+1].focus();pick(i+2);e.preventDefault();}if(e.key==='ArrowLeft'&&i>0){weeks[i-1].focus();pick(i);e.preventDefault();}});});
  pick(1);
})();
