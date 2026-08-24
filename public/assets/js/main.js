(function(){
  const NS='http://www.w3.org/2000/svg';
  const el=(t,a)=>{const n=document.createElementNS(NS,t);for(const k in a)n.setAttribute(k,a[k]);return n;};
  const pt=(r,deg)=>{const a=(deg-90)*Math.PI/180;return [300+r*Math.cos(a),300+r*Math.sin(a)];};

  /* ---------- natal chart wheel ---------- */
  const houses=document.getElementById('g-houses');
  const zodiac=document.getElementById('g-zodiac');
  const aspects=document.getElementById('g-aspects');
  const centre=document.getElementById('g-centre');

  // house spokes
  for(let i=0;i<12;i++){
    const [x1,y1]=pt(66,i*30),[x2,y2]=pt(212,i*30);
    houses.appendChild(el('line',{x1,y1,x2,y2,stroke:'rgba(216,178,106,.16)','stroke-width':1}));
  }
  // zodiac ring: sector dividers + degree ticks + glyphs
  for(let i=0;i<12;i++){
    const [x1,y1]=pt(212,i*30),[x2,y2]=pt(254,i*30);
    zodiac.appendChild(el('line',{x1,y1,x2,y2,stroke:'#d8b26a','stroke-width':1,opacity:.7}));
  }
  for(let d=0;d<360;d+=5){
    if(d%30===0)continue;
    const [x1,y1]=pt(254,d),[x2,y2]=pt(248,d);
    zodiac.appendChild(el('line',{x1,y1,x2,y2,stroke:'rgba(216,178,106,.45)','stroke-width':.8}));
  }
  const glyphs=['\u2648','\u2649','\u264A','\u264B','\u264C','\u264D','\u264E','\u264F','\u2650','\u2651','\u2652','\u2653'];
  glyphs.forEach((g,i)=>{
    const [x,y]=pt(233,i*30+15);
    const t=el('text',{x,y,fill:'#d8b26a','font-size':20,'text-anchor':'middle','dominant-baseline':'central'});
    t.textContent=g;
    zodiac.appendChild(t);
  });
  // aspect web (stylised planetary placements)
  const planets=[8,44,96,142,199,247,291,338];
  const links=[[0,3],[0,5],[1,4],[1,6],[2,5],[2,6],[3,7],[4,7]];
  links.forEach(([a,b])=>{
    const [x1,y1]=pt(168,planets[a]),[x2,y2]=pt(168,planets[b]);
    aspects.appendChild(el('line',{x1,y1,x2,y2,stroke:'rgba(216,178,106,.3)','stroke-width':.9}));
  });
  planets.forEach((d,i)=>{
    const [cx,cy]=pt(174,d);
    aspects.appendChild(el('circle',{cx,cy,r:3,fill:i%3===2?'#cf8f96':'#f2dda8'}));
  });
  // centre star
  const star4=(cx,cy,ro,ri,rot)=>{
    let d='';
    for(let i=0;i<8;i++){
      const r=i%2===0?ro:ri, a=(i*45+rot-90)*Math.PI/180;
      d+=(i===0?'M':'L')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);
    }
    return d+'Z';
  };
  centre.appendChild(el('path',{d:star4(300,300,15,4.5,0),fill:'#f2dda8'}));
  centre.appendChild(el('path',{d:star4(300,300,8,2.5,45),fill:'#d8b26a',opacity:.8}));

  /* ---------- starfields ---------- */
  function scatter(id,n){
    const box=document.getElementById(id);
    if(!box)return;
    for(let i=0;i<n;i++){
      const s=document.createElement('span');
      s.className='star-dot';
      const size=(Math.random()*1.8+.8).toFixed(1);
      s.style.cssText='left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;width:'+size+'px;height:'+size+'px;--tw:'+(3+Math.random()*4).toFixed(1)+'s;--td:'+(Math.random()*6).toFixed(1)+'s;';
      box.appendChild(s);
    }
  }
  scatter('stars',110);
  scatter('stars2',45);

  /* ---------- moon phase divider ---------- */
  const phases=document.getElementById('phases');
  for(let i=0;i<8;i++){
    const f=i/8, r=11, cx=13, cy=13;
    const svg=el('svg',{width:26,height:26,viewBox:'0 0 26 26'});
    svg.appendChild(el('circle',{cx,cy,r,fill:'none',stroke:'rgba(216,178,106,.5)','stroke-width':1}));
    if(f>0.01){
      const w=Math.cos(2*Math.PI*f)*r, aw=Math.abs(w).toFixed(2);
      let d;
      if(f<=0.5){
        d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 1 '+cx+' '+(cy+r)+' A '+aw+' '+r+' 0 0 '+(w>0?0:1)+' '+cx+' '+(cy-r)+' Z';
      }else{
        d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 0 '+cx+' '+(cy+r)+' A '+aw+' '+r+' 0 0 '+(w>0?1:0)+' '+cx+' '+(cy-r)+' Z';
      }
      svg.appendChild(el('path',{d,fill:f===0.5?'#f2dda8':'#d8b26a',opacity:f===0.5?1:.85}));
    }
    phases.appendChild(svg);
  }

  /* ---------- scroll reveals ---------- */
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(n=>io.observe(n));

  /* ---------- Big 3 form (wire to email provider on launch) ---------- */
  const form=document.getElementById('guideForm');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const email=document.getElementById('email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      document.getElementById('email').focus();
      return;
    }
    form.style.display='none';
    document.getElementById('guideDone').style.display='block';
  });
})();
