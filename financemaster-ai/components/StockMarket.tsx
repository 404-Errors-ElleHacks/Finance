import React, { useState, useEffect } from 'react';
import { Stock, UserState, Transaction, StockHistoryPoint } from '../types';
import { INITIAL_STOCKS } from '../constants';
import { StockChart } from './StockChart';
import { Button } from './Button';
import { getMarketAnalysis } from '../services/geminiService';
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';

interface StockMarketProps {
  userState: UserState;
  onTrade: (transaction: Transaction) => void;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

export const StockMarket: React.FC<StockMarketProps> = ({ userState, onTrade, setUserState }) => {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>(INITIAL_STOCKS[0].symbol);
  const [history, setHistory] = useState<Record<string, StockHistoryPoint[]>>({});
  const [marketNews, setMarketNews] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Trade state
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');

  const selectedStock = stocks.find(s => s.symbol === selectedStockSymbol) || stocks[0];
  const userHolding = userState.portfolio[selectedStockSymbol]?.quantity || 0;
  const portfolioItem = userState.portfolio[selectedStockSymbol];
  const quantity = portfolioItem?.quantity || 0;
  const avgCost = portfolioItem?.avgCost || 0;
  const profitLoss = quantity > 0 ? (selectedStock.price - avgCost) * quantity : 0;

  // Initialize history
  useEffect(() => {
    const initialHistory: Record<string, StockHistoryPoint[]> = {};
    INITIAL_STOCKS.forEach(stock => {
      initialHistory[stock.symbol] = Array.from({ length: 20 }).map((_, i) => ({
        time: new Date(Date.now() - (20 - i) * 1000).toLocaleTimeString(),
        price: stock.price * (1 + (Math.random() - 0.5) * 0.05)
      }));
    });
    setHistory(initialHistory);
  }, []);

  // Market Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        return prevStocks.map(stock => {
          const changePercent = (Math.random() - 0.5) * stock.volatility * 2; // Random walk
          const newPrice = Math.max(0.01, stock.price * (1 + changePercent));

          // Update history
          setHistory(prev => {
            const stockHistory = prev[stock.symbol] || [];
            const newHistory = [...stockHistory, {
              time: new Date().toLocaleTimeString(),
              price: newPrice
            }];
            if (newHistory.length > 30) newHistory.shift(); // Keep last 30 points
            return { ...prev, [stock.symbol]: newHistory };
          });

          return {
            ...stock,
            price: newPrice,
            change: newPrice - stock.price,
            changePercent: changePercent * 100
          };
        });
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // AI Analysis Trigger
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const analysis = await getMarketAnalysis(selectedStock);
    setMarketNews(analysis);
    setIsAnalyzing(false);
  };

  const handleTrade = () => {
    const qty = parseInt(tradeAmount);
    if (isNaN(qty) || qty <= 0) return;

    const cost = qty * selectedStock.price;

    if (tradeType === 'BUY') {
      if (userState.balance < cost) {
        alert("Insufficient funds!");
        return;
      }
      onTrade({
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        type: 'BUY',
        quantity: qty,
        price: selectedStock.price,
        date: new Date()
      });
    } else {
      if (userHolding < qty) {
        alert("Insufficient holdings!");
        return;
      }
      onTrade({
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        type: 'SELL',
        quantity: qty,
        price: selectedStock.price,
        date: new Date()
      });
    }
    setTradeAmount('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Inspirational Quote with Fade In */}
      <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl text-center text-xl sm:text-2xl md:text-3xl font-semibold shadow-sm animate-fade-in-up">
        "Investing in yourself is the first step to changing the world."
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stock List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Market Watch
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {stocks.map(stock => (
              <div 
                key={stock.symbol}
                onClick={() => {
                  setSelectedStockSymbol(stock.symbol);
                  setMarketNews(""); 
                }}
                className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedStockSymbol === stock.symbol ? 'bg-slate-50 border-l-4 border-l-emerald-500' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900">{stock.symbol}</h3>
                    <p className="text-xs text-slate-500">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">${stock.price.toFixed(2)}</p>
                    <p className={`text-xs font-semibold ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chart & Trade Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{selectedStock.name} ({selectedStock.symbol})</h2>
              <div className="flex items-center gap-4 mt-1">
                  <span className="text-2xl font-mono text-slate-700">${selectedStock.price.toFixed(2)}</span>
                  <span className={`px-2 py-1 rounded-md text-sm font-bold ${selectedStock.changePercent >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                  </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-slate-500">Your Holding</p>
              <p className="text-xl font-bold text-slate-800">{userHolding} Shares</p>
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
              <StockChart 
                  data={history[selectedStockSymbol] || []} 
                  color={selectedStock.changePercent >= 0 ? '#10b981' : '#ef4444'}
              />
          </div>

          {/* AI News Ticker */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl flex items-start gap-4 shadow-lg">
              <div className="mt-1">
                  <RefreshCw className={`w-5 h-5 text-blue-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
              </div>
              <div className="flex-1">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">AI Market Analyst</h4>
                  <p className="text-sm leading-relaxed">
                      {marketNews || "Click 'Analyze' to get AI-powered insights on this stock's recent movement."}
                  </p>
              </div>
              {!marketNews && (
                  <Button size="sm" variant="secondary" onClick={handleAnalyze} isLoading={isAnalyzing} className="shrink-0 border border-slate-700">
                      Analyze
                  </Button>
              )}
          </div>

          {/* Trading Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-slate-400" /> Trade {selectedStock.symbol}
                  </h3>
                  
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                      <button 
                          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${tradeType === 'BUY' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
                          onClick={() => setTradeType('BUY')}
                      >
                          Buy
                      </button>
                      <button 
                          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${tradeType === 'SELL' ? 'bg-white shadow-sm text-red-700' : 'text-slate-500 hover:text-slate-700'}`}
                          onClick={() => setTradeType('SELL')}
                      >
                          Sell
                      </button>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Quantity</label>
                          <input 
                              type="number" 
                              min="1"
                              value={tradeAmount}
                              onChange={(e) => setTradeAmount(e.target.value)}
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              placeholder="Amount to trade"
                          />
                      </div>
                      
                      <div className="flex justify-between text-sm text-slate-600 py-2 border-t border-slate-50">
                          <span>Estimated Total:</span>
                          <span className="font-mono font-bold">
                              ${(parseInt(tradeAmount || '0') * selectedStock.price).toFixed(2)}
                          </span>
                      </div>

                      <Button 
                          variant={tradeType === 'BUY' ? 'primary' : 'danger'} 
                          className="w-full"
                          onClick={handleTrade}
                          disabled={!tradeAmount || parseInt(tradeAmount) <= 0}
                      >
                          {tradeType} {selectedStock.symbol}
                      </Button>
                  </div>
              </div>

              {/* Portfolio Summary Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-4">Your Position</h3>
                  <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-500">Shares Owned</span>
                          <span className="font-bold text-slate-900">{userHolding}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-500">Market Value</span>
                          <span className="font-bold text-slate-900">${(userHolding * selectedStock.price).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-500">Avg Cost</span>
                          <span className="font-bold text-slate-900">${avgCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-500">Profit / Loss</span>
                        <span className={`font-bold ${
                          profitLoss > 0 ? 'text-emerald-600' : profitLoss < 0 ? 'text-red-600' : 'text-slate-900'
                        }`}>
                          ${profitLoss.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="flex items-start gap-2 text-sm text-slate-500">
                              <AlertCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                              <p>Tip: Buy low, sell high. Watch the volatility metric before investing.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
