// Public review flow prototype (demo data). Theme key/default come from <body data-key data-default>.
(function(){
  const b=document.body, r=document.documentElement;
  let t=null; try{t=localStorage.getItem(b.dataset.key)}catch(e){}
  r.dataset.theme=t||b.dataset.default;
  const fab=document.querySelector('.theme-fab');
  if(fab) fab.addEventListener('click',()=>{const n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem(b.dataset.key,n)}catch(e){}});

  document.addEventListener('change',()=>{const e=document.getElementById('err');if(e)e.textContent='';}); // clear-err
  /* ---- step form ---- */
  const steps=[...document.querySelectorAll('.step')];
  if(steps.length){
    let i=0; const total=steps.length;
    const lab=document.getElementById('pgl'), pct=document.getElementById('pgp'), fill=document.getElementById('pgf'),
          next=document.getElementById('next'), back=document.getElementById('back'), err=document.getElementById('err');
    const show=()=>{steps.forEach((s,k)=>s.hidden=k!==i); const p=Math.round((i+1)/total*100);
      lab.innerHTML=`<b>Step ${i+1}</b> of ${total}`; pct.textContent=p+'%'; fill.style.width=p+'%';
      back.style.visibility=i?'visible':'hidden'; next.textContent=i===total-1?'Generate review':'Next'; err.textContent='';};
    next.addEventListener('click',()=>{const s=steps[i];
      if(s.dataset.req && !s.querySelector('input:checked')){err.textContent='Please choose an option to continue.';return;}
      if(i<total-1){i++;show();} else {next.innerHTML='<svg class="i spin"><use href="#i-refresh"/></svg> Generating…';setTimeout(()=>location.href='review-preview.html',700);} });
    back.addEventListener('click',()=>{if(i>0){i--;show();}});
    show();
  }

  /* ---- review preview ---- */
  const ta=document.getElementById('review');
  if(ta){
    const alts=[ta.value,
      "Northwind Studio redesigned our website and it was a smooth experience from start to finish. First concepts arrived within two days, communication was clear, and launch happened exactly on schedule.",
      "Great partner for our website project. The Northwind team understood our goals quickly, kept us updated every week and delivered a polished result on time. We would hire them again."];
    let k=0;
    const edit=document.getElementById('edit'); edit.addEventListener('click',()=>{const on=ta.hasAttribute('readonly');
      if(on){ta.removeAttribute('readonly');ta.focus();}else ta.setAttribute('readonly','');edit.setAttribute('aria-pressed',on);});
    const regen=document.getElementById('regen'); regen.addEventListener('click',()=>{const ic=regen.querySelector('svg');ic.classList.add('spin');
      setTimeout(()=>{k=(k+1)%alts.length;ta.value=alts[k];ic.classList.remove('spin');},600);});
    const bg=document.getElementById('copied');
    const open=()=>{bg.classList.add('open');document.getElementById('gtext').textContent=ta.value.slice(0,150)+(ta.value.length>150?'…':'');bg.querySelector('.x').focus();};
    const close=()=>bg.classList.remove('open');
    document.getElementById('google').addEventListener('click',()=>{try{navigator.clipboard.writeText(ta.value).catch(()=>{})}catch(e){};open();});
    bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('.x'))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    if(location.hash==='#copied') open();
    addEventListener('hashchange',()=>location.hash==='#copied'?open():close());
  }
})();
