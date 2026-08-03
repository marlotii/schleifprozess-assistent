/* iPhone setup reliability patch v4. No desktop behavior changes. */
(function () {
  'use strict';
  if (!window.matchMedia || !window.matchMedia('(max-width: 760px)').matches) return;

  const byId = id => document.getElementById(id);
  const numeric = new Map([
    ['machinePower', ['machine', 'power']],
    ['machineRpm', ['machine', 'maxRpm']],
    ['machineDia', ['machine', 'maxDia']],
    ['machineWidth', ['machine', 'maxWidth']],
    ['wheelDia', ['process', 'wheelDia']],
    ['wheelWidth', ['process', 'wheelWidth']],
    ['activeWidth', ['process', 'activeWidth']],
    ['wheelRpm', ['process', 'wheelRpm']],
    ['wheelSpeed', ['process', 'wheelSpeed']],
    ['matHardness', ['material', 'hardness']],
    ['kssDensity', ['kss', 'densityUse']],
    ['kssConcentration', ['kss', 'concentration']],
    ['kssVisc', ['kss', 'visc']],
    ['nozzleCd', ['kss', 'cd']],
    ['lineLoss', ['kss', 'lineLoss']],
    ['nozzleAngle', ['kss', 'angle']],
    ['nozzleDistance', ['kss', 'distance']],
    ['nozzleCount', ['kss', 'count']],
    ['nozzleDia', ['kss', 'diameter']],
    ['nozzleWidth', ['kss', 'width']],
    ['nozzleHeight', ['kss', 'height']],
    ['nozzleOuter', ['kss', 'outerDiameter']],
    ['nozzleInner', ['kss', 'innerDiameter']],
    ['nozzleArea', ['kss', 'totalArea']]
  ]);
  const text = new Map([
    ['processType', ['process', 'type']],
    ['processStage', ['process', 'stage']],
    ['processAbrasive', ['process', 'abrasive']],
    ['processBond', ['process', 'bond']],
    ['wheelMaker', ['process', 'wheelMaker']],
    ['wheelProduct', ['process', 'wheelProduct']],
    ['grit', ['process', 'grit']],
    ['grade', ['process', 'grade']],
    ['structure', ['process', 'structure']],
    ['matName', ['material', 'name']],
    ['matNumber', ['material', 'number']],
    ['matIsoEdit', ['material', 'iso']],
    ['matFamily', ['material', 'family']],
    ['matUnit', ['material', 'unit']],
    ['matRange', ['material', 'range']],
    ['matThermal', ['material', 'thermal']],
    ['matAbrasive', ['material', 'abrasive']],
    ['matBond', ['material', 'bond']],
    ['matVcRange', ['material', 'vcRange']],
    ['matQpRange', ['material', 'qpRange']],
    ['matCoolant', ['material', 'coolant']],
    ['matHint', ['material', 'hint']],
    ['kssArticle', ['kss', 'article']],
    ['kssBasis', ['kss', 'basis']],
    ['nozzleType', ['kss', 'nozzleType']]
  ]);

  function assign(path, value) {
    if (typeof state === 'undefined' || !state || !state.setup) return;
    const [group, key] = path;
    if (!state.setup[group]) return;
    state.setup[group][key] = value;
  }

  function captureElement(el) {
    if (!el || !el.id || typeof state === 'undefined') return;
    if (numeric.has(el.id)) {
      const n = Number(el.value);
      if (Number.isFinite(n)) assign(numeric.get(el.id), n);
      return;
    }
    if (text.has(el.id)) {
      assign(text.get(el.id), el.value);
      return;
    }
    if (el.id === 'tangential') assign(['kss', 'tangential'], el.value === 'true');
  }

  function captureVisibleSetup() {
    const body = byId('setupBody');
    if (!body) return;
    body.querySelectorAll('input, select, textarea').forEach(captureElement);
    if (typeof captureMaterialFields === 'function') captureMaterialFields();
  }

  function persist() {
    captureVisibleSetup();
    if (typeof saveState === 'function') saveState();
  }

  document.addEventListener('input', event => {
    if (event.target && event.target.closest('#setupOverlay')) captureElement(event.target);
  }, true);
  document.addEventListener('change', event => {
    if (event.target && event.target.closest('#setupOverlay')) captureElement(event.target);
  }, true);
  document.addEventListener('focusout', event => {
    if (event.target && event.target.closest('#setupOverlay')) captureElement(event.target);
  }, true);
  document.addEventListener('click', event => {
    const target = event.target && event.target.closest ? event.target.closest('button,[data-setup-tab]') : null;
    if (!target || !target.closest('#setupOverlay')) return;
    if (target.matches('[data-setup-tab]') || target.id === 'setupSave') persist();
  }, true);
  document.addEventListener('touchend', event => {
    const target = event.target && event.target.closest ? event.target.closest('#setupSave') : null;
    if (target) persist();
  }, {capture: true, passive: true});
})();
