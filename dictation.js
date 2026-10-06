// نتائج إملاء ٢٠ كلمة (مبادرتا الإملاء السريع وعلامة) — الطلاب بأرقام لا بأسماء
// PRE: درجات القياس القبلي. أضيفي درجات القياس البعدي في POST بالترتيب نفسه عند توفّرها فتظهر المقارنة تلقائيًا
window.DICT = {
  max: 20,
  PRE: [13,12,11,11,11,10,10,10,8,8,7,7,7,7,6,6,6,5,5,4,3,2,2,2,2,2,2,0,0,0,0],
  POST: []
};
(function(){
var css='.dchart{margin-top:16px;background:#FFFCF6;border:1.5px solid var(--sand);border-radius:18px;padding:14px 14px 10px}'+
'.dchart h4{font-family:var(--h);font-weight:500;color:var(--fern-d);margin:0 0 2px;font-size:17px}'+
'.dchart .sub{font-size:13px;color:var(--mut);margin:0 0 10px}'+
'.dchart .kp{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px}'+
'.dchart .kp div{background:var(--paper);border-radius:12px;padding:6px 4px;text-align:center;font-size:12px;color:var(--mut)}'+
'.dchart .kp b{display:block;font-family:var(--h);font-size:20px;color:var(--ink);font-weight:500}'+
'.dchart .tg{display:flex;gap:6px;margin-bottom:8px}'+
'.dchart .tg button{flex:1;font:inherit;font-size:13px;border:1.5px solid var(--sand);background:#fff;color:var(--ink);border-radius:999px;padding:6px;cursor:pointer}'+
'.dchart .tg button.on{background:var(--fern);border-color:var(--fern);color:#fff}'+
'.dchart svg{width:100%;height:auto;display:block;overflow:visible;direction:ltr}'+
'.dchart .bar{transition:opacity .2s;cursor:pointer}.dchart .bar:hover{opacity:.75}'+
'.dchart .tip{min-height:22px;text-align:center;font-size:14px;color:var(--ink);font-weight:700;margin-top:4px}'+
'.dchart .lg{display:flex;flex-wrap:wrap;gap:4px 12px;justify-content:center;font-size:12px;color:var(--mut)}'+
'.dchart .lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-left:4px;vertical-align:middle}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();
function dAN(n){return String(n).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]}).replace('.','٫')}
function chartHTML(){var a=DICT.PRE,n=a.length,avg=a.reduce(function(x,y){return x+y},0)/n;
 return '<div class="dchart"><h4>نتائج القياس القبلي: إملاء '+dAN(DICT.max)+' كلمة</h4><p class="sub">درجة كل طالب من '+dAN(DICT.max)+' — مرّري أو اضغطي على العمود لعرض التفاصيل</p>'+
 '<div class="kp"><div><b>'+dAN(n)+'</b>طالبًا</div><div><b>'+dAN(avg.toFixed(1))+'</b>المتوسط</div><div><b>'+dAN(Math.max.apply(0,a))+'</b>أعلى درجة</div><div><b>'+dAN(Math.min.apply(0,a))+'</b>أقل درجة</div></div>'+
 '<div class="tg"><button class="on" data-v="lv">توزيع المستويات</button><button data-v="st">درجات الطلاب</button></div><div class="cv"></div><div class="tip">&nbsp;</div></div>'}
function mountChart(box){var cv=box.querySelector('.cv'),tip=box.querySelector('.tip'),a=DICT.PRE,b=DICT.POST,has=b.length===a.length,M=DICT.max,n=a.length;
 var avg=a.reduce(function(x,y){return x+y},0)/n;
 var L=[['يحتاج دعمًا مكثفًا','٠–٤',0,4,'#E79897'],['في طور التحسّن','٥–٩',5,9,'#FCC88A'],['جيد','١٠–١٤',10,14,'#B7CBDB'],['متمكّن','١٥–٢٠',15,20,'#768E78']];
 function band(v){for(var i=0;i<L.length;i++)if(v>=L[i][2]&&v<=L[i][3])return L[i];return L[L.length-1]}
 function lv(){var W=320,H=190,bw=50,gap=(W-4*bw)/5;
  function cnt(x){return L.map(function(l){return x.filter(function(v){return v>=l[2]&&v<=l[3]}).length})}
  var c1=cnt(a),c2=has?cnt(b):[0],mx=Math.max.apply(0,c1.concat(c2,[1])),g='';
  function draw(c,xx,w,col,lab){var h=c/mx*(H-60);
   g+='<rect class="bar" x="'+xx+'" y="'+(H-30-h)+'" width="'+w+'" height="'+Math.max(h,2)+'" rx="6" fill="'+col+'" data-t="'+lab+': '+dAN(c)+' '+(c===1?'طالب':'طلاب')+' ('+dAN(Math.round(c/n*100))+'٪)"/>'+
   '<text x="'+(xx+w/2)+'" y="'+(H-36-h)+'" text-anchor="middle" font-size="13" fill="#4E5F50" font-weight="700">'+dAN(c)+'</text>'}
  L.forEach(function(l,k){var x=W-gap-(k+1)*bw-k*gap;
   if(has){draw(c1[k],x+bw/2,bw/2-2,l[4],'قبلي — '+l[0]);draw(c2[k],x,bw/2-2,'#5E7563','بعدي — '+l[0])}
   else draw(c1[k],x,bw,l[4],l[0]+' ('+l[1]+')');
   g+='<text x="'+(x+bw/2)+'" y="'+(H-12)+'" text-anchor="middle" font-size="11" fill="#7A7F6E">'+l[1]+'</text>'});
  g+='<line x1="0" x2="'+W+'" y1="'+(H-30)+'" y2="'+(H-30)+'" stroke="#EBDEC0" stroke-width="1.5"/>';
  cv.innerHTML='<svg viewBox="0 0 '+W+' '+H+'">'+g+'</svg><div class="lg">'+L.map(function(l){return '<span><i style="background:'+l[4]+'"></i>'+l[0]+'</span>'}).join('')+(has?'<span><i style="background:#5E7563"></i>القياس البعدي</span>':'')+'</div>'}
 function sd(){var W=320,H=200,R=22,bw=(W-R)/n,g='';
  function y(v){return H-24-v/M*(H-40)}
  [0,5,10,15,20].forEach(function(t){g+='<line x1="0" x2="'+(W-R)+'" y1="'+y(t)+'" y2="'+y(t)+'" stroke="#EBDEC0" stroke-dasharray="'+(t?'3 4':'')+'"/><text x="'+(W-R+4)+'" y="'+(y(t)+4)+'" font-size="10" fill="#7A7F6E">'+dAN(t)+'</text>'});
  a.forEach(function(v,k){var x=W-R-(k+1)*bw;
   g+='<rect class="bar" x="'+(x+1)+'" y="'+y(v)+'" width="'+(bw-2)+'" height="'+Math.max(H-24-y(v),2)+'" rx="2.5" fill="'+band(v)[4]+'" data-t="الطالب '+dAN(k+1)+': '+dAN(v)+' من '+dAN(M)+(has?' ← بعدي '+dAN(b[k]):'')+'"/>';
   if(has)g+='<circle cx="'+(x+bw/2)+'" cy="'+y(b[k])+'" r="3" fill="#5E7563"/>';
   if((k+1)%5===0||k===0)g+='<text x="'+(x+bw/2)+'" y="'+(H-10)+'" text-anchor="middle" font-size="9" fill="#7A7F6E">'+dAN(k+1)+'</text>'});
  g+='<line x1="0" x2="'+(W-R)+'" y1="'+y(avg)+'" y2="'+y(avg)+'" stroke="#C9706F" stroke-width="1.8" stroke-dasharray="6 4"/><text x="2" y="'+(y(avg)-5)+'" font-size="10" fill="#C9706F" font-weight="700">المتوسط '+dAN(avg.toFixed(1))+'</text>';
  cv.innerHTML='<svg viewBox="0 0 '+W+' '+H+'">'+g+'</svg><div class="lg"><span>أرقام الطلاب أسفل الأعمدة (مرتّبة من الأعلى درجةً)</span></div>'}
 function show(v){if(v==='lv')lv();else sd();tip.innerHTML='&nbsp;';box.querySelectorAll('.tg button').forEach(function(x){x.classList.toggle('on',x.dataset.v===v)})}
 box.querySelectorAll('.tg button').forEach(function(x){x.onclick=function(){show(x.dataset.v)}});
 function t(e){if(e.target.dataset&&e.target.dataset.t)tip.textContent=e.target.dataset.t}
 cv.addEventListener('pointerover',t);cv.addEventListener('click',t);
 show('lv')}
