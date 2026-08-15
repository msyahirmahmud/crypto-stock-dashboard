/**
 * CryptoStock Dashboard Engine
 */

class MarketTracker {
  constructor() {
    this.assets = [
      { id: "btc", name: "Bitcoin", symbol: "BTC", price: 64250.00, change24h: 3.45, history: [62000, 62800, 63100, 62900, 64250] },
      { id: "eth", name: "Ethereum", symbol: "ETH", price: 3450.50, change24h: -1.20, history: [3500, 3520, 3480, 3410, 3450.5] },
      { id: "sol", name: "Solana", symbol: "SOL", price: 145.20, change24h: 8.75, history: [130, 135, 138, 140, 145.2] },
      { id: "aapl", name: "Apple Inc.", symbol: "AAPL", price: 224.30, change24h: 0.85, history: [221, 222, 223, 223.5, 224.3] }
    ];
    this.alerts = [];
  }

  getAssets() {
    return this.assets;
  }

  searchAssets(query) {
    if (!query) return this.assets;
    const q = query.toLowerCase();
    return this.assets.filter(a => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q));
  }

  setAlert(symbol, targetPrice, condition = 'above') {
    const alert = {
      id: `alert-${Date.now()}`,
      symbol: symbol.toUpperCase(),
      targetPrice: parseFloat(targetPrice),
      condition,
      active: true
    };
    this.alerts.push(alert);
    return alert;
  }

  checkAlerts() {
    const triggered = [];
    this.alerts.forEach(alert => {
      if (!alert.active) return;
      const asset = this.assets.find(a => a.symbol === alert.symbol);
      if (!asset) return;

      if (alert.condition === 'above' && asset.price >= alert.targetPrice) {
        triggered.push(alert);
        alert.active = false;
      } else if (alert.condition === 'below' && asset.price <= alert.targetPrice) {
        triggered.push(alert);
        alert.active = false;
      }
    });
    return triggered;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarketTracker;
}
