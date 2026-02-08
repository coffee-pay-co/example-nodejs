# Coffee-Pay Integration Example (Node.js/NestJS)

Este proyecto es una implementación de referencia que demuestra cómo integrar la pasarela de pagos **Coffee-Pay** utilizando tanto el **Widget de Pago** como el **SDK de Node.js**.

## 🚀 Características Principales

- **Integración con SDK**: Uso de `@coffee-pay-sdk` para la gestión de planes de suscripción y consultas de monedas.
- **Widget de Pago**: Demostración de pagos simples y suscripciones con el `GatewayWidget`.
- **Seguridad (Firma en Backend)**: Generación automática de firmas (`integrity signature`) desde el servidor NestJS para proteger la `INTEGRITY_KEY`.
- **Dashboard Dinámico**: Listado de productos y planes de suscripción obtenidos vía API.
- **Creación de Planes**: Interfaz independiente para crear nuevos planes de suscripción con lógica de intervalos (Mensual, Trimestral, etc.) y prorrateo.

## 🛠️ Tecnologías

- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework)
- **Frontend**: HTML5, Vanilla JavaScript, CSS3.
- **SDK**: [coffee-pay-sdk](https://www.npmjs.com/package/coffee-pay-sdk)
- **Contenerización**: Docker & Docker Compose.

## 📋 Requisitos Previos

- Node.js (v20 o superior)
- Docker & Docker Compose (Recomendado)
- Cuenta en Coffee-Pay con credenciales de API.

## ⚙️ Configuración

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Edita el archivo `.env` con tus credenciales reales:
   - `ACCOUNT_KEY`: Tu llave pública de cuenta.
   - `INTEGRITY_KEY`: Tu llave de integridad (secreta).
   - `API_KEY` / `API_SECRET`: Credenciales para el SDK.

## 🚀 Ejecución

### Usando Docker (Recomendado)

```bash
docker compose up -d
```
El servidor estará disponible en [http://localhost:3500](http://localhost:3500).

### Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo watch
npm run start:dev
```

## 🔐 Seguridad: Generación de Firmas

A diferencia de las implementaciones básicas, este ejemplo **no expone** la `integrityKey` en el frontend. 

1. El frontend solicita una firma al endpoint `GET /api/payments/signature?timestamp=...`.
2. El servidor NestJS usa el SDK para generar la firma de forma segura.
3. El frontend recibe la firma y abre el widget.

## 📂 Estructura del Proyecto

- `src/coffee/`: Módulo global que instancia el SDK de Coffee-Pay.
- `src/payments/`: Controlador que gestiona firmas y configuración pública.
- `src/subscriptions/`: Lógica de negocio para planes de suscripción usando el SDK.
- `public/`: Archivos estáticos del frontend.
  - `script.js`: Lógica principal del Dashboard y pagos.
  - `create-plan.html / .js`: Interfaz de creación de planes.

---
Desarrollado como ejemplo oficial de integración para [Coffee-Pay](https://coffee-pay.co).
