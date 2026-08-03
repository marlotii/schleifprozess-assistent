(function(){
  'use strict';
  const mq=window.matchMedia&&window.matchMedia('(max-width:760px), (max-width:900px) and (pointer:coarse)');
  if(!mq||!mq.matches)return;
  const byId=id=>document.getElementById(id);

  const numeric=new Map([
    ['machinePower',['machine','power']],['machineRpm',['machine','maxRpm']],['machineDia',['machine','maxDia']],['machineWidth',['machine','maxWidth']],
    ['wheelDia',['process','wheelDia']],['wheelWidth',['process','wheelWidth']],['activeWidth',['process','activeWidth']],['wheelRpm',['process','wheelRpm']],['wheelSpeed',['process','wheelSpeed']],
    ['matHardness',['material','hardness']],['kssDensity',['kss','densityUse']],['kssConcentration',['kss','concentration']],['kssVisc',['kss','visc']],
    ['nozzleCd',['kss','cd']],['lineLoss',['kss','lineLoss']],['nozzleAngle',['kss','angle']],['nozzleDistance',['kss','distance']],
    ['nozzleCount',['kss','count']],['nozzleDia',['kss','diameter']],['nozzleWidth',['kss','width']],['nozzleHeight',['kss','height']],
    ['nozzleOuter',['kss','outerDiameter']],['nozzleInner',['kss','innerDiameter']],['nozzleArea',['kss','totalArea']]
  ]);
  const text=new Map([
    ['processType',['process','type']],['processStage',['process','stage']],['processAbrasive',['process','abrasive']],['processBond',['process','bond']],
    ['wheelMaker',['process','wheelMaker']],['wheelProduct',['process','wheelProduct']],['grit',['process','grit']],['grade',['process','grade']],['structure',['process','structure']],
    ['matName',['material','name']],['matNumber',['material','number']],['matIsoEdit',['material','iso']],['matFamily',['material','family']],['matUnit',['material','unit']],
    ['matRange',['material','range']],['matThermal',['material','thermal']],['matAbrasive',['material','abrasive']],['matBond',['material','bond']],
    ['matVcRange',['material','vcRange']],['matQpRange',['material','qpRange']],['matCoolant',['material','coolant']],['matHint',['material','hint']],
    ['kssArticle',['kss','article']],['kssBasis',['kss','basis']],['nozzleType',['kss','nozzleType']]
  ]);

  function assign(path,value){
    if(typeof state==='undefined'||!state||!state.setup)return;
    const [group,key]=path;
    if(state.setup[group])state.setup[group][key]=value;
  }
  function captureElement(el){
    if(!el||!el.id||typeof state==='undefined')return;
    if(numeric.has(el.id)){
      const n=Number(el.value);
      if(Number.isFinite(n))assign(numeric.get(el.id),n);
      return;
    }
    if(text.has(el.id)){assign(text.get(el.id),el.value);return;}
    if(el.id==='tangential')assign(['kss','tangential'],el.value==='true');
  }
  function captureVisibleSetup(){
    const body=byId('setupBody');
    if(!body)return;
    body.querySelectorAll('input,select,textarea').forEach(captureElement);
    if(typeof captureMaterialFields==='function')captureMaterialFields();
  }
  function persist(){
    captureVisibleSetup();
    if(typeof saveState==='function')saveState();
  }
  function blurActive(){
    const active=document.activeElement;
    if(active&&active!==document.body&&typeof active.blur==='function')active.blur();
  }
  function resetScroll(id){
    requestAnimationFrame(()=>{const el=byId(id);if(el)el.scrollTop=0;});
  }
  function syncViewport(){
    const vv=window.visualViewport;
    const h=vv?vv.height:window.innerHeight;
    document.documentElement.style.setProperty('--mobile-vh',Math.round(h)+'px');
  }
  function syncOverlayState(){
    const open=!!document.querySelector('.overlay.open,.detail-modal.open');
    document.body.classList.toggle('mobile-overlay-open',open);
  }

  syncViewport();syncOverlayState();
  window.addEventListener('resize',syncViewport,{passive:true});
  if(window.visualViewport){
    visualViewport.addEventListener('resize',syncViewport,{passive:true});
    visualViewport.addEventListener('scroll',syncViewport,{passive:true});
  }

  const observer=new MutationObserver(mutations=>{
    let overlayChanged=false;
    for(const m of mutations){
      if(m.type==='attributes'&&m.attributeName==='class'&&m.target.matches?.('.overlay,.detail-modal'))overlayChanged=true;
    }
    if(overlayChanged){
      syncOverlayState();syncViewport();
      if(byId('setupOverlay')?.classList.contains('open'))resetScroll('setupBody');
      if(byId('moduleOverlay')?.classList.contains('open'))resetScroll('moduleBody');
      if(byId('detailModal')?.classList.contains('open'))resetScroll('detailBody');
    }
  });
  document.querySelectorAll('.overlay,.detail-modal').forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class']}));

  document.addEventListener('input',e=>{
    if(e.target?.closest('#setupOverlay'))captureElement(e.target);
  },true);
  document.addEventListener('change',e=>{
    if(e.target?.closest('#setupOverlay'))captureElement(e.target);
  },true);
  document.addEventListener('focusout',e=>{
    if(e.target?.closest('#setupOverlay'))captureElement(e.target);
  },true);

  document.addEventListener('click',e=>{
    const info=e.target?.closest?.('button.info');
    document.querySelectorAll('button.info.tip-open').forEach(b=>{if(b!==info)b.classList.remove('tip-open');});
    if(info){info.classList.toggle('tip-open');return;}

    const target=e.target?.closest?.('button,[data-setup-tab]');
    if(!target)return;
    if(target.closest('#setupOverlay')){
      if(target.matches('[data-setup-tab]')){
        blurActive();persist();resetScroll('setupBody');
      }else if(target.id==='setupSave'){
        blurActive();persist();
      }else if(target.id==='setupCancel'){
        blurActive();
      }
    }
    if(target.matches('[data-module]'))resetScroll('moduleBody');
  },true);

  document.addEventListener('touchend',e=>{
    const save=e.target?.closest?.('#setupSave');
    if(save){blurActive();persist();}
  },{capture:true,passive:true});

  document.addEventListener('focusin',e=>{
    const field=e.target;
    if(!field?.matches?.('#setupBody input,#setupBody select,#setupBody textarea,#moduleBody input,#moduleBody select,#moduleBody textarea'))return;
    setTimeout(()=>{
      const vv=window.visualViewport;
      const limit=vv?vv.height:window.innerHeight;
      const r=field.getBoundingClientRect();
      if(r.bottom>limit-18||r.top<70)field.scrollIntoView({block:'center',behavior:'smooth'});
    },260);
  },true);

  window.addEventListener('beforeunload',persist);
})();
