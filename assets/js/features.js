/* Feature finder: filter by category chip + free-text search */
(function(){
  var root=document.querySelector('[data-finder]'); if(!root)return;
  var cards=[].slice.call(root.querySelectorAll('[data-cat]')), q=root.querySelector('input[type=search]'), out=root.querySelector('[data-finder-count]'), cat='all';
  function run(){var t=(q.value||'').trim().toLowerCase(),n=0;
    cards.forEach(function(c){var ok=(cat==='all'||c.dataset.cat===cat)&&(!t||c.textContent.toLowerCase().indexOf(t)>-1);c.hidden=!ok;if(ok)n++;});
    out.textContent=n+(n===1?' module':' modules')+' shown';}
  root.querySelectorAll('[name=cat]').forEach(function(r){r.addEventListener('change',function(){cat=r.value;run();});});
  q.addEventListener('input',run); run();
})();
