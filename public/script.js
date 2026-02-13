// Script moved from index.html; loads products from backend and renders UI
let accountKey = "";
let currencyId = "";
let availablePaymentMethods = [];

async function initState() {
  try {
    const res = await fetch('/api/payments/config');
    const config = await res.json();
    accountKey = config.accountKey;
    currencyId = config.currencyId;

    // Fetch available payment methods from backend (via SDK)
    const pmRes = await fetch('/api/payments/methods');
    if (!pmRes.ok) {
      const errorText = await pmRes.text();
      console.error('Error fetching methods:', pmRes.status, errorText);
      log('Error obteniendo métodos: ' + pmRes.status);
      return;
    }
    const pmData = await pmRes.json();
    availablePaymentMethods = pmData.data || [];

    // Dynamically load widget script
    if (config.scriptUrl) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = config.scriptUrl;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // Configure widget after fetching key and loading script
    if (typeof GatewayWidget !== 'undefined' && GatewayWidget.configure) {
      GatewayWidget.configure({
        publicKey: accountKey,
        baseUrl: config.baseUrl || 'http://localhost:3000',
        checkoutBaseUrl: config.checkoutBaseUrl || 'https://production.coffee-pay.co'
      });
    }
  } catch (err) {
    log('Error inicializando configuración: ' + err.message);
  }
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    log('Error cargando productos: ' + err.message);
  }
}

async function fetchSubscriptionsPlans() {
  try {
    const res = await fetch('/api/subscriptions-plans');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const plans = await res.json();
    console.log('Planes de suscripción:', plans);
    renderPlans(plans.data);
  } catch (err) {
    log('Error cargando planes: ' + err.message);
  }
}

function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    const price = `${p.symbol}${Number(p.total).toLocaleString()} ${p.currency}`;

    // Generate payment methods checkboxes
    let methodsHtml = '';
    if (availablePaymentMethods.length > 0) {
      methodsHtml = `
        <div class="payment-methods-selection">
          <h4>Métodos permitidos:</h4>
          <div class="methods-list">
            ${availablePaymentMethods.map(m => `
              <label class="method-item">
                <input type="checkbox" name="methods-${p.id}" value="${m.id}" checked>
                ${m.name}
              </label>
            `).join('')}
          </div>
        </div>
      `;
    }

    div.innerHTML = `
      <h3>${p.name}</h3>
      <div class="price">${price}</div>
      <div class="desc">${p.description}</div>
      ${methodsHtml}
      <button class="pay-button" onclick="paySimple(${p.id}, ${p.total}, '${p.name}')">Comprar Ahora</button>
    `;
    container.appendChild(div);
  });
}

function renderPlans(plans) {
  const plansContainer = document.getElementById('plans-container');
  plansContainer.innerHTML = '';

  if (!plans || plans.length === 0) {
    plansContainer.innerHTML = '<p style="text-align:center; color:#666;">No hay planes disponibles.</p>';
    return;
  }

  plans.forEach(plan => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${plan.name}</h3>
      <div class="price">$${Number(plan.price).toLocaleString()} COP</div>
      <div class="desc">${plan.description || ''}</div>
      <button class="pay-button" onclick="paySubscription('${plan.id}', '${plan.name}')">Suscribirme</button>
    `;
    plansContainer.appendChild(div);
  });
}

// Utility signature generator (now fetches from backend)
async function generateSignature(timestamp) {
  try {
    const res = await fetch(`/api/payments/signature?timestamp=${timestamp}`);
    const data = await res.json();
    return data.signature;
  } catch (err) {
    log('Error obteniendo firma: ' + err.message);
  }
}

function log(msg) {
  const el = document.getElementById('debug-log');
  if (el) el.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
}

// Payment actions
async function paySimple(productId, total, name) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateSignature(timestamp);
  const reference = 'REF-' + Math.floor(Math.random() * 1000000);

  // Collect selected payment methods for this specific product
  const selectedMethods = Array.from(document.querySelectorAll(`input[name="methods-${productId}"]:checked`))
    .map(input => input.value);

  log(`Iniciando pago simple: ${name} ($${total}) con ${selectedMethods.length || 'todos los'} métodos`);

  const payerData = {
    payerName: document.getElementById('payerName')?.value,
    payerLastname: document.getElementById('payerLastname')?.value,
    payerEmail: document.getElementById('payerEmail')?.value,
    payerPhoneNumber: document.getElementById('payerPhoneNumber')?.value,
    payerDocumentTypeId: document.getElementById('payerDocumentTypeId')?.value,
    payerDocumentNumber: document.getElementById('payerDocumentNumber')?.value,
    payerAddress: document.getElementById('payerAddress')?.value,
    payerPostalCode: document.getElementById('payerPostalCode')?.value,
  };

  if (typeof GatewayWidget === 'undefined') {
    log('Widget no disponible (demo).');
    return;
  }

  GatewayWidget.open({
    isSubscription: false,
    total: total,
    subtotal: total,
    taxAmount: 0,
    currencyId: currencyId,
    reference: reference,
    description: `Compra de ${name}`,
    paymentMethods: selectedMethods, // Send selected methods
    timestamp: timestamp,
    signature: signature,
    ...payerData
  }, {
    onSuccess: (data) => log('✅ Pago aprobado: ' + data.id),
    onError: (err) => log('❌ Error: ' + err.message)
  });
}

async function paySubscription(planId, name) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await generateSignature(timestamp);
  log(`Iniciando suscripción a: ${name}`);
  const payerData = {
    payerName: document.getElementById('payerName')?.value,
    payerLastname: document.getElementById('payerLastname')?.value,
    payerEmail: document.getElementById('payerEmail')?.value,
    payerPhoneNumber: document.getElementById('payerPhoneNumber')?.value,
    payerDocumentTypeId: document.getElementById('payerDocumentTypeId')?.value,
    payerDocumentNumber: document.getElementById('payerDocumentNumber')?.value,
    payerAddress: document.getElementById('payerAddress')?.value,
    payerPostalCode: document.getElementById('payerPostalCode')?.value,
  };

  if (typeof GatewayWidget === 'undefined') {
    log('Widget no disponible (demo).');
    return;
  }

  GatewayWidget.open({
    isSubscription: true,
    subscriptionPlanId: planId,
    subscriptionEmail: payerData.payerEmail || "cliente@example.com",
    subscriptionName: (payerData.payerName || "Juan") + " " + (payerData.payerLastname || "Pérez"),
    subscriptionReference: "CLIENTE-123",
    timestamp: timestamp,
    signature: signature,
    ...payerData
  }, {
    onSuccess: (data) => log('✅ Suscripción creada: ' + data.id),
    onError: (err) => log('❌ Error: ' + err.message)
  });
}

// Initialize UI
document.addEventListener('DOMContentLoaded', async () => {
  await initState();
  fetchProducts();
  fetchSubscriptionsPlans();
});
