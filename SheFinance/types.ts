export enum ViewState {
  HOME = 'HOME',
  MARKET = 'MARKET',
  LEARN = 'LEARN',
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
  volatility: number; // 0-1, how much it moves
}

export interface StockHistoryPoint {
  time: string;
  price: number;
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgCost: number;
}

export interface UserState {
  balance: number;
  portfolio: Record<string, PortfolioItem>;
  totalEquity: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  date: Date;
}

export type MarketNews = {
  headline: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedSymbol?: string;
};
