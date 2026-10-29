// Shared shell for the refresh prototype: icon sprite, top bar, theme toggle. Demo only.
(function(){
  const I = {
    logo:'<path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M8 10h8M8 13h5"/>',
    home:'<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    building:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
    pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    chat:'<path d="M4 5h16v11H8l-4 4z"/>',
    star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    form:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    plus:'<path d="M12 5v14M5 12h14"/>', dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>', drag:'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
    radio:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>', list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    check:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>', trash:'<path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', text:'<path d="M5 6h14M12 6v13"/>',
    textarea:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/>', select:'<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',
    cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', moon:'<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>',
    chevron:'<path d="M6 9l6 6 6-6"/>', sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
  };
  const sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    Object.entries(I).map(([k,v])=>`<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('') + '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  (function(){let t=null;try{t=localStorage.getItem('opiny-theme-v2')}catch(e){}document.documentElement.dataset.theme=t||'dark';})();
  const cur = document.body.dataset.nav;
  const ic = n => `<svg class="i"><use href="#i-${n}"/></svg>`;
  const link = (id,href,icon,label) => `<a href="${href}" ${cur===id?'aria-current="page"':''}>${ic(icon)}<span>${label}</span></a>`;
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="topbar">
    <a class="brand" href="dashboard.html"><span class="mark"><svg class="i"><use href="#i-logo"/></svg></span><span class="word">Opiny</span></a>
    <nav class="mainnav" aria-label="Main">
      ${link('dashboard','dashboard.html','home','Dashboard')}
      ${link('company','dashboard.html','building','Company')}
      ${link('locations','locations.html','pin','Locations')}
    </nav>
    <span class="spacer"></span>
    <button class="icon-btn" id="theme" title="Toggle light / dark" aria-label="Toggle theme">${ic('moon')}</button>
    <span class="avatar" aria-label="Account">DM</span>
  </header>`);
  document.getElementById('theme').addEventListener('click',()=>{
    const r=document.documentElement; const n = r.dataset.theme==='dark' ? 'light' : 'dark';
    r.dataset.theme = n; try{localStorage.setItem('opiny-theme-v2', n)}catch(e){}
  });
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-more]'); if(b){const r=b.closest('.review'); r.classList.toggle('open'); b.textContent=r.classList.contains('open')?'Show less':'Show more';}
    const c=e.target.closest('.chip'); if(c){c.parentElement.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed','false')); c.setAttribute('aria-pressed','true');}
  });
})();
