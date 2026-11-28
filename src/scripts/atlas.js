// 전체 구성도(/map/) — 입체 구성도. 라이브러리 없이 CSS 3D와 이 스크립트만 쓴다.
// 자료는 빌드할 때 글의 위치 그림에서 뽑아 페이지에 넣어 둔 것이고(src/lib/atlas.ts), 여기서 새로 짓는 글자는 화면 안내뿐이다.
(() => {
  const source = document.getElementById('atlas-data');
  const root = document.querySelector('[data-atlas]');
  if (!source || !root) return;
  const D = JSON.parse(source.textContent);
  // 꼬리표(누가 맡는지 · 무엇으로 붙는지). 낱말은 빌드할 때 글의 본문과 맞대 본 것만 온다(src/lib/atlasBounds.ts).
  const B = D.bounds || { nodes: {}, rows: {}, links: [] };
  const tagOf = (id) => (B.nodes[id] ? B.nodes[id].tag : '');

  const view = root.querySelector('.atl-view');
  const flat = root.querySelector('.atl-flat');
  const cap = root.querySelector('[data-cap]');
  const CAP = cap.textContent.trim();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const can3d = !!(window.CSS && CSS.supports && CSS.supports('transform-style', 'preserve-3d'));
  const wideMq = matchMedia('(min-width: 760px)');

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  // 자리(상자 열하나 + 옆의 테스트와 평가)
  const nodes = {};
  D.rows.forEach((r, ri) => r.nodes.forEach((n) => { nodes[n.id] = { id: n.id, row: ri, label: n.label, small: n.small, count: n.count }; }));
  nodes.side = { id: 'side', row: -1, label: D.side.title, small: '', count: D.side.count };
  const ids = Object.keys(nodes);
  const postOf = Object.fromEntries(D.posts.map((p) => [p.slug, p]));
  const covers = (p, id) => (id === 'side' ? !!p.side : !!p.on[id]);

  const state = { post: null, node: null, view: 'flat', pref: '3d' };

  // 지금 상태에서 한 자리가 어떻게 보여야 하는지
  function vm(id) {
    const n = nodes[id];
    const p = state.post && postOf[state.post];
    if (p) {
      const o = id === 'side' ? p.side : p.on[id];
      if (o) return { label: o.label || n.label, small: id === 'side' ? '' : o.small, no: o.no, on: true, count: 0, h: 30 };
      return { label: n.label, small: n.small, no: 0, on: false, count: 0, h: 8 };
    }
    return { label: n.label, small: n.small, no: 0, on: state.node === id, count: n.count, h: 8 + 7 * n.count };
  }
  function sideItems() {
    const p = state.post && postOf[state.post];
    return p && p.side ? p.side.items : D.side.items.map((t) => ({ t, hit: false }));
  }
  function say(v, id) {
    const tag = tagOf(id);
    return v.label + (v.small ? `, ${v.small}` : '') + (tag ? `, ${tag}` : '') + (v.no ? `. 이 글의 ${v.no}번 자리` : v.count ? `. 다룬 글 ${v.count}편` : '');
  }
  function fill(target, v) {
    target.textContent = '';
    if (v.no) target.append(el('b', 'loc__no', v.no));
    else if (v.count) target.append(el('b', 'atl-cnt', v.count));
    return target;
  }

  // ── 입체 무대 ──
  const G = { W: 410, D: 84, T: 18, H: 88, S: 84, pad: 12, gap: 10, bd: 56 };
  const RAMP = { x: G.W / 2 + 24, w: 100, y0: -2 * G.H - 20, z0: -2 * G.S - G.D / 2, dy: 4 * G.H + 30, dz: 4 * G.S + G.D };
  const RAILX = -G.W / 2 - 18;
  const HOME = { e: 24, y: -18 };
  const cam = { e: HOME.e, y: HOME.y };
  let stage = null, world = null, body = null, pulse = null, ramp = null, rampChips = null, raf = 0, goal = null;
  const floors = [];

  function cub(cls, w, h, d) {
    const c = el('div', `atl-cub ${cls}`);
    c.style.setProperty('--w', w);
    c.style.setProperty('--h', h);
    c.style.setProperty('--d', d);
    for (const f of ['b', 'l', 'r', 'f', 't']) c.append(el('i', f));
    return c;
  }
  const railAt = (i) => `translate3d(${RAILX}px, ${(i - 2) * G.H - 6}px, ${(i - 2) * G.S}px)`;

  function setCam(e, y) {
    // 글자가 겹쳐 읽기 어려워지는 각도까지는 돌리지 않는다
    cam.e = Math.max(14, Math.min(48, e));
    cam.y = Math.max(-40, Math.min(40, y));
    world.style.setProperty('--rx', `${-cam.e}deg`);
    world.style.setProperty('--ry', `${cam.y}deg`);
  }
  function tweenTo(e, y, ms) {
    cancelAnimationFrame(raf);
    if (reduce) { goal = null; setCam(e, y); return; }
    goal = { e, y };
    const a = { e: cam.e, y: cam.y };
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const s = 1 - (1 - k) ** 3;
      setCam(a.e + (e - a.e) * s, a.y + (y - a.y) * s);
      if (k < 1) raf = requestAnimationFrame(step); else goal = null;
    };
    raf = requestAnimationFrame(step);
  }
  // 처음 각도에서 무대에 다 들어오게 크기와 자리를 맞춘다
  function fit() {
    if (!stage || state.view !== '3d') return;
    const keep = { e: cam.e, y: cam.y };
    const g = goal;
    cancelAnimationFrame(raf);
    setCam(HOME.e, HOME.y);
    world.style.setProperty('--sc', 1);
    world.style.left = '50%';
    world.style.top = '50%';
    const s = stage.getBoundingClientRect();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    world.querySelectorAll('.atl-cub > i, .atl-chip, .atl-ramp, .atl-rail > i').forEach((n) => {
      const r = n.getBoundingClientRect();
      if (!r.width && !r.height) return;
      x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
    });
    if (x0 !== Infinity) {
      const pad = 22;
      const sc = Math.min(1, (s.width - 2 * pad) / (x1 - x0), (s.height - 2 * pad) / (y1 - y0));
      const cx = (x0 + x1) / 2 - (s.left + s.width / 2);
      const cy = (y0 + y1) / 2 - (s.top + s.height / 2);
      world.style.setProperty('--sc', sc.toFixed(4));
      world.style.left = `calc(50% - ${(cx * sc).toFixed(1)}px)`;
      world.style.top = `calc(50% - ${(cy * sc).toFixed(1)}px)`;
    }
    setCam(keep.e, keep.y);
    if (g) tweenTo(g.e, g.y, 600);
  }

  function build3d() {
    stage = el('div', 'atl-stage');
    stage.tabIndex = 0;
    stage.setAttribute('role', 'group');
    stage.setAttribute('aria-label', '입체 구성도. 끌거나 화살표 키로 돌려 볼 수 있어요.');
    world = el('div', 'atl-world');
    body = el('div', 'atl-floor');
    body.style.transform = `translate3d(${-(RAMP.x + RAMP.w + RAILX) / 2}px, 0px, 0px)`;
    world.append(body);

    D.rows.forEach((r, i) => {
      const f = el('div', 'atl-floor');
      f.style.transform = `translate3d(0px, ${(i - 2) * G.H}px, ${(i - 2) * G.S}px)`;
      const slab = cub('atl-slab', G.W, G.T, G.D);
      slab.style.transform = `translate3d(0px, ${G.T}px, 0px)`;
      slab.querySelector('.f').textContent = r.k;
      const n = r.nodes.length;
      const bw = (G.W - 2 * G.pad - (n - 1) * G.gap) / n;
      // 줄의 꼬리표와 상자 사이의 이름표는 판 앞면에 줄 이름과 나란히 적는다.
      // 화면을 보는 딱지로 띄우면 아래층 상자의 딱지 옆에 놓여 그 상자의 것으로 읽힌다.
      const face = slab.querySelector('.f');
      if (B.rows[i]) face.append(el('i', 'atl-tag atl-tag--row', B.rows[i].tag));
      B.links.filter((lk) => lk.row === i).forEach((lk) => {
        const t = el('i', 'atl-link', lk.label);
        t.style.left = `${G.pad + (lk.left + 1) * bw + lk.left * G.gap + G.gap / 2}px`;
        face.append(t);
      });
      f.append(slab);
      r.nodes.forEach((nd, j) => {
        const box = cub('atl-node', bw, 8, G.bd);
        box.dataset.id = nd.id;
        box.style.transform = `translate3d(${-G.W / 2 + G.pad + bw / 2 + j * (bw + G.gap)}px, 0px, 0px)`;
        const a = el('div', 'atl-anchor');
        const chip = el('button', 'atl-bb atl-chip');
        chip.type = 'button';
        chip.dataset.id = nd.id;
        a.append(chip);
        box.append(a);
        nodes[nd.id].box = box;
        nodes[nd.id].chip = chip;
        f.append(box);
      });
      floors.push(f);
      body.append(f);
    });

    // 옆 비탈: 맨 위 층 뒤에서 맨 아래 층 앞까지
    const len = Math.hypot(RAMP.dy, RAMP.dz);
    ramp = el('div', 'atl-ramp');
    ramp.dataset.id = 'side';
    ramp.style.width = `${RAMP.w}px`;
    ramp.style.height = `${len}px`;
    ramp.style.transform = `translate3d(${RAMP.x}px, ${RAMP.y0}px, ${RAMP.z0}px) rotateX(${(Math.atan2(RAMP.dz, RAMP.dy) * 180) / Math.PI}deg)`;
    rampChips = el('div', 'atl-floor');
    body.append(ramp, rampChips);

    // 왼쪽 난간과 지나는 점
    const rl = Math.hypot(4 * G.H, 4 * G.S);
    const rail = el('div', 'atl-rail');
    rail.style.transform = `${railAt(0)} rotateX(${(Math.atan2(4 * G.S, 4 * G.H) * 180) / Math.PI}deg)`;
    const r1 = el('i');
    const r2 = el('i');
    r1.style.height = r2.style.height = `${rl}px`;
    r2.style.transform = 'rotateY(90deg)';
    rail.append(r1, r2);
    pulse = el('div', 'atl-pulse');
    pulse.style.transform = railAt(0);
    pulse.append(el('b', 'atl-bb atl-bb--c atl-ball'));
    body.append(rail, pulse);

    stage.append(world);
    view.insertBefore(stage, flat);

    // 끌어서 돌리기
    let drag = null;
    let justDragged = false;
    stage.addEventListener('pointerdown', (e) => {
      if (e.button) return;
      cancelAnimationFrame(raf);
      goal = null;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, e0: cam.e, y0: cam.y, moved: false };
    });
    stage.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved) {
        if (Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        stage.classList.add('is-drag');
        try { stage.setPointerCapture(e.pointerId); } catch (_) { /* 잡지 못해도 돌리기는 된다 */ }
      }
      setCam(drag.e0 + dy * 0.3, drag.y0 + dx * 0.35);
    });
    const end = () => {
      if (!drag) return;
      if (drag.moved) { justDragged = true; setTimeout(() => { justDragged = false; }, 0); }
      stage.classList.remove('is-drag');
      drag = null;
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('click', (e) => {
      if (justDragged) return;
      const t = e.target.closest('[data-id]');
      if (t) pickNode(t.dataset.id);
    });
    stage.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: [0, -6], ArrowRight: [0, 6], ArrowUp: [-5, 0], ArrowDown: [5, 0] }[e.key];
      if (!d) return;
      e.preventDefault();
      cancelAnimationFrame(raf);
      goal = null;
      setCam(cam.e + d[0], cam.y + d[1]);
    });
  }

  function renderRamp(v) {
    ramp.classList.toggle('is-on', v.on);
    rampChips.textContent = '';
    const items = sideItems();
    const len = Math.hypot(RAMP.dy, RAMP.dz);
    // 비탈에서 바깥쪽(위 · 앞)으로 조금 띄워, 딱지가 비탈 면에 묻히지 않게 한다
    const ny = -RAMP.dz / len, nz = RAMP.dy / len, lift = 18;
    const at = (t) => `translate3d(${RAMP.x + RAMP.w / 2}px, ${RAMP.y0 + t * RAMP.dy + ny * lift}px, ${RAMP.z0 + t * RAMP.dz + nz * lift}px)`;
    const put = (t, chip) => { const a = el('div', 'atl-anchor'); a.style.transform = at(t); a.append(chip); rampChips.append(a); };
    const head = el('button', 'atl-bb atl-bb--c atl-chip');
    head.type = 'button';
    head.dataset.id = 'side';
    fill(head, v).append(el('span', '', v.label));
    head.classList.toggle('is-on', v.on);
    head.setAttribute('aria-pressed', String(state.node === 'side'));
    head.setAttribute('aria-label', say(v, 'side'));
    put(0.08, head);
    items.forEach((it, k) => {
      const c = el('span', `atl-bb atl-bb--c atl-chip atl-chip--item${it.hit ? ' is-hit' : ''}`, it.t);
      c.dataset.id = 'side';
      put(0.3 + (k * 0.62) / Math.max(1, items.length - 1), c);
    });
  }

  // ── 옆 칸 ──
  const panel = el('aside', 'atl-panel');
  panel.setAttribute('aria-label', '글과 다룬 자리');
  const list = el('div', 'atl-posts');
  const detail = el('div', 'atl-detail');
  detail.setAttribute('aria-live', 'polite');
  const postBtn = {};
  panel.append(el('h2', '', `자리를 표시해 둔 글 ${D.posts.length}편`), list, detail);
  D.posts.forEach((p) => {
    const b = el('button', '', p.short);
    b.type = 'button';
    b.append(el('small', '', p.category));
    b.addEventListener('click', () => pickPost(p.slug));
    postBtn[p.slug] = b;
    list.append(b);
  });
  const didLine = (d) => {
    const s = el('span');
    s.append(el('b', '', d.head), ` — ${d.text}`);
    return s;
  };
  function renderPanel() {
    const p = state.post && postOf[state.post];
    D.posts.forEach((q) => {
      const b = postBtn[q.slug];
      b.setAttribute('aria-pressed', String(state.post === q.slug));
      b.classList.toggle('is-hit', !!state.node && covers(q, state.node));
      b.classList.toggle('is-dim', !!state.node && !covers(q, state.node));
    });
    detail.textContent = '';
    if (p) {
      detail.append(el('h3', '', p.short));
      if (p.sub) detail.append(el('p', 'atl-sub', p.sub));
      const ol = el('ol', 'atl-did');
      p.did.forEach((d) => { const li = el('li'); li.append(el('b', 'loc__no', d.no), didLine(d)); ol.append(li); });
      detail.append(ol);
      if (p.extra) detail.append(el('p', 'atl-extra', p.extra));
      const a = el('a', 'link atl-more', '글 읽기 →');
      a.href = `/posts/${p.slug}/`;
      detail.append(a);
    } else if (state.node) {
      const n = nodes[state.node];
      const hit = D.posts.filter((q) => covers(q, state.node));
      detail.append(el('h3', '', n.label), el('p', 'atl-sub', `이 자리를 다룬 글 ${hit.length}편`));
      const ul = el('ul', 'atl-by');
      hit.forEach((q) => {
        const li = el('li');
        const a = el('a', 'link', q.short);
        a.href = `/posts/${q.slug}/`;
        const para = el('p');
        para.append(didLine(q.did.find((d) => d.node === state.node)));
        li.append(a, para);
        if (q.extra) li.append(el('p', 'atl-extra', q.extra));
        ul.append(li);
      });
      detail.append(ul);
    } else {
      detail.append(el('p', 'atl-hint', '글이나 상자를 골라 보세요.'));
    }
  }

  // ── 평면 판(올라간 위치 그림과 같은 양식) ──
  ids.forEach((id) => {
    const t = flat.querySelector(`[data-id="${id}"]`);
    nodes[id].flat = t;
    t.setAttribute('role', 'button');
    t.tabIndex = 0;
    t.addEventListener('click', () => pickNode(id));
    t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickNode(id); } });
  });
  const flatRows = flat.querySelectorAll('.loc__row');

  // ── 무대 아래 줄 ──
  const bar = el('div', 'atl-bar');
  const seg = el('div', 'atl-seg');
  seg.setAttribute('role', 'group');
  seg.setAttribute('aria-label', '보기');
  const b3d = el('button', '', '입체');
  const bFlat = el('button', '', '평면');
  const bHome = el('button', 'atl-act', '처음 각도로');
  const bFlow = el('button', 'atl-act', '지나는 길 보기');
  [b3d, bFlat, bHome, bFlow].forEach((b) => { b.type = 'button'; });
  bHome.dataset.only = '3d';
  seg.append(b3d, bFlat);
  bar.append(seg, bHome, bFlow);
  b3d.addEventListener('click', () => { state.pref = '3d'; setView(); });
  bFlat.addEventListener('click', () => { state.pref = 'flat'; setView(); });
  bHome.addEventListener('click', () => tweenTo(HOME.e, HOME.y, 600));

  let flowT = 0;
  function flow() {
    clearTimeout(flowT);
    bFlow.disabled = true;
    if (pulse) {
      pulse.classList.add('is-jump');
      pulse.style.transform = railAt(0);
      void pulse.offsetWidth;
      pulse.classList.remove('is-jump');
    }
    let i = 0;
    const step = () => {
      floors.forEach((f, k) => f.classList.toggle('is-lit', k === i));
      flatRows.forEach((r, k) => r.classList.toggle('is-lit', k === i));
      if (pulse) {
        if (i < D.rows.length) pulse.style.transform = railAt(i);
        pulse.classList.toggle('is-on', i < D.rows.length);
      }
      if (i >= D.rows.length) { bFlow.disabled = false; return; }
      i += 1;
      flowT = setTimeout(step, 900);
    };
    step();
  }
  bFlow.addEventListener('click', flow);

  // ── 상태 바꾸기와 그리기 ──
  function pickPost(slug) {
    state.post = state.post === slug ? null : slug;
    state.node = null;
    render();
  }
  function pickNode(id) {
    if (state.post) { state.post = null; state.node = id; } else state.node = state.node === id ? null : id;
    render();
  }
  function render() {
    const is3d = state.view === '3d';
    root.dataset.mode = state.post ? 'post' : state.node ? 'node' : 'all';
    ids.forEach((id) => {
      const v = vm(id);
      const n = nodes[id];
      if (id === 'side') {
        if (ramp) renderRamp(v);
        fill(n.flat, v).append(el('b', '', v.label));
        sideItems().forEach((it) => n.flat.append(el('span', it.hit ? 'loc__hit' : '', it.t)));
        n.flat.classList.toggle('loc__side--on', v.on);
      } else {
        if (n.box) {
          n.box.style.setProperty('--h', v.h);
          n.box.classList.toggle('is-on', v.on);
          n.box.dataset.c = v.count || '';
          fill(n.chip, v).append(el('span', '', v.label));
          if (v.small) n.chip.append(el('small', '', v.small));
          if (tagOf(id)) n.chip.append(el('i', 'atl-tag', tagOf(id)));
          n.chip.classList.toggle('is-on', v.on);
          n.chip.setAttribute('aria-pressed', String(state.node === id));
          n.chip.setAttribute('aria-label', say(v, id));
        }
        fill(n.flat, v).append(v.label);
        if (v.small) n.flat.append(el('small', '', v.small));
        if (tagOf(id)) n.flat.append(el('i', 'atl-tag', tagOf(id)));
        n.flat.classList.toggle('loc__n--on', v.on);
      }
      n.flat.setAttribute('aria-pressed', String(state.node === id));
      n.flat.setAttribute('aria-label', say(v, id));
    });
    renderPanel();
    const p = state.post && postOf[state.post];
    cap.textContent = p
      ? `${CAP} ${is3d ? '파란 상자가' : '파란 테두리가'} 이 글이 다룬 자리예요.`
      : state.node
        ? `${CAP} 고른 자리를 다룬 글을 목록에서 볼 수 있어요.`
        : `${CAP} ${is3d ? '숫자가 그 자리를 다룬 글의 수이고, 글이 많은 자리일수록 상자가 높고 짙어요.' : '숫자는 그 자리를 다룬 글의 수예요.'}`;
  }
  function setView() {
    const next = state.pref === '3d' && stage && wideMq.matches ? '3d' : 'flat';
    state.view = next;
    root.dataset.view = next;
    b3d.setAttribute('aria-pressed', String(next === '3d'));
    bFlat.setAttribute('aria-pressed', String(next === 'flat'));
    seg.hidden = !(stage && wideMq.matches);
    render();
    fit();
  }

  // ── 시작 ──
  root.classList.add('atl--js', 'is-init');
  document.querySelectorAll('[data-atlas-js]').forEach((e) => { e.hidden = false; });
  if (can3d) build3d();
  view.insertBefore(bar, cap);
  root.append(panel);
  setView();
  wideMq.addEventListener('change', setView);
  let rz = 0;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(fit, 150); });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.remove('is-init');
    if (stage && state.view === '3d' && !reduce) {
      setCam(56, 0);
      setTimeout(() => tweenTo(HOME.e, HOME.y, 1100), 250);
    }
  }));
})();
