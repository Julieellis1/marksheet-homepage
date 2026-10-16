/* Annual cost calculator: flat per-school licence vs a per-student plan */
(function(){
  var root=document.querySelector('[data-pricing]'); if(!root)return; var C=window.MS||{}, P=C.pricing||{};
  var f=window.MSfmt, st=root.querySelector('[name=students]'), stOut=root.querySelector('[data-students-out]'), rate=root.querySelector('[name=rate]'), reg=root.querySelector('[name=reg]');
  function run(){
    var n=+st.value, r=Math.max(0,+rate.value||0); stOut.textContent=n.toLocaleString('en-NG');
    var term=P.termly*3, month=P.monthly*12, per=n*r*3, regFee=(reg&&reg.checked)?P.registrationFee:0;
    var max=Math.max(term,month,per)+regFee||1;
    var set=function(k,v){var el=root.querySelector('[data-out='+k+']');el.textContent=f(v);var bar=root.querySelector('[data-bar='+k+']');if(bar)bar.style.width=(100*v/max)+'%';};
    set('termly',term+regFee);set('monthly',month+regFee);set('per',per);
    var save=per-(term+regFee), s=root.querySelector('[data-out=verdict]');
    s.textContent= save>0 ? 'For '+n.toLocaleString('en-NG')+' students, the termly licence costs '+f(save)+' less per year than a per-student plan at '+f(r)+' a head each term.' : 'At this size, a per-student plan at '+f(r)+' a head each term comes in '+f(-save)+' cheaper per year. Our flat licence pays off as your school grows.';
    root.querySelector('[data-out=perterm]').textContent=f(P.termly/Math.max(n,1))+' per student per term';
  }
  root.addEventListener('input',run); run();
})();
