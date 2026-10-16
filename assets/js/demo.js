/* Three-step demo request (Netlify Forms) with per-step validation and a WhatsApp fallback */
(function(){
  var form=document.querySelector('[data-demo]'); if(!form)return;
  var steps=[].slice.call(form.querySelectorAll('.step')), dots=[].slice.call(form.querySelectorAll('.form-steps li')), msg=form.querySelector('[data-form-msg]'), i=0;
  function show(n){steps.forEach(function(s,k){s.hidden=k!==n});dots.forEach(function(d,k){d.classList.toggle('done',k<n);if(k===n)d.setAttribute('aria-current','step');else d.removeAttribute('aria-current');});i=n;var h=steps[n].querySelector('h2,legend');if(h){h.tabIndex=-1;h.focus();}}
  function valid(){var bad=[].slice.call(steps[i].querySelectorAll('input,select,textarea')).filter(function(el){return !el.checkValidity()});
    if(bad.length){msg.hidden=false;msg.textContent='Please complete: '+bad.map(function(b){var l=form.querySelector('label[for="'+b.id+'"]');return l?l.textContent.replace('*','').trim():b.name}).filter(function(v,k,a){return a.indexOf(v)===k}).join(', ')+'.';bad[0].focus();return false;}
    msg.hidden=true;return true;}
  form.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){if(valid())show(i+1)})});
  form.querySelectorAll('[data-back]').forEach(function(b){b.addEventListener('click',function(){msg.hidden=true;show(i-1)})});
  form.addEventListener('submit',function(e){if(!valid())e.preventDefault();});
  var wa=document.querySelector('[data-wa-prefill]');
  function upd(){var g=function(n){var el=form.querySelector('[name="'+n+'"]');return el&&el.value?el.value:'';};
    var t='Hello Marksheet, I\u2019d like a demo.'+(g('school')?' School: '+g('school')+'.':'')+(g('students')?' Students: '+g('students')+'.':'')+(g('name')?' — '+g('name'):'');
    wa.href='https://wa.me/'+(window.MS||{}).whatsapp+'?text='+encodeURIComponent(t);}
  if(wa){form.addEventListener('input',upd);form.addEventListener('change',upd);upd();}
  show(0); var h=steps[0].querySelector('h2,legend'); if(h)h.removeAttribute('tabindex');
  if(document.activeElement&&steps[0].contains(document.activeElement))document.activeElement.blur();
})();
