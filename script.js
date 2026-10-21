/* ---------- routing ---------- */
const pages=[...document.querySelectorAll('.page')],links=[...document.querySelectorAll('nav ul a')];
function route(){
  const p=(location.hash||'#home').slice(1);
  const t=document.getElementById(p)?p:'home';
  pages.forEach(x=>x.classList.toggle('show',x.id===t));
  links.forEach(a=>a.classList.toggle('active',a.dataset.p===t));
  document.getElementById('links').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
  bindTilt();
}
addEventListener('hashchange',route);

/* ---------- cup drawings ---------- */
let uid=0;
const TYPES={
  mocha:{c:['#7a4527','#3a1c0e'],art:'swirl',name:'Mocha',desc:'Rich chocolate aur espresso, upar se creamy swirl.'},
  cappuccino:{c:['#b5753d','#6b3a1c'],art:'dust',name:'Cappuccino',desc:'Foamy, balanced aur cocoa dust ke saath.'},
  latte:{c:['#c98a4a','#8a5428'],art:'heart',name:'Latte',desc:'Smooth aur creamy espresso, steamed milk aur halke foam ke saath.'},
  espresso:{c:['#5a2d14','#1f0e06'],art:'crema',name:'Espresso',desc:'Chhota, strong aur ekdum kadak.'},
  cold:{c:['#8a4a22','#3a1b0b'],art:'cold',name:'Cold Brew',desc:'Dheere dheere bani thandi coffee, bina kadwahat ke.'}
};
function cupSVG(k){
  const T=TYPES[k],id='g'+(uid++);
  const defs=`<defs>
    <linearGradient id="${id}a" x1="0" x2="1"><stop offset="0" stop-color="#e3cba7"/><stop offset=".38" stop-color="#fbf0de"/><stop offset="1" stop-color="#c4a681"/></linearGradient>
    <radialGradient id="${id}b" cx="40%" cy="35%"><stop offset="0" stop-color="${T.c[0]}"/><stop offset="1" stop-color="${T.c[1]}"/></radialGradient>
    <linearGradient id="${id}c" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".3"/><stop offset="1" stop-color="#ffffff" stop-opacity=".06"/></linearGradient></defs>`;
  if(k==='cold'){
    return `<svg viewBox="0 0 230 180">${defs}
    <ellipse cx="110" cy="170" rx="62" ry="8" fill="#000" opacity=".4"/>
    <path d="M126 52 L158 4" stroke="#E9B872" stroke-width="7" stroke-linecap="round"/>
    <path d="M54 32 L166 32 L152 160 Q151 166 145 166 L75 166 Q69 166 68 160 Z" fill="url(#${id}c)" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>
    <path d="M60 50 L160 50 L150 158 Q149 162 144 162 L76 162 Q71 162 70 158 Z" fill="url(#${id}b)"/>
    <ellipse cx="110" cy="50" rx="50" ry="9" fill="${T.c[0]}"/>
    <g fill="#fff" fill-opacity=".3" stroke="#fff" stroke-opacity=".6"><rect x="78" y="40" width="26" height="22" rx="5" transform="rotate(-12 91 51)"/><rect x="108" y="38" width="26" height="22" rx="5" transform="rotate(10 121 49)"/><rect x="92" y="66" width="24" height="20" rx="5" transform="rotate(18 104 76)"/></g>
    <ellipse cx="110" cy="32" rx="56" ry="11" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
    <path d="M64 44 L72 150" stroke="#fff" stroke-opacity=".25" stroke-width="4" stroke-linecap="round"/></svg>`;
  }
  let art='';
  if(T.art==='heart') art=`<path d="M0 46 C-34 22 -32 -22 -10 -22 C-3 -22 0 -17 0 -12 C0 -17 3 -22 10 -22 C32 -22 34 22 0 46Z" fill="#fbeedb"/><path d="M0 32 C-22 16 -22 -8 -8 -8 C-3 -8 0 -4 0 0 C0 -4 3 -8 8 -8 C22 -8 22 16 0 32Z" fill="none" stroke="${T.c[0]}" stroke-width="3"/><path d="M0 18 C-10 10 -10 0 -4 0 C-1 0 0 2 0 4 C0 2 1 0 4 0 C10 0 10 10 0 18Z" fill="#fbeedb"/>`;
  if(T.art==='swirl'){art='<circle r="46" fill="#f4e2c6"/>';for(let r=38;r>4;r-=8)art+=`<circle r="${r}" fill="none" stroke="#4a2410" stroke-width="3" opacity=".7"/>`}
  if(T.art==='dust'){art='<circle r="52" fill="#f2dec0"/>';for(let i=0;i<60;i++){const a=Math.random()*6.283,r=Math.random()*46;art+=`<circle cx="${Math.cos(a)*r}" cy="${Math.sin(a)*r}" r="${1+Math.random()*2.2}" fill="#4a2410" opacity=".75"/>`}}
  if(T.art==='crema') art=`<circle r="62" fill="#c9893f" opacity=".6"/><circle r="42" fill="#e2ac62" opacity=".5"/>`;
  let speck='';
  for(let i=0;i<40;i++){const x=30+Math.random()*160,y=62+Math.random()*95;if(Math.pow((x-110)/82,2)+Math.pow((y-90)/72,2)<1)speck+=`<circle cx="${x}" cy="${y}" r="${.6+Math.random()*1.4}" fill="#8b6a4a" opacity=".5"/>`}
  return `<svg viewBox="0 0 230 180">${defs}
  <ellipse cx="110" cy="170" rx="82" ry="8" fill="#000" opacity=".4"/>
  <path d="M176 56 C222 46 222 108 166 110" fill="none" stroke="#c4a681" stroke-width="16" stroke-linecap="round"/>
  <path d="M176 55 C219 46 219 105 166 108" fill="none" stroke="url(#${id}a)" stroke-width="11" stroke-linecap="round"/>
  <path d="M26 50 C26 118 58 162 110 162 C162 162 194 118 194 50 Z" fill="url(#${id}a)"/>${speck}
  <path d="M40 70 C44 110 60 140 82 152" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="110" cy="50" rx="84" ry="24" fill="#f6e8d0" stroke="#c4a681" stroke-width="1.5"/>
  <ellipse cx="110" cy="52" rx="74" ry="19" fill="#e4cdab"/>
  <ellipse cx="110" cy="54" rx="68" ry="16.5" fill="url(#${id}b)"/>
  <g transform="translate(110 54) scale(1 .245)">${art}</g></svg>`;
}
function cupSVGTop(k){
  const T=TYPES[k],id='g'+(uid++);
  let speck='';
  for(let i=0;i<34;i++){const a=Math.random()*6.283,r=98+Math.random()*12;speck+=`<circle cx="${130+Math.cos(a)*r}" cy="${130+Math.sin(a)*r}" r="${.6+Math.random()*1.6}" fill="#8b6a4a" opacity=".55"/>`}
  const defs=`<defs>
    <radialGradient id="${id}a" cx="38%" cy="32%"><stop offset="0" stop-color="#fbf0de"/><stop offset="1" stop-color="#d7bc98"/></radialGradient>
    <radialGradient id="${id}b" cx="40%" cy="35%"><stop offset="0" stop-color="${T.c[0]}"/><stop offset="1" stop-color="${T.c[1]}"/></radialGradient>
  </defs>`;
  if(k==='cold'){
    let ice='';[[96,98,-14],[150,92,10],[118,140,22],[162,146,-6]].forEach(p=>{ice+=`<rect x="${p[0]-17}" y="${p[1]-17}" width="34" height="34" rx="7" fill="#fff" opacity=".28" stroke="#fff" stroke-opacity=".5" transform="rotate(${p[2]} ${p[0]} ${p[1]})"/>`});
    return `<svg viewBox="0 0 270 260">${defs}<ellipse cx="135" cy="240" rx="98" ry="12" fill="#000" opacity=".4"/>
    <circle cx="130" cy="130" r="106" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" stroke-width="3"/>
    <circle cx="130" cy="130" r="92" fill="url(#${id}b)"/>${ice}
    <ellipse cx="100" cy="78" rx="46" ry="14" fill="#fff" opacity=".18" transform="rotate(-25 100 78)"/></svg>`;
  }
  let art='';
  if(T.art==='heart') art=`<path d="M130 176 C88 146 90 98 118 98 C126 98 130 106 130 112 C130 106 134 98 142 98 C170 98 172 146 130 176Z" fill="#fbeedb" opacity=".95"/><path d="M130 160 C104 140 104 112 120 112 C126 112 130 118 130 122 C130 118 134 112 140 112 C156 112 156 140 130 160Z" fill="none" stroke="${T.c[0]}" stroke-width="3" opacity=".8"/><path d="M130 146 C116 134 116 122 124 122 C128 122 130 126 130 128 C130 126 132 122 136 122 C144 122 144 134 130 146Z" fill="#fbeedb"/>`;
  if(T.art==='swirl'){art='<circle cx="130" cy="130" r="56" fill="#f4e2c6" opacity=".92"/>';for(let r=44;r>6;r-=9)art+=`<circle cx="130" cy="130" r="${r}" fill="none" stroke="#4a2410" stroke-width="3.5" opacity=".7"/>`}
  if(T.art==='dust'){art='<circle cx="130" cy="130" r="64" fill="#f2deC0" opacity=".9"/>';for(let i=0;i<70;i++){const a=Math.random()*6.283,r=Math.random()*56;art+=`<circle cx="${130+Math.cos(a)*r}" cy="${130+Math.sin(a)*r}" r="${1+Math.random()*2.2}" fill="#4a2410" opacity=".75"/>`}}
  if(T.art==='crema') art=`<circle cx="130" cy="130" r="78" fill="#c9893f" opacity=".6"/><circle cx="130" cy="130" r="56" fill="#e2ac62" opacity=".5"/>`;
  return `<svg viewBox="0 0 320 260">${defs}
  <ellipse cx="135" cy="240" rx="108" ry="13" fill="#000" opacity=".4"/>
  <path d="M226 96 C300 84 306 178 226 168" fill="none" stroke="#c8ab86" stroke-width="26" stroke-linecap="round"/>
  <path d="M226 96 C298 86 302 176 226 166" fill="none" stroke="url(#${id}a)" stroke-width="20" stroke-linecap="round"/>
  <circle cx="130" cy="130" r="114" fill="url(#${id}a)"/>${speck}
  <circle cx="130" cy="130" r="97" fill="#ecd8bb" stroke="#bf9f78" stroke-width="2"/>
  <circle cx="130" cy="130" r="86" fill="url(#${id}b)"/>${art}
  <ellipse cx="92" cy="72" rx="52" ry="13" fill="#fff" opacity=".13" transform="rotate(-28 92 72)"/></svg>`;
}

/* ---------- hero ---------- */
const order=['mocha','cappuccino','latte','espresso','cold'];
const big=document.getElementById('bigcup'),row=document.getElementById('row');
function setPick(k){
  if(window.cup3d){window.cup3d.set(k)}else{big.style.opacity=0;setTimeout(()=>{big.innerHTML=cupSVG(k);big.style.opacity=1},180)}
  document.getElementById('pName').textContent=TYPES[k].name;
  document.getElementById('pDesc').textContent=TYPES[k].desc;
  [...row.children].forEach(m=>m.classList.toggle('on',m.dataset.k===k));
}
order.forEach(k=>{
  const d=document.createElement('div');d.className='mini';d.dataset.k=k;
  d.innerHTML=cupSVG(k)+`<b>${TYPES[k].name}</b><span>₹ --</span>`;
  d.onclick=()=>setPick(k);row.appendChild(d);
});
big.innerHTML=cupSVG('latte');row.children[2].classList.add('on');

/* ---------- background leaves & beans ---------- */
const leafSVG=`<svg viewBox="0 0 160 120"><path d="M2 100 C22 24 92 2 150 12 C138 72 82 122 2 100Z" fill="#1d3a2a"/><path d="M6 98 C50 70 100 40 146 14" stroke="#2f5a42" stroke-width="2" fill="none"/></svg>`;
const beanSVG=`<svg viewBox="0 0 40 56"><ellipse cx="20" cy="28" rx="17" ry="25" fill="#3b2012"/><ellipse cx="14" cy="18" rx="5" ry="10" fill="#fff" opacity=".07"/><path d="M20 4 C8 22 32 34 20 52" stroke="#120804" stroke-width="3" fill="none"/></svg>`;
const bg=document.getElementById('bg');
['l1','l2','l3'].forEach(c=>{const d=document.createElement('div');d.className='leaf '+c;d.innerHTML=leafSVG;bg.appendChild(d)});
[[6,52,24],[12,64,-30],[4,74,50],[90,24,-20],[94,36,35],[84,82,15],[18,86,-45],[70,92,10]].forEach((p,i)=>{
  const d=document.createElement('div');d.className='bean';
  d.style.cssText=`left:${p[0]}%;top:${p[1]}%;width:${30+(i%3)*10}px;transform:rotate(${p[2]}deg);animation-delay:-${i*1.3}s`;
  d.innerHTML=beanSVG;bg.appendChild(d);
});

/* ---------- tilt ---------- */
function bindTilt(){
  document.querySelectorAll('.tilt').forEach(c=>{
    if(c._t)return;c._t=1;
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform=`rotateY(${x*16}deg) rotateX(${-y*16}deg) translateZ(10px)`;
    });
    c.addEventListener('mouseleave',()=>c.style.transform='');
  });
}

/* ---------- menu (sample) ---------- */
const menu={
  "Coffee":[["mocha","Mocha","Chocolate aur espresso ka mel"],["cappuccino","Cappuccino","Foamy aur smooth"],["latte","Latte","Creamy aur halka meetha"],["espresso","Espresso","Chhota magar kadak"],["cold","Cold Brew","Thandi aur bold"]],
  "Chai & Tea":[["🍵","Masala Chai","Adrak-elaichi wali"],["🫖","Cutting Chai","Chhota magar kadak"],["🍋","Lemon Tea","Taazgi se bhara"]],
  "Snacks":[["🥪","Grilled Sandwich","Cheese se bhara"],["🍔","Veg Burger","Crispy patty"],["🍟","French Fries","Garma-garam"],["🍕","Pizza","Cheesy slice"]],
  "Desserts":[["🍰","Cake Slice","Meetha aur soft"],["🍩","Donut","Rang-birangi"],["🧇","Waffle","Chocolate wala"],["🍨","Ice Cream","Thandak ka maza"]]
};
const tabs=document.getElementById('tabs'),mg=document.getElementById('menuGrid');
function showCat(k){
  [...tabs.children].forEach(t=>t.classList.toggle('on',t.textContent===k));
  mg.innerHTML=menu[k].map(m=>`<div class="card mcard tilt"><div class="art">${TYPES[m[0]]?cupSVG(m[0]):`<span class="plate">${m[0]}</span>`}</div><h3>${m[1]}</h3><p>${m[2]}</p><span class="price">₹ --</span></div>`).join('');
  bindTilt();
}
Object.keys(menu).forEach(k=>{const b=document.createElement('div');b.className='tab';b.textContent=k;b.onclick=()=>showCat(k);tabs.appendChild(b)});
showCat('Coffee');

/* ---------- gallery placeholders ---------- */
const gem=['☕','🍰','🪴','🎶','🥐','🛋️'],gl=['Coffee Corner','Dessert Table','Green Corner','Music Evening','Bakery Treats','Cozy Seating'];
document.getElementById('gal').innerHTML=gem.map((e,i)=>`<div class="flip"><div class="side"><div class="big">${e}</div><span>${gl[i]}</span></div><div class="side back">📷 Photo jald aayegi</div></div>`).join('');

function demo(e,id){e.preventDefault();document.getElementById(id).style.display='block';e.target.reset();return false}
route();

/* =====================================================
   3D CUP (Three.js): site ke baad load hota hai.
   Agar internet/CDN na ho to upar wala 2D cup dikhta rahega.
   ===================================================== */
(async()=>{try{
const THREE=await import('three');
const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
const TY=TYPES;
const box=document.getElementById('bigcup');
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,stencil:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
renderer.localClippingEnabled=true;
const el=renderer.domElement;el.style.touchAction='none';
const scene=new THREE.Scene();
scene.environment=new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(),0.04).texture;
const camera=new THREE.PerspectiveCamera(30,1.1,.1,100);
camera.position.set(0,4.2,9.8);camera.lookAt(0,1.05,0);
const key=new THREE.DirectionalLight(0xfff0dd,1.6);key.position.set(3,6,4);scene.add(key);
const rimL=new THREE.DirectionalLight(0xE9B872,1.3);rimL.position.set(-4,3,-5);scene.add(rimL);

const V2=(x,y)=>new THREE.Vector2(x,y), V3=(x,y,z)=>new THREE.Vector3(x,y,z);
const cnv=()=>{const c=document.createElement('canvas');c.width=c.height=512;return c};
const mkTex=c=>{const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t};

/* ---------- textures ---------- */
function ceramicTex(){
  const c=cnv(),g=c.getContext('2d');g.fillStyle='#f3e3cb';g.fillRect(0,0,512,512);
  for(let i=0;i<900;i++){g.fillStyle=`rgba(${90+Math.random()*40|0},${60+Math.random()*30|0},40,${.25+Math.random()*.4})`;g.beginPath();g.arc(Math.random()*512,Math.random()*512,.6+Math.random()*1.8,0,6.283);g.fill()}
  const t=mkTex(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,1.4);return t;
}
/* coffee surface texture. plane is 4x4 units; art radius = 1.15 units => scale .575 */
function coffeeTex(k){
  const T=TY[k],c=cnv(),g=c.getContext('2d');
  const gr=g.createRadialGradient(256,256,10,256,256,300);gr.addColorStop(0,T.c[0]);gr.addColorStop(1,T.c[1]);
  g.fillStyle=gr;g.fillRect(0,0,512,512);
  g.translate(256,256);g.scale(.575,.575);
  function heart(s,fill,stroke,lw){
    g.beginPath();g.moveTo(0,s*.62);
    g.bezierCurveTo(-s*.75,s*.1,-s*.72,-s*.5,-s*.22,-s*.5);g.bezierCurveTo(-s*.07,-s*.5,0,-s*.38,0,-s*.28);
    g.bezierCurveTo(0,-s*.38,s*.07,-s*.5,s*.22,-s*.5);g.bezierCurveTo(s*.72,-s*.5,s*.75,s*.1,0,s*.62);g.closePath();
    if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke()}
  }
  g.shadowColor='rgba(255,235,205,.6)';g.shadowBlur=8;
  if(T.art==='heart'){heart(300,'#fbeedb');heart(210,null,T.c[0],11);heart(120,'#fbeedb')}
  if(T.art==='swirl'){g.fillStyle='#f4e2c6';g.beginPath();g.arc(0,0,200,0,6.283);g.fill();g.strokeStyle='rgba(74,36,16,.7)';g.lineWidth=12;for(let r=170;r>20;r-=34){g.beginPath();g.arc(0,0,r,0,6.283);g.stroke()}}
  if(T.art==='dust'){g.fillStyle='#f2dec0';g.beginPath();g.arc(0,0,210,0,6.283);g.fill();g.shadowBlur=0;g.fillStyle='rgba(74,36,16,.75)';for(let i=0;i<320;i++){const a=Math.random()*6.283,r=Math.random()*190;g.beginPath();g.arc(Math.cos(a)*r,Math.sin(a)*r,2+Math.random()*4,0,6.283);g.fill()}}
  if(T.art==='crema'){g.fillStyle='rgba(201,137,63,.6)';g.beginPath();g.arc(0,0,235,0,6.283);g.fill();g.fillStyle='rgba(226,172,98,.5)';g.beginPath();g.arc(0,0,170,0,6.283);g.fill()}
  return mkTex(c);
}

/* ---------- volume tables: how much liquid sits below a tilted plane ---------- */
function buildTable(innerAsc,yBot,yTop){
  const R=y=>{for(let i=1;i<innerAsc.length;i++){if(y<=innerAsc[i].y){const a=innerAsc[i-1],b=innerAsc[i],t=(y-a.y)/((b.y-a.y)||1);return a.x+(b.x-a.x)*t}}return innerAsc[innerAsc.length-1].x};
  const NY=32,NR=14,NT=30,P=[],W=[];
  for(let iy=0;iy<NY;iy++){const y=yBot+(iy+.5)/NY*(yTop-yBot),Ry=R(y)*.985,dy=(yTop-yBot)/NY;
    for(let ir=0;ir<NR;ir++){const r=(ir+.5)/NR*Ry,dr=Ry/NR;
      for(let it=0;it<NT;it++){const th=(it+.5)/NT*6.283185;P.push(r*Math.cos(th),y,r*Math.sin(th));W.push(r*dr*(6.283185/NT)*dy)}}}
  const N=W.length,tables=[];
  for(let k=0;k<=36;k++){
    const phi=k*Math.PI/36,nx=Math.sin(phi),ny=Math.cos(phi),proj=new Float32Array(N);
    for(let i=0;i<N;i++)proj[i]=P[3*i]*nx+P[3*i+1]*ny;
    const idx=Array.from({length:N},(_,i)=>i).sort((a,b)=>proj[a]-proj[b]);
    const sp=new Float32Array(N),cv=new Float32Array(N);let acc=0;
    for(let j=0;j<N;j++){sp[j]=proj[idx[j]];acc+=W[idx[j]];cv[j]=acc}
    tables.push({sp,cv});
  }
  return {tables};
}
function lowerBound(arr,v){let lo=0,hi=arr.length-1;while(lo<hi){const m=(lo+hi)>>1;if(arr[m]<v)lo=m+1;else hi=m}return lo}
const dAtV=(tb,V)=>V<=0?tb.sp[0]:(V>=tb.cv[tb.cv.length-1]?tb.sp[tb.sp.length-1]:tb.sp[lowerBound(tb.cv,V)]);
const vAtD=(tb,d)=>d<=tb.sp[0]?0:(d>=tb.sp[tb.sp.length-1]?tb.cv[tb.cv.length-1]:tb.cv[lowerBound(tb.sp,d)]);
function bins(T,phi){const f=Math.min(35.999,Math.max(0,phi)/(Math.PI/36)),i=Math.floor(f);return [T.tables[i],T.tables[i+1],f-i]}
function dFor(T,phi,V){const [a,b,t]=bins(T,phi);return dAtV(a,V)*(1-t)+dAtV(b,V)*t}
function vFor(T,phi,d){const [a,b,t]=bins(T,phi);return vAtD(a,d)*(1-t)+vAtD(b,d)*t}

/* ---------- stencil cap: shows the flat coffee surface inside the clipped liquid ---------- */
function stencilGroup(geo,plane){
  const g=new THREE.Group();
  const base=new THREE.MeshBasicMaterial({depthWrite:false,depthTest:false,colorWrite:false,stencilWrite:true,stencilFunc:THREE.AlwaysStencilFunc});
  const m0=base.clone();m0.side=THREE.BackSide;m0.clippingPlanes=[plane];m0.stencilFail=m0.stencilZFail=m0.stencilZPass=THREE.IncrementWrapStencilOp;
  const m1=base.clone();m1.side=THREE.FrontSide;m1.clippingPlanes=[plane];m1.stencilFail=m1.stencilZFail=m1.stencilZPass=THREE.DecrementWrapStencilOp;
  const a=new THREE.Mesh(geo,m0),b=new THREE.Mesh(geo,m1);a.renderOrder=b.renderOrder=1;g.add(a,b);return g;
}

/* ---------- root pivot (cup rotates around its middle) ---------- */
const root=new THREE.Group();scene.add(root);

/* ---------- hot cup ---------- */
const ceramic=new THREE.MeshPhysicalMaterial({map:ceramicTex(),roughness:.38,clearcoat:.7,clearcoatRoughness:.15,side:THREE.DoubleSide});
const outer=new THREE.SplineCurve([V2(0,0),V2(.55,0),V2(.68,.05),V2(.95,.3),V2(1.15,.75),V2(1.26,1.2),V2(1.3,1.55)]).getPoints(36);
const rimPts=[V2(1.29,1.58),V2(1.25,1.61),V2(1.21,1.59),V2(1.19,1.55)];
const inner=new THREE.SplineCurve([V2(1.19,1.55),V2(1.16,1.2),V2(1.04,.72),V2(.78,.34),V2(.5,.18),V2(0,.16)]).getPoints(30);
const cup=new THREE.Mesh(new THREE.LatheGeometry([...outer,...rimPts,...inner],96),ceramic);
const hc=new THREE.CatmullRomCurve3([V3(1.2,1.3,0),V3(1.8,1.38,0),V3(2.15,1,0),V3(2,.5,0),V3(1.45,.34,0),V3(1,.5,0)]);
const handle=new THREE.Mesh(new THREE.TubeGeometry(hc,60,.115,16,false),ceramic);
const hotG=new THREE.Group();hotG.position.set(0,-.8,0);hotG.add(cup,handle);root.add(hotG);

/* ---------- cold glass ---------- */
const gOuter=new THREE.SplineCurve([V2(0,0),V2(.74,0),V2(.8,.08),V2(.9,1.2),V2(1,2.3)]).getPoints(20);
const gInner=new THREE.SplineCurve([V2(.96,2.3),V2(.88,1.2),V2(.76,.2),V2(0,.18)]).getPoints(20);
const glass=new THREE.Mesh(new THREE.LatheGeometry([...gOuter,V2(.99,2.32),...gInner],64),
  new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.22,roughness:.03,clearcoat:1,side:THREE.DoubleSide,depthWrite:false}));
const iceMat=new THREE.MeshPhysicalMaterial({color:0xdff6ff,transparent:true,opacity:.55,roughness:.08,clearcoat:1});
const ice=new THREE.Group();
[[-.25,1.98,.1,.4,.3],[.28,2.05,-.15,-.5,.6],[0,1.8,.35,.2,-.4]].forEach(p=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.42,.42,.42),iceMat);m.position.set(p[0],p[1],p[2]);m.rotation.set(p[3],p[4],p[3]);ice.add(m)});
const straw=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2.7,16),new THREE.MeshStandardMaterial({color:0xE9B872,roughness:.4}));
straw.position.set(.3,1.7,0);straw.rotation.z=-.18;
const coldG=new THREE.Group();coldG.position.set(0,-1.15,0);coldG.add(glass,ice,straw);root.add(coldG);

/* ---------- drinks (liquid state) ---------- */
function makeDrink(o){
  const bodyGeo=new THREE.LatheGeometry([V2(0,o.yTop),...o.innerDesc.map(p=>V2(p.x*.99,p.y))],64);
  const clip=new THREE.Plane(V3(0,-1,0),1);
  const T=buildTable(o.innerDesc.slice().reverse(),o.yBot,o.yTop);
  const st=stencilGroup(bodyGeo,clip);o.group.add(st);
  let visBody=null;
  if(o.visibleBody){visBody=new THREE.Mesh(bodyGeo,new THREE.MeshPhysicalMaterial({color:0x4a220d,roughness:.2,side:THREE.DoubleSide,clippingPlanes:[clip]}));o.group.add(visBody)}
  const capMat=new THREE.MeshStandardMaterial({roughness:.2,metalness:0,stencilWrite:true,stencilRef:0,stencilFunc:THREE.NotEqualStencilFunc,stencilFail:THREE.ReplaceStencilOp,stencilZFail:THREE.ReplaceStencilOp,stencilZPass:THREE.ReplaceStencilOp});
  const capMesh=new THREE.Mesh(new THREE.PlaneGeometry(4,4),capMat);capMesh.rotation.x=-Math.PI/2;capMesh.renderOrder=1.1;
  capMesh.onAfterRender=r=>r.clearStencil();
  const capG=new THREE.Group();capG.add(capMesh);scene.add(capG);
  const D={...o,T,clip,st,visBody,capMat,capG,V:0,V0:vFor(T,0,o.fill),ds:o.fill};
  D.V=D.V0;return D;
}
const hotD=makeDrink({group:hotG,c:V3(0,.8,0),yBot:.16,yTop:1.55,rLip:1.19,fill:1.3,innerDesc:inner,low:[[0,.68],[1.6,1.3]],steam:true,visibleBody:false});
const coldD=makeDrink({group:coldG,c:V3(0,1.15,0),yBot:.18,yTop:2.3,rLip:.96,fill:1.9,innerDesc:gInner,low:[[0,.8],[2.3,1.0]],steam:false,visibleBody:true});

/* ---------- ground shadow & puddle ---------- */
const sc=cnv();sc.width=sc.height=256;const sg=sc.getContext('2d');
const sgr=sg.createRadialGradient(128,128,10,128,128,128);sgr.addColorStop(0,'rgba(0,0,0,.65)');sgr.addColorStop(1,'rgba(0,0,0,0)');sg.fillStyle=sgr;sg.fillRect(0,0,256,256);
const shadow=new THREE.Mesh(new THREE.PlaneGeometry(6,6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));
shadow.rotation.x=-Math.PI/2;shadow.position.set(.3,-.01,0);scene.add(shadow);
const puddle=new THREE.Mesh(new THREE.CircleGeometry(1,48),new THREE.MeshStandardMaterial({color:0x2a1208,roughness:.05,transparent:true,opacity:.93,depthWrite:false,envMapIntensity:1.6}));
puddle.rotation.x=-Math.PI/2;puddle.position.y=.015;puddle.visible=false;scene.add(puddle);
let puddleVol=0,pTX=0,pTZ=0;

/* ---------- droplets (spilled coffee) ---------- */
const ND=280;
const dropMesh=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshStandardMaterial({color:0x3a1a0a,roughness:.12}),ND);
dropMesh.frustumCulled=false;scene.add(dropMesh);
const dPos=new Float32Array(ND*3),dVel=new Float32Array(ND*3),dVol=new Float32Array(ND),dSize=new Float32Array(ND),dAlive=new Uint8Array(ND);
let dNext=0;const dummy=new THREE.Object3D();
for(let i=0;i<ND;i++){dummy.scale.setScalar(0);dummy.updateMatrix();dropMesh.setMatrixAt(i,dummy.matrix)}

/* ---------- steam ---------- */
const stc=document.createElement('canvas');stc.width=stc.height=128;const stg=stc.getContext('2d');
const stgr=stg.createRadialGradient(64,64,4,64,64,62);stgr.addColorStop(0,'rgba(255,248,236,.9)');stgr.addColorStop(.5,'rgba(255,244,228,.35)');stgr.addColorStop(1,'rgba(255,244,228,0)');
stg.fillStyle=stgr;stg.fillRect(0,0,128,128);
const steamTex=new THREE.CanvasTexture(stc);
const steam=[];
for(let i=0;i<36;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:steamTex,transparent:true,opacity:0,depthWrite:false}));s.visible=false;s.userData={age:0,life:1,rise:.6,ph:0,alive:false};scene.add(s);steam.push(s)}
let steamAcc=0;

/* ---------- state & interaction ---------- */
let D=hotD,dragging=false,px=0,py=0,lastInt=-1e9,yawKeep=0,spilled=0;
const Y=V3(0,1,0),X=V3(1,0,0),qa=new THREE.Quaternion(),qb=new THREE.Quaternion(),qt=new THREE.Quaternion(),qi=new THREE.Quaternion();
const nL=V3(0,1,0),ex=V3(1,0,0),tmp=V3(0,0,0),axw=V3(0,1,0);
el.style.cursor='grab';
el.addEventListener('pointerdown',e=>{dragging=true;px=e.clientX;py=e.clientY;el.setPointerCapture(e.pointerId);lastInt=performance.now();el.style.cursor='grabbing'});
el.addEventListener('pointermove',e=>{
  if(!dragging)return;
  const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;
  qa.setFromAxisAngle(Y,dx*.011);qb.setFromAxisAngle(X,dy*.011);
  root.quaternion.premultiply(qa).premultiply(qb);lastInt=performance.now();
});
['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>{if(dragging){dragging=false;lastInt=performance.now();el.style.cursor='grab'}}));

function twistYaw(){ex.set(1,0,0).applyQuaternion(root.quaternion);if(Math.hypot(ex.x,ex.z)>.2)yawKeep=Math.atan2(-ex.z,ex.x);return yawKeep}

function setType(k){
  const isCold=k==='cold';
  D=isCold?coldD:hotD;
  hotG.visible=!isCold;coldG.visible=isCold;
  hotD.st.visible=!isCold;coldD.st.visible=isCold;
  hotD.capG.visible=false;coldD.capG.visible=false;
  D.capMat.map=coffeeTex(isCold?'cold':k);D.capMat.needsUpdate=true;
  D.V=D.V0;D.ds=D.fill;
  for(let i=0;i<ND;i++)dAlive[i]=0;puddleVol=0;puddle.visible=false;
  root.scale.setScalar(.8);
}

function spawn(dv){
  const n=Math.min(40,Math.max(1,Math.round(dv*70)));
  const hLen=Math.hypot(nL.x,nL.z);
  for(let i=0;i<n;i++){
    let dx,dz;
    if(hLen>.25){dx=-nL.x/hLen;dz=-nL.z/hLen;const j=(Math.random()-.5)*.5*(1-Math.min(1,hLen));const c=Math.cos(j),s=Math.sin(j);const ox=dx*c-dz*s;dz=dx*s+dz*c;dx=ox}
    else{const a=Math.random()*6.283;dx=Math.cos(a);dz=Math.sin(a)}
    tmp.set(D.rLip*dx,D.yTop,D.rLip*dz);
    D.group.localToWorld(tmp);
    const o=dNext;dNext=(dNext+1)%ND;
    dPos[3*o]=tmp.x;dPos[3*o+1]=tmp.y;dPos[3*o+2]=tmp.z;
    const ox=tmp.x-root.position.x,oz=tmp.z-root.position.z,l=Math.hypot(ox,oz)||1;
    dVel[3*o]=ox/l*(.5+Math.random()*.6)+(Math.random()-.5)*.3;
    dVel[3*o+1]=-Math.random()*.6;
    dVel[3*o+2]=oz/l*(.5+Math.random()*.6)+(Math.random()-.5)*.3;
    dVol[o]=dv/n;dSize[o]=.035+Math.random()*.035;dAlive[o]=1;
  }
}

function fit(){const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
box.innerHTML='';box.appendChild(el);
new ResizeObserver(fit).observe(box);fit();

let last=performance.now();
function frame(now){
  requestAnimationFrame(frame);
  const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!box.clientWidth)return;
  const idle=(now-lastInt)/1000;

  /* cup orientation */
  if(!dragging&&idle>2.2){
    qt.setFromAxisAngle(Y,twistYaw());
    root.quaternion.slerp(qt,1-Math.exp(-dt*3.2));
    qi.copy(root.quaternion);
    ex.set(0,1,0).applyQuaternion(qi);
    if(ex.y>.985){qa.setFromAxisAngle(Y,dt*.55);root.quaternion.premultiply(qa)}
  }
  root.quaternion.normalize();
  const s0=root.scale.x;root.scale.setScalar(s0+(1-s0)*.12);

  qi.copy(root.quaternion).invert();
  nL.set(0,1,0).applyQuaternion(qi);
  const ny=Math.max(-1,Math.min(1,nL.y)),phi=Math.acos(ny),hLen=Math.hypot(nL.x,nL.z);

  /* keep cup above ground */
  let minRel=1e9;D.low.forEach(p=>{minRel=Math.min(minRel,(p[0]-D.c.y)*ny-p[1]*hLen)});
  root.position.y=.02-minRel*root.scale.x;
  root.updateMatrixWorld(true);

  /* liquid physics */
  const dcap=D.yTop*ny-D.rLip*hLen;
  const capV=vFor(D.T,phi,dcap);
  if(D.V>capV+1e-4){
    const ex_=D.V-capV,dv=Math.min(ex_,ex_*(1-Math.exp(-dt*6))+dt*.12);
    spawn(dv);D.V-=dv;
  }
  if(!dragging&&idle>2.2&&phi<.25&&D.V<D.V0){const r=dt*1.2;D.V=Math.min(D.V0,D.V+r);puddleVol=Math.max(0,puddleVol-r)}
  let d=dFor(D.T,phi,D.V);d=Math.min(d,dcap);
  D.ds+=(d-D.ds)*(1-Math.exp(-dt*18));
  const level=root.position.y+(D.ds-D.c.y*ny)*root.scale.x;
  D.clip.constant=level;
  const show=D.V>.04;
  D.st.visible=show;if(D.visBody)D.visBody.visible=show;
  D.capG.visible=show;
  axw.set(0,1,0).applyQuaternion(root.quaternion);
  let cx=root.position.x,cz=root.position.z;
  if(Math.abs(axw.y)>.2){const tt=Math.max(-3,Math.min(3,(level-root.position.y)/axw.y));cx+=axw.x*tt;cz+=axw.z*tt}
  D.capG.position.set(cx,level,cz);
  D.capG.rotation.y=twistYaw();

  /* droplets */
  for(let i=0;i<ND;i++){
    if(dAlive[i]){
      dVel[3*i+1]-=14*dt;
      dPos[3*i]+=dVel[3*i]*dt;dPos[3*i+1]+=dVel[3*i+1]*dt;dPos[3*i+2]+=dVel[3*i+2]*dt;
      if(dPos[3*i+1]<.03){dAlive[i]=0;puddleVol+=dVol[i];pTX=dPos[3*i];pTZ=dPos[3*i+2]}
    }
    if(dAlive[i]){dummy.position.set(dPos[3*i],dPos[3*i+1],dPos[3*i+2]);dummy.scale.set(dSize[i],dSize[i]*(1+Math.min(1.6,Math.abs(dVel[3*i+1])*.18)),dSize[i])}
    else dummy.scale.setScalar(0);
    dummy.updateMatrix();dropMesh.setMatrixAt(i,dummy.matrix);
  }
  dropMesh.instanceMatrix.needsUpdate=true;
  if(puddleVol>.02){puddle.visible=true;const r=Math.min(2.8,Math.sqrt(puddleVol)*.95);puddle.scale.set(r,r,1);puddle.position.x+=(pTX-puddle.position.x)*.08;puddle.position.z+=(pTZ-puddle.position.z)*.08}
  else puddle.visible=false;

  /* steam */
  const inten=D.steam?Math.min(1,D.V/D.V0):0;
  steamAcc+=dt*13*inten;
  while(steamAcc>=1){
    steamAcc-=1;const s=steam.find(q=>!q.userData.alive);if(!s)break;
    const u=s.userData;u.alive=true;u.age=0;u.life=2.4+Math.random()*1.4;u.rise=.45+Math.random()*.4;u.ph=Math.random()*6.28;
    const a=Math.random()*6.283,r=Math.random()*.55;
    s.position.set(root.position.x+Math.cos(a)*r,level+.08,root.position.z+Math.sin(a)*r);s.visible=true;
  }
  steam.forEach(s=>{
    const u=s.userData;if(!u.alive)return;
    u.age+=dt;const t=u.age/u.life;
    if(t>=1){u.alive=false;s.visible=false;return}
    s.position.y+=u.rise*dt;s.position.x+=Math.sin(u.age*1.7+u.ph)*.18*dt;s.position.z+=Math.cos(u.age*1.3+u.ph)*.12*dt;
    s.scale.setScalar(.5+t*1.6);
    s.material.opacity=.32*Math.sin(Math.PI*t)*Math.max(.3,inten);
  });

  shadow.material.opacity=Math.max(.25,1-(root.position.y-.82)*.5);
  renderer.render(scene,camera);
}
window.cup3d={set:setType};
setType((document.querySelector('.mini.on')||{dataset:{k:'latte'}}).dataset.k);
requestAnimationFrame(frame);
}catch(e){console.warn('3D cup load nahi hua, SVG cup dikh raha hai',e)}
})();
