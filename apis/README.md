# 🔌 InvenTrack — APIs Tier

The **APIs** directory houses the client-side API SDK, endpoint services, and OpenAPI documentation for InvenTrack.

## 📁 Structure

```text
apis/
├── index.js             # Unified barrel export for all API modules
├── apiClient.js         # Base HTTP client with headers, error handling & token injection
├── authApi.js           # Single Sign-On and multi-role login & registration endpoints
├── inventoryApi.js      # Menu catalog and stock capacity delta adjustment
├── ordersApi.js         # Live order submission and Kanban token advancement
├── auditApi.js          # Executive KPI aggregation & CSV report generation
└── api-spec.json        # OpenAPI 3.0 specification for all REST endpoints
```

## 🚀 Quick Usage

```javascript
import { authApi, inventoryApi, ordersApi } from './apis/index.js';

// 1. Authenticate as Kitchen Staff
const authRes = await authApi.login({ loginId: 'KIT-104', role: 'kitchen' });

// 2. Fetch live menu items
const catalog = await inventoryApi.getItems();

// 3. Advance an order on the Kitchen Kanban board
await ordersApi.updateStatus('ord-101', 'Ready');
```
