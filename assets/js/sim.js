/* Offline exam-hall simulator: answers save locally, queue, then sync when the network returns */
(function(){
  var root=document.querySelector('[data-sim]'); if(!root)return;
  var sw=root.querySelector('[role=switch]'), log=root.querySelector('[data-sim-log]'), state=root.querySelector('[data-sim-state]'), queue=[], online=true;
  function t(){var d=new Date();return d.toTimeString().slice(0,8);}
  function line(txt,cls){var p=document.createElement('div');if(cls)p.className=cls;p.textContent='['+t()+'] '+txt;log.appendChild(p);log.scrollTop=log.scrollHeight;}
  sw.addEventListener('click',function(){online=!online;sw.setAttribute('aria-checked',String(online));state.textContent=online?'Internet: on':'Internet: off';
    if(!online){line('Internet lost. Exam continues on the school LAN.','w');}
    else{line('Internet back. Syncing '+queue.length+' saved answer'+(queue.length===1?'':'s')+' to the cloud…','s');queue.forEach(function(q){line('✓ synced '+q,'s')});queue=[];line('All answers safe in the cloud.');}});
  root.querySelectorAll('input[type=radio]').forEach(function(r){r.addEventListener('change',function(){
    var id=r.name.toUpperCase()+' → '+r.value;
    if(online){line('Saved on LAN + cloud: '+id);}else{queue.push(id);line('Saved on LAN (queued for sync): '+id,'w');}
    var right=r.dataset.correct==='1';line('MCQ auto-marked: '+(right?'correct (+1)':'incorrect (0)'));});});
  line('Exam hall ready. 3 questions. Try switching the internet off.');
})();
