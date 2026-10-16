/* Verification-code helper: normalise MS-codes and hand off to the live portal */
(function(){
  var C=window.MS||{};
  document.querySelectorAll('[data-verify]').forEach(function(form){
    var inp=form.querySelector('input'), err=form.querySelector('[data-verify-err]');
    inp.addEventListener('input',function(){var v=inp.value.toUpperCase().replace(/[^A-Z0-9-]/g,'');if(/^MS[A-Z0-9]/.test(v))v='MS-'+v.slice(2);inp.value=v;});
    form.addEventListener('submit',function(e){var v=inp.value.trim();
      if(!/^MS-[A-Z0-9]{6,14}$/.test(v)){e.preventDefault();err.hidden=false;err.textContent='That doesn\u2019t look like a Marksheet code. Codes start with MS- and are printed on the report card.';inp.setAttribute('aria-invalid','true');inp.focus();return;}
      err.hidden=true;inp.removeAttribute('aria-invalid');
      form.action=(C.appOrigin||'').replace(/\/$/,'')+(C.appPaths||{}).verify;});
  });
})();
