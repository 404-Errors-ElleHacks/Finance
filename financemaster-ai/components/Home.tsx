import React from 'react';
import { ViewState } from '../types';
import { Button } from './Button';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onLearn: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onLearn }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-[#FF96A8]/20 text-[#FF96A8] text-sm font-semibold mb-6">
            Empowering Women to Trade
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Your Financial Confidence <br />
            <span className="text-[#76E37F]">Starts Here</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice stock trading using virtual currency in a supportive, low-pressure space designed for women. Explore strategies, analyze trends, and get personalized guidance from our AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Main Button updated to #FF96A8 */}
            <Button
              size="lg"
              onClick={onStart}
              className="bg-[#FF96A8] text-white shadow-lg shadow-[#FF96A8]/40 hover:bg-[#ff7d92] border-none transition-all"
            >
              Start Trading Now <ArrowRight className="ml-2 w-5 h-5 text-white" />
            </Button>
            <Button size="lg" variant="outline" onClick={onLearn}>
              Learn Basics First
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-[#FF96A8]/10 border border-slate-100 hover:shadow-xl transition-shadow hover:shadow-[#FF96A8]/30">
              <div className="w-12 h-12 bg-[#FF96A8]/20 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#FF96A8]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Simulation</h3>
              <p className="text-slate-600">
                Trade on a live simulated market with volatile stocks that react to generated news events.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#FFE066]/20 border border-slate-100 hover:shadow-xl transition-shadow hover:shadow-[#FFE066]/40">
              <div className="w-12 h-12 bg-[#FFE066]/30 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#FFE066]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Risk-Free Learning</h3>
              <p className="text-slate-600">
                Start with $10,000 virtual cash. Make mistakes here so you don't make them with real money.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#B58CFF]/20 border border-slate-100 hover:shadow-xl transition-shadow hover:shadow-[#B58CFF]/40">
              <div className="w-12 h-12 bg-[#B58CFF]/30 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#B58CFF]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Insights</h3>
              <p className="text-slate-600">
                Get instant "Tips & Tricks" powered by Gemini to improve your financial literacy on demand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
