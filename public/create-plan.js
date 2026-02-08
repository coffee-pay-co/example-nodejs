document.getElementById('create-plan-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const statusEl = document.getElementById('status-message');
    statusEl.innerText = 'Enviando al servidor NestJS...';
    statusEl.style.color = '#667eea';

    const formData = new FormData(e.target);

    // Lógica de intervalo: Trimestral -> monthly + count 3
    const displayInterval = document.getElementById('displayInterval').value;
    const [interval, intervalCount] = displayInterval.split('-');

    const data = {
        name: formData.get('name'),
        reference: formData.get('reference'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        currencyId: formData.get('currencyId'),
        interval: interval,
        intervalCount: Number(intervalCount),
        billingDay: Number(formData.get('billingDay') || 1),
        freeDays: Number(formData.get('freeDays') || 0),
        allowProrate: formData.get('allowProrate') === 'on',
        redirectUrl: formData.get('redirectUrl'),
        urlBack: formData.get('urlBack'),
        status: true,
    };

    try {
        const response = await fetch('/api/subscriptions-plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && !result.error) {
            statusEl.innerText = '✅ ¡Plan creado con éxito usando el SDK!';
            statusEl.style.color = '#2f855a';
            e.target.reset();
        } else {
            statusEl.innerText = '❌ Error: ' + (result.message || 'Error desconocido');
            statusEl.style.color = '#c53030';
            console.error('API Error:', result);
        }
    } catch (error) {
        statusEl.innerText = '❌ Error de conexión con el servidor.';
        statusEl.style.color = '#c53030';
        console.error('Network Error:', error);
    }
});
