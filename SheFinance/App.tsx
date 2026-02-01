import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { StockMarket } from './components/StockMarket';
import { Learn } from './components/Learn';
import { ViewState, UserState, Transaction } from './types';
import { INITIAL_BALANCE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  
  // Global App State
  const [userState, setUserState] = useState<UserState>({
    balance: INITIAL_BALANCE,
    portfolio: {},
    totalEquity: INITIAL_BALANCE
  });

  const handleTrade = (tx: Transaction) => {
    setUserState(prev => {
      const { symbol, quantity, price, type } = tx;
      const cost = quantity * price;
      
      let newBalance = prev.balance;
      const newPortfolio = { ...prev.portfolio };

      if (type === 'BUY') {
        newBalance -= cost;
        const existingItem = newPortfolio[symbol];
        if (existingItem) {
          const totalCost = (existingItem.quantity * existingItem.avgCost) + cost;
          const newQuantity = existingItem.quantity + quantity;
          newPortfolio[symbol] = {
            symbol,
            quantity: newQuantity,
            avgCost: totalCost / newQuantity
          };
        } else {
          newPortfolio[symbol] = {
            symbol,
            quantity,
            avgCost: price
          };
        }
      } else {
        newBalance += cost;
        const existingItem = newPortfolio[symbol];
        if (existingItem) {
          const newQuantity = existingItem.quantity - quantity;
          if (newQuantity <= 0) {
            delete newPortfolio[symbol];
          } else {
            newPortfolio[symbol] = {
              ...existingItem,
              quantity: newQuantity
            };
          }
        }
      }

      return {
        ...prev,
        balance: newBalance,
        portfolio: newPortfolio
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        balance={userState.balance} 
      />
      
      <main className="animate-fade-in">
        {currentView === ViewState.HOME && (
          <Home 
            onStart={() => setCurrentView(ViewState.MARKET)} 
            onLearn={() => setCurrentView(ViewState.LEARN)} 
          />
        )}
        
        {currentView === ViewState.MARKET && (
          <StockMarket 
            userState={userState} 
            onTrade={handleTrade} 
            setUserState={setUserState}
          />
        )}
        
        {currentView === ViewState.LEARN && (
          <Learn />
        )}
      </main>
    </div>
  );
};

export default App;
