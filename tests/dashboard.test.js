const assert = require('assert');
const { test, describe } = require('node:test');
const MarketTracker = require('../app.js');

describe('CryptoStock Dashboard Unit Tests', () => {
  test('returns initial assets list', () => {
    const tracker = new MarketTracker();
    const assets = tracker.getAssets();
    assert.strictEqual(assets.length, 4);
    assert.strictEqual(assets[0].symbol, 'BTC');
  });

  test('searchAssets filters by query string', () => {
    const tracker = new MarketTracker();
    const result = tracker.searchAssets('sol');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].name, 'Solana');
  });

  test('setAlert registers price alert correctly', () => {
    const tracker = new MarketTracker();
    const alert = tracker.setAlert('BTC', 65000, 'above');
    assert.strictEqual(alert.symbol, 'BTC');
    assert.strictEqual(alert.targetPrice, 65000);
  });

  test('checkAlerts triggers alert when price threshold is met', () => {
    const tracker = new MarketTracker();
    tracker.setAlert('BTC', 64000, 'above');
    const triggered = tracker.checkAlerts();
    assert.strictEqual(triggered.length, 1);
    assert.strictEqual(triggered[0].symbol, 'BTC');
  });
});
