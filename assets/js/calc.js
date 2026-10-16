/* Live broadsheet: weighted CA + exam totals, grades, positions with ties. Pure client-side demo. */
(function(){
  var root=document.querySelector('[data-calc]'); if(!root)return;
  var SCALE=[[75,'A1','a'],[70,'B2','b'],[65,'B3','b'],[60,'C4','c'],[55,'C5','c'],[50,'C6','c'],[45,'D7','f'],[40,'E8','f'],[0,'F9','f']];
  var w1=root.querySelector('[name=w1]'),w2=root.querySelector('[name=w2]'),w3=root.querySelector('[name=w3]'),msg=root.querySelector('[data-calc-msg]');
  var rows=[].slice.call(root.querySelectorAll('tbody tr'));
  var card=document.querySelector('[data-calc-card]');
  function grade(t){for(var i=0;i<SCALE.length;i++)if(t>=SCALE[i][0])return SCALE[i];}
  function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
  function num(el,max){var v=parseFloat(el.value);if(isNaN(v)||v<0)v=0;if(v>max){v=max;el.value=max;}return v;}
  function run(){
    var a=num(w1,100),b=num(w2,100),c=num(w3,100),sum=a+b+c;
    if(Math.round(sum)!==100){msg.textContent='Weights add up to '+sum+'%. Make them total 100%.';msg.hidden=false;}else{msg.hidden=true;}
    var data=rows.map(function(r){var ins=r.querySelectorAll('input');
      var s1=num(ins[0],a),s2=num(ins[1],b),s3=num(ins[2],c);
      ins[0].max=a;ins[1].max=b;ins[2].max=c;
      return {r:r,t:Math.round((s1+s2+s3)*10)/10};});
    var sorted=data.slice().sort(function(x,y){return y.t-x.t});
    data.forEach(function(d){var pos=1+sorted.filter(function(o){return o.t>d.t}).length,tie=sorted.filter(function(o){return o.t===d.t}).length>1,g=grade(d.t);
      d.r.querySelector('.total').textContent=d.t;
      var gr=d.r.querySelector('.grade');gr.textContent=g[1];gr.className='grade grade--'+g[2];
      d.r.querySelector('.pos').textContent=ord(pos)+(tie?'=':'');
      d.r.classList.toggle('is-top',pos===1);d.pos=pos;d.g=g;});
    root.querySelector('[data-calc-head1]').textContent='CA1 ('+a+')';root.querySelector('[data-calc-head2]').textContent='CA2 ('+b+')';root.querySelector('[data-calc-head3]').textContent='Exam ('+c+')';
    if(card){var first=data[0];card.querySelector('[data-rc-name]').textContent=first.r.dataset.name;card.querySelector('[data-rc-total]').textContent=first.t;
      card.querySelector('[data-rc-grade]').textContent=first.g[1];card.querySelector('[data-rc-pos]').textContent=ord(first.pos)+' of '+data.length;}
  }
  root.addEventListener('input',run); run();
  var reset=root.querySelector('[data-calc-reset]'); if(reset)reset.addEventListener('click',function(){root.querySelectorAll('input').forEach(function(i){i.value=i.defaultValue});run();});
})();
