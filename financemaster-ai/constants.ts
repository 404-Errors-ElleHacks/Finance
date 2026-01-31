import { Stock } from './types';

export const INITIAL_BALANCE = 10000;

export const INITIAL_STOCKS: Stock[] = [
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.50, change: 0, changePercent: 0, category: 'Tech', volatility: 0.02 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 180.25, change: 0, changePercent: 0, category: 'Retail', volatility: 0.025 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 240.10, change: 0, changePercent: 0, category: 'Auto', volatility: 0.04 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 215.00, change: 0, changePercent: 0, category: 'Tech', volatility: 0.015 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 920.00, change: 0, changePercent: 0, category: 'Tech', volatility: 0.035 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.80, change: 0, changePercent: 0, category: 'Finance', volatility: 0.01 },
  { symbol: 'KO', name: 'Coca-Cola', price: 62.50, change: 0, changePercent: 0, category: 'Consumer', volatility: 0.005 },
];

export const MOCK_TIPS = [
  "Pay yourself first: set aside savings before spending on discretionary items.",
  "The 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
  "Compound interest is the eighth wonder of the world. Start investing early.",
  "Diversification reduces risk. Don't put all your eggs in one basket.",
  "An emergency fund should cover 3-6 months of living expenses.",
];
