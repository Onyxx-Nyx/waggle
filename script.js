(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Waggle: pet store front-end demo.
     Products are sample data. The cart lives in localStorage and
     checkout never leaves the browser.
     ------------------------------------------------------------------ */

  const KEY = 'waggle.cart';
  const FREE_OVER = 50000;
  const DELIVERY_FEE = 3500;
  const MAX_QTY = 10;
  const PROMO_CODE = 'WAGGLE10';
  const PROMO_RATE = 0.1;

  const PETS = ['All', 'Dogs', 'Cats', 'Fish'];
  const ALL_TYPES = 'All types';
  const TYPES = [ALL_TYPES, 'Food', 'Toys', 'Beds', 'Grooming', 'Accessories'];

  // palette order: background, main, accent, dark
  const PRODUCTS = [
    { id: 'dog-food', name: 'Chicken and Rice Dog Food, 5 kg', pet: 'Dogs', type: 'Food', price: 18500, rating: 4.7, art: 'bowl', pal: ['#ffe3b3', '#d9822b', '#8a4b14', '#5b3210'], desc: 'Complete daily meal with real chicken and brown rice.' },
    { id: 'chew-bones', name: 'Crunchy Chew Bones, 10 pack', pet: 'Dogs', type: 'Food', price: 4500, rating: 4.5, art: 'bone', pal: ['#cfe8ff', '#f4ead6', '#d9c7a0', '#8a7650'], desc: 'Long-lasting treats that help keep teeth clean.' },
    { id: 'dog-ball', name: 'Bouncy Rubber Ball', pet: 'Dogs', type: 'Toys', price: 2800, rating: 4.6, art: 'ball', pal: ['#d8f5c9', '#ff6f91', '#ffd23f', '#2b1d3f'], desc: 'Tough, bouncy and easy to spot in the grass.' },
    { id: 'dog-bed', name: 'Cozy Cushion Dog Bed', pet: 'Dogs', type: 'Beds', price: 24000, rating: 4.8, art: 'bed', pal: ['#e4dcff', '#7a6be8', '#b9b0ff', '#4638b8'], desc: 'Soft, washable cover with a supportive foam base.' },
    { id: 'dog-collar', name: 'Adjustable Dog Collar', pet: 'Dogs', type: 'Accessories', price: 6500, rating: 4.4, art: 'collar', pal: ['#ffe0e8', '#ff6f91', '#ffd23f', '#8a3a52'], desc: 'Comfortable nylon collar with a quick-release clip.' },
    { id: 'dog-shampoo', name: 'Gentle Oat Dog Shampoo', pet: 'Dogs', type: 'Grooming', price: 7200, rating: 4.6, art: 'bottle', pal: ['#d6f3ff', '#4fb3e8', '#c9f26b', '#1f6b94'], desc: 'Soothes dry skin and leaves a clean, fresh coat.' },
    { id: 'cat-food', name: 'Salmon Cat Food, 2 kg', pet: 'Cats', type: 'Food', price: 12500, rating: 4.8, art: 'bowl', pal: ['#ffd9d0', '#ff8a6b', '#f4ead6', '#9a4a38'], desc: 'High-protein dry food that cats actually finish.' },
    { id: 'cat-mice', name: 'Catnip Mouse Toys, 3 pack', pet: 'Cats', type: 'Toys', price: 3200, rating: 4.7, art: 'mouse', pal: ['#e4f7d4', '#b9b0c9', '#ffb3c6', '#5b4b73'], desc: 'Soft toys filled with catnip for hours of play.' },
    { id: 'cat-wand', name: 'Feather Wand Teaser', pet: 'Cats', type: 'Toys', price: 2500, rating: 4.5, art: 'wand', pal: ['#fff1b8', '#ff6f91', '#5b4bdb', '#8a5a2b'], desc: 'A flexible wand that brings out their inner hunter.' },
    { id: 'cat-scratcher', name: 'Tall Scratching Post', pet: 'Cats', type: 'Accessories', price: 15500, rating: 4.6, art: 'scratcher', pal: ['#d9ecff', '#e0b676', '#ffb3c6', '#8a5a2b'], desc: 'Sturdy sisal post that saves your sofa.' },
    { id: 'cat-bed', name: 'Round Plush Cat Bed', pet: 'Cats', type: 'Beds', price: 19500, rating: 4.9, art: 'bed', pal: ['#ffe9c7', '#ff8a6b', '#ffd9d0', '#9a4a38'], desc: 'A deep, warm nest for long afternoon naps.' },
    { id: 'cat-brush', name: 'Slicker Grooming Brush', pet: 'Cats', type: 'Grooming', price: 5400, rating: 4.5, art: 'brush', pal: ['#dff5ea', '#3fae8a', '#c9f26b', '#1f6b55'], desc: 'Removes loose fur and keeps coats tangle-free.' },
    { id: 'fish-flakes', name: 'Tropical Fish Flakes', pet: 'Fish', type: 'Food', price: 2200, rating: 4.4, art: 'tin', pal: ['#cfeefc', '#ff8a3d', '#ffd23f', '#1f6b94'], desc: 'Balanced flakes for colorful freshwater fish.' },
    { id: 'fish-tank', name: 'Starter Aquarium, 20 liters', pet: 'Fish', type: 'Accessories', price: 38000, rating: 4.7, art: 'tank', pal: ['#e4f5ff', '#6fcdf0', '#d6f3ff', '#2a8f5b'], desc: 'Glass tank with a lid, ready for your first fish.' },
  ];

  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  /* ---------- Illustrations (generated SVG, no image files) ---------- */

  const SHAPES = {
    bowl: (c) =>
      `<path d="M80 190 H320 L290 300 Q285 320 265 320 H135 Q115 320 110 300Z" fill="${c[1]}"/>` +
      `<ellipse cx="200" cy="190" rx="120" ry="26" fill="${c[3]}"/>` +
      [[150, 184], [195, 176], [240, 186], [218, 198], [172, 196]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="${c[2]}"/>`).join(''),
    bone: (c) =>
      `<g transform="rotate(-28 200 200)" fill="${c[1]}" stroke="${c[3]}" stroke-width="4"><rect x="105" y="178" width="190" height="44" rx="12"/>` +
      '<circle cx="108" cy="172" r="28"/><circle cx="108" cy="228" r="28"/><circle cx="292" cy="172" r="28"/><circle cx="292" cy="228" r="28"/>' +
      `<rect x="108" y="180" width="184" height="40" stroke="none"/></g>`,
    ball: (c) =>
      `<circle cx="200" cy="200" r="110" fill="${c[1]}"/>` +
      `<path d="M110 150 Q200 210 290 150 M110 250 Q200 190 290 250" stroke="${c[2]}" stroke-width="12" fill="none" stroke-linecap="round"/>` +
      '<circle cx="165" cy="150" r="18" fill="#fff" opacity=".35"/>',
    bed: (c) =>
      `<ellipse cx="200" cy="290" rx="150" ry="40" fill="${c[3]}"/>` +
      `<path d="M60 270 Q60 190 200 190 Q340 190 340 270 Q340 330 200 330 Q60 330 60 270Z" fill="${c[1]}"/>` +
      `<ellipse cx="200" cy="265" rx="105" ry="38" fill="${c[2]}"/>`,
    mouse: (c) =>
      `<path d="M120 290 Q40 300 60 240 Q70 215 100 235" stroke="${c[3]}" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      `<circle cx="245" cy="200" r="28" fill="${c[2]}"/><circle cx="292" cy="208" r="28" fill="${c[2]}"/>` +
      `<ellipse cx="205" cy="262" rx="105" ry="62" fill="${c[1]}"/>` +
      `<circle cx="275" cy="248" r="7" fill="${c[3]}"/><circle cx="312" cy="266" r="9" fill="${c[3]}"/>`,
    wand: (c) =>
      `<path d="M90 320 L250 130" stroke="${c[3]}" stroke-width="14" stroke-linecap="round"/>` +
      `<path d="M250 130 Q335 60 335 155 Q290 155 250 130Z" fill="${c[1]}"/>` +
      `<path d="M250 130 Q300 35 190 70 Q200 112 250 130Z" fill="${c[2]}"/>`,
    scratcher: (c) =>
      `<rect x="90" y="310" width="220" height="30" rx="10" fill="${c[3]}"/>` +
      `<rect x="175" y="110" width="50" height="205" fill="${c[1]}"/>` +
      `<path d="M175 140 H225 M175 170 H225 M175 200 H225 M175 230 H225 M175 260 H225 M175 290 H225" stroke="${c[3]}" stroke-width="5"/>` +
      `<circle cx="200" cy="100" r="40" fill="${c[2]}"/>`,
    brush: (c) =>
      `<path d="M150 150 V108 M180 150 V102 M210 150 V98 M240 150 V102 M270 150 V108 M300 150 V116" stroke="${c[3]}" stroke-width="7" stroke-linecap="round"/>` +
      `<rect x="120" y="150" width="200" height="90" rx="26" fill="${c[1]}"/>` +
      `<rect x="180" y="238" width="80" height="100" rx="26" fill="${c[2]}"/>`,
    collar: (c) =>
      `<circle cx="200" cy="180" r="100" fill="none" stroke="${c[1]}" stroke-width="30"/>` +
      `<circle cx="200" cy="180" r="100" fill="none" stroke="${c[2]}" stroke-width="6" stroke-dasharray="4 14"/>` +
      `<rect x="180" y="268" width="40" height="22" rx="4" fill="${c[3]}"/><circle cx="200" cy="322" r="30" fill="${c[2]}"/>`,
    bottle: (c) =>
      `<rect x="185" y="62" width="30" height="34" rx="6" fill="${c[3]}"/>` +
      `<rect x="165" y="90" width="70" height="40" rx="8" fill="${c[3]}"/>` +
      `<rect x="140" y="125" width="120" height="210" rx="30" fill="${c[1]}"/>` +
      `<rect x="155" y="190" width="90" height="80" rx="12" fill="${c[2]}"/><circle cx="200" cy="230" r="18" fill="${c[1]}"/>`,
    tin: (c) =>
      `<rect x="95" y="130" width="210" height="170" fill="${c[3]}"/>` +
      `<ellipse cx="200" cy="300" rx="105" ry="30" fill="${c[3]}"/>` +
      `<ellipse cx="200" cy="130" rx="105" ry="30" fill="${c[2]}"/>` +
      `<path d="M150 215 Q200 175 250 215 Q200 255 150 215Z M250 215 L282 195 V235Z" fill="${c[1]}"/>`,
    tank: (c) =>
      `<rect x="70" y="110" width="260" height="210" rx="18" fill="${c[2]}"/>` +
      `<rect x="70" y="150" width="260" height="170" rx="18" fill="${c[1]}"/>` +
      `<path d="M130 305 Q135 255 125 225 M160 305 Q150 265 168 240" stroke="${c[3]}" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      `<path d="M230 225 Q270 195 300 225 Q270 255 230 225Z M300 225 L322 209 V241Z" fill="#ff8a3d"/>` +
      '<circle cx="256" cy="219" r="4" fill="#fff"/>' +
      `<rect x="70" y="300" width="260" height="20" rx="10" fill="${c[3]}"/>`,
  };

  const artCache = new Map();

  function artUrl(p) {
    if (artCache.has(p.id)) return artCache.get(p.id);
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
      `<rect width="400" height="400" fill="${p.pal[0]}"/>` +
      `<circle cx="340" cy="70" r="46" fill="${p.pal[2]}" opacity=".35"/>` +
      `<circle cx="50" cy="350" r="60" fill="${p.pal[1]}" opacity=".18"/>` +
      SHAPES[p.art](p.pal) + '</svg>';
    const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    artCache.set(p.id, url);
    return url;
  }

  /* ---------- Helpers ---------- */

  const $ = (selector, root = document) => root.querySelector(selector);

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
  };

  const money = (n) => '₦' + Math.round(n).toLocaleString('en-US');
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  // Builds DOM nodes without innerHTML so text is never parsed as markup.
  function h(tag, props = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value === false || value == null) continue;
      if (key === 'class') el.className = value;
      else if (key === 'text') el.textContent = value;
      else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value === true ? '' : value);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid);
    }
    return el;
  }

  function say(message) {
    const status = $('#status');
    status.textContent = '';
    status.textContent = message;
  }

  function orderRef() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return `WG-${out}`;
  }

  /* ---------- State ---------- */

  const state = {
    pet: 'All',
    type: ALL_TYPES,
    sort: 'recommended',
    query: '',
    cart: {},            // productId -> quantity
    promoOn: false,
    promoMsg: null,      // { ok, text }
  };

  const haystacks = new Map(PRODUCTS.map((p) => [p.id, `${p.name} ${p.pet} ${p.type} ${p.desc}`.toLowerCase()]));

  function visibleProducts() {
    const tokens = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const list = PRODUCTS.filter((p) => {
      if (state.pet !== 'All' && p.pet !== state.pet) return false;
      if (state.type !== ALL_TYPES && p.type !== state.type) return false;
      const text = haystacks.get(p.id);
      return tokens.every((t) => text.includes(t));
    });
    if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }

  const isFiltered = () => state.pet !== 'All' || state.type !== ALL_TYPES || state.query.trim() !== '';

  /* ---------- Cart maths ---------- */

  const itemCount = () => Object.values(state.cart).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(state.cart).reduce((sum, [id, q]) => sum + byId(id).price * q, 0);
  const discount = () => (state.promoOn ? Math.round(subtotal() * PROMO_RATE) : 0);
  const afterDiscount = () => subtotal() - discount();
  const delivery = () => (itemCount() === 0 || afterDiscount() >= FREE_OVER ? 0 : DELIVERY_FEE);
  const total = () => afterDiscount() + delivery();

  function saveCart() {
    store.set(KEY, state.cart);
    const n = itemCount();
    $('#cart-count').textContent = String(n);
    $('#open-cart').setAttribute('aria-label', `Cart, ${plural(n, 'item')}`);
  }

  /* ---------- Product grid ---------- */

  function productCard(p) {
    const inCart = state.cart[p.id] || 0;
    return h('article', { class: 'card', 'data-id': p.id },
      h('div', { class: 'card__art' },
        h('img', { src: artUrl(p), alt: '', loading: 'lazy', width: '400', height: '400' }),
        h('span', { class: 'tag-price', text: money(p.price) }),
      ),
      h('div', { class: 'card__body' },
        h('p', { class: 'card__meta', text: `${p.pet}, ${p.type}` }),
        h('h3', { class: 'card__title', text: p.name }),
        h('p', { class: 'card__desc', text: p.desc }),
        h('p', { class: 'card__rating', text: `Rated ${p.rating.toFixed(1)} out of 5` }),
        h('div', { class: 'card__foot' },
          h('button', {
            class: 'btn btn--primary', type: 'button', 'data-add': p.id,
            'aria-label': `Add ${p.name} to cart`, text: 'Add to cart',
            onclick: () => addToCart(p.id),
          }),
          inCart > 0 && h('span', { class: 'incart', text: `${inCart} in cart` }),
        ),
      ),
    );
  }

  function render() {
    const list = visibleProducts();
    $('#grid').replaceChildren(...list.map(productCard));
    $('#empty').hidden = list.length > 0;
    $('#reset').hidden = !isFiltered();

    let summary = plural(list.length, 'product');
    if (state.pet !== 'All') summary += ` for ${state.pet.toLowerCase()}`;
    if (state.type !== ALL_TYPES) summary += `, ${state.type.toLowerCase()} only`;
    if (state.query.trim()) summary += `, matching “${state.query.trim()}”`;
    $('#summary').textContent = summary + '.';

    document.querySelectorAll('.chip').forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.pet === state.pet));
    });
  }

  function refreshCard(id) {
    const p = byId(id);
    const current = document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);
    if (!p || !current) return;
    const next = productCard(p);
    current.replaceWith(next);
    return next;
  }

  function resetFilters() {
    state.pet = 'All';
    state.type = ALL_TYPES;
    state.query = '';
    $('#search').value = '';
    $('#type').value = ALL_TYPES;
    render();
  }

  function addToCart(id) {
    const p = byId(id);
    if (!p) return;
    const current = state.cart[id] || 0;
    if (current >= MAX_QTY) {
      say(`You can buy up to ${MAX_QTY} of each product.`);
      return;
    }
    state.cart[id] = current + 1;
    saveCart();
    refreshCard(id)?.querySelector('[data-add]')?.focus();
    say(`${p.name} added. ${plural(itemCount(), 'item')} in your cart.`);
  }

  /* ---------- Cart drawer ---------- */

  const dialog = () => $('#cart-dialog');

  function closeButton() {
    return h('button', { class: 'drawer__close', type: 'button', text: 'Close', onclick: () => dialog().close() });
  }

  function openCart() {
    renderCart();
    if (!dialog().open) dialog().showModal();
    $('#cart-title')?.focus();
  }

  function changeQty(id, delta) {
    const next = (state.cart[id] || 0) + delta;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(MAX_QTY, next);
    if (itemCount() === 0) { state.promoOn = false; state.promoMsg = null; }
    saveCart();
    render();
    say(state.cart[id] ? `${byId(id).name}, quantity ${state.cart[id]}.` : `${byId(id).name} removed.`);
  }

  function summaryList() {
    const rows = [['Subtotal', money(subtotal())]];
    if (state.promoOn) rows.push([`Promo ${PROMO_CODE}`, `-${money(discount())}`]);
    rows.push(['Delivery', delivery() === 0 ? 'Free' : money(delivery())]);

    return h('dl', { class: 'sum' },
      rows.map(([label, value]) => h('div', { class: 'sum__row' }, h('dt', { text: label }), h('dd', { text: value }))),
      h('div', { class: 'sum__row sum__row--total' }, h('dt', { text: 'Total' }), h('dd', { text: money(total()) })),
    );
  }

  function renderCart(focusSelector) {
    const body = $('#cart-body');

    if (itemCount() === 0) {
      body.replaceChildren(h('div', { class: 'cart' },
        closeButton(),
        h('h2', { id: 'cart-title', tabindex: '-1', text: 'Your cart' }),
        h('p', { class: 'note', text: 'Your cart is empty. Add something your pet will love.' }),
        h('button', { class: 'btn btn--primary', type: 'button', text: 'Keep shopping', onclick: () => dialog().close() }),
      ));
      if (focusSelector) $(focusSelector)?.focus();
      return;
    }

    const lines = Object.entries(state.cart).map(([id, q]) => {
      const p = byId(id);
      return h('li', { class: 'line' },
        h('img', { src: artUrl(p), alt: '' }),
        h('div', { class: 'line__info' },
          h('strong', { text: p.name }),
          h('span', { text: `${money(p.price)} each` }),
          h('div', { class: 'qty' },
            h('button', {
              class: 'qty__btn', type: 'button', 'data-key': `${id}-minus`,
              'aria-label': `Remove one ${p.name}`, text: '−',
              onclick: () => { changeQty(id, -1); renderCart(state.cart[id] ? `[data-key="${id}-minus"]` : '#cart-title'); },
            }),
            h('span', { class: 'qty__n', 'aria-label': `Quantity ${q}`, text: String(q) }),
            h('button', {
              class: 'qty__btn', type: 'button', 'data-key': `${id}-plus`,
              'aria-label': `Add one more ${p.name}`, text: '+', disabled: q >= MAX_QTY,
              onclick: () => { changeQty(id, 1); renderCart(`[data-key="${id}-plus"]`); },
            }),
          ),
        ),
        h('div', { class: 'line__end' },
          h('span', { text: money(p.price * q) }),
          h('button', {
            class: 'link', type: 'button', 'aria-label': `Remove ${p.name} from cart`, text: 'Remove',
            onclick: () => { changeQty(id, -q); renderCart('#cart-title'); },
          }),
        ),
      );
    });

    const promoInput = h('input', {
      id: 'promo', type: 'text', autocomplete: 'off', placeholder: 'Promo code',
      value: state.promoOn ? PROMO_CODE : '', disabled: state.promoOn,
    });

    const promoForm = h('form', {
      class: 'promo', novalidate: true,
      onsubmit: (event) => {
        event.preventDefault();
        const code = promoInput.value.trim().toUpperCase();
        if (state.promoOn) return;
        if (code === PROMO_CODE) {
          state.promoOn = true;
          state.promoMsg = { ok: true, text: `Code applied. You save ${money(discount())}.` };
        } else {
          state.promoMsg = { ok: false, text: code ? 'That code is not valid. Check it and try again.' : 'Enter a promo code first.' };
        }
        renderCart('#promo');
      },
    },
      h('label', { class: 'sr-only', for: 'promo', text: 'Promo code' }),
      h('div', { class: 'promo__row' },
        promoInput,
        h('button', { class: 'btn btn--ghost', type: 'submit', text: state.promoOn ? 'Applied' : 'Apply', disabled: state.promoOn }),
      ),
      state.promoMsg && h('p', { class: `promo__msg ${state.promoMsg.ok ? 'promo__msg--ok' : 'promo__msg--bad'}`, role: 'status', text: state.promoMsg.text }),
    );

    const remaining = FREE_OVER - afterDiscount();
    const hint = remaining > 0
      ? `Add ${money(remaining)} more for free delivery.`
      : 'Your order gets free delivery.';

    body.replaceChildren(h('div', { class: 'cart' },
      closeButton(),
      h('h2', { id: 'cart-title', tabindex: '-1', text: `Your cart (${plural(itemCount(), 'item')})` }),
      h('ul', { class: 'lines' }, lines),
      promoForm,
      h('p', { class: 'hint', text: hint }),
      summaryList(),
      h('div', { class: 'actions' },
        h('button', { class: 'btn btn--ghost', type: 'button', text: 'Keep shopping', onclick: () => dialog().close() }),
        h('button', { class: 'btn btn--primary', type: 'button', text: 'Checkout', onclick: renderCheckout }),
      ),
    ));

    if (focusSelector) $(focusSelector)?.focus();
  }

  /* ---------- Checkout ---------- */

  function renderCheckout() {
    const body = $('#cart-body');
    const name = h('input', { id: 'c-name', type: 'text', autocomplete: 'name' });
    const phone = h('input', { id: 'c-phone', type: 'tel', autocomplete: 'tel', inputmode: 'tel', placeholder: '0803 000 0000' });
    const address = h('input', { id: 'c-address', type: 'text', autocomplete: 'street-address' });
    const error = h('p', { class: 'form-error', role: 'alert' });

    const radio = (value, label, checked) => h('label', { class: 'radio' },
      h('input', { type: 'radio', name: 'pay', value, checked }),
      h('span', { text: label }),
    );

    const fail = (message, input) => {
      error.textContent = message;
      input.focus();
    };

    const form = h('form', {
      novalidate: true,
      onsubmit: (event) => {
        event.preventDefault();
        error.textContent = '';

        if (name.value.trim().length < 2) return fail('Enter your full name.', name);
        if (!/^\+?[\d\s-]{10,16}$/.test(phone.value.trim()) || phone.value.replace(/\D/g, '').length < 10) {
          return fail('Enter a phone number with at least 10 digits.', phone);
        }
        if (address.value.trim().length < 8) return fail('Enter your full delivery address, including street and city.', address);

        const order = {
          ref: orderRef(),
          name: name.value.trim(),
          pay: form.querySelector('input[name="pay"]:checked').value,
          total: total(),
          items: itemCount(),
        };

        state.cart = {};
        state.promoOn = false;
        state.promoMsg = null;
        saveCart();
        render();
        renderDone(order);
        say(`Order placed. Reference ${order.ref}.`);
      },
    },
      h('div', { class: 'field' }, h('label', { for: 'c-name', text: 'Full name' }), name),
      h('div', { class: 'field' }, h('label', { for: 'c-phone', text: 'Phone number' }), phone),
      h('div', { class: 'field' }, h('label', { for: 'c-address', text: 'Delivery address' }), address),
      h('fieldset', { class: 'pay' },
        h('legend', { text: 'How would you like to pay?' }),
        radio('Pay on delivery', 'Pay on delivery', true),
        radio('Card (demo)', 'Card, demo only so nothing is charged', false),
      ),
      summaryList(),
      error,
      h('div', { class: 'actions' },
        h('button', { class: 'btn btn--ghost', type: 'button', text: 'Back to cart', onclick: () => { renderCart(); $('#cart-title')?.focus(); } }),
        h('button', { class: 'btn btn--primary', type: 'submit', text: 'Place order' }),
      ),
    );

    body.replaceChildren(h('div', { class: 'cart' },
      closeButton(),
      h('h2', { id: 'cart-title', tabindex: '-1', text: 'Checkout' }),
      form,
    ));
    $('#cart-title').focus();
  }

  function renderDone(order) {
    $('#cart-body').replaceChildren(h('div', { class: 'cart done' },
      closeButton(),
      h('h2', { id: 'cart-title', tabindex: '-1', text: `Thanks, ${order.name.split(/\s+/)[0]}!` }),
      h('p', { text: `Your order of ${plural(order.items, 'item')} is confirmed.` }),
      h('div', { class: 'order-ref', text: order.ref }),
      h('p', { class: 'note', text: `${order.pay === 'Pay on delivery' ? `Please have ${money(order.total)} ready on delivery.` : 'This is a demo, so no card was charged.'} Nothing will actually be delivered.` }),
      h('button', { class: 'btn btn--primary', type: 'button', text: 'Back to the shop', onclick: () => dialog().close() }),
    ));
    $('#cart-title').focus();
  }

  /* ---------- Setup ---------- */

  function jumpToShop() {
    const title = $('#shop-title');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (title.scrollIntoView) title.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    title.focus({ preventScroll: true });
  }

  function setupControls() {
    $('#chips').replaceChildren(...PETS.map((pet) => h('button', {
      class: 'chip', type: 'button', 'data-pet': pet, 'aria-pressed': String(pet === 'All'),
      text: pet === 'All' ? 'All pets' : pet,
      onclick: () => { state.pet = pet; render(); },
    })));

    $('#type').replaceChildren(...TYPES.map((t) => h('option', { value: t, text: t })));
    $('#type').addEventListener('change', (e) => { state.type = e.target.value; render(); });
    $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
    $('#reset').addEventListener('click', resetFilters);
    $('#empty-reset').addEventListener('click', resetFilters);

    $('#search').addEventListener('input', (e) => { state.query = e.target.value; render(); });
    $('#search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      state.query = $('#search').value;
      render();
      jumpToShop();
    });

    document.querySelectorAll('[data-jump]').forEach((button) => {
      button.addEventListener('click', () => {
        state.pet = button.dataset.jump;
        render();
        jumpToShop();
      });
    });

    $('#open-cart').addEventListener('click', openCart);

    dialog().addEventListener('click', (e) => { if (e.target === dialog()) dialog().close(); });

    // Hero pictures reuse three product illustrations.
    $('#hero-a').src = artUrl(byId('dog-food'));
    $('#hero-b').src = artUrl(byId('cat-mice'));
    $('#hero-c').src = artUrl(byId('dog-bed'));
  }

  function init() {
    const saved = store.get(KEY, {});
    const clean = {};
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      for (const [id, q] of Object.entries(saved)) {
        const n = Number(q);
        if (byId(id) && Number.isInteger(n) && n > 0) clean[id] = Math.min(MAX_QTY, n);
      }
    }
    state.cart = clean;

    setupControls();
    saveCart();
    render();
  }

  init();
})();
