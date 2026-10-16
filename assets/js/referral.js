(function(){var root=document.querySelector('[data-referral]');if(!root)return;var C=window.MS||{},R=C.referral||{},f=window.MSfmt;
 var n=root.querySelector('[name=schools]'),o=root.querySelector('[data-ref-out]'),c=root.querySelector('[data-ref-count]');
 function run(){var v=+n.value;c.textContent=v;o.textContent=f(v*R.commission);} root.addEventListener('input',run);run();})();
