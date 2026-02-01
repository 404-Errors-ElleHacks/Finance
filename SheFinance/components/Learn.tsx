import React, { useState } from 'react';
import { Button } from './Button';
import { getFinancialTip } from '../services/geminiService';
import { Lightbulb, BookOpen, X } from 'lucide-react';

export const Learn: React.FC = () => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGetTip = async (topic: string) => {
    setLoading(true);
    setShowModal(true);
    const newTip = await getFinancialTip(topic);
    setTip(newTip);
    setLoading(false);
  };

  const categories = [
    {
      id: 'savings',
      label: 'Savings Strategies',
      desc: 'How to keep more of what you earn.',
      bg: 'bg-[#FF8299]/20',
      hoverBg: 'group-hover:bg-[#FF8299]',
      icon: 'text-[#FF8299]',
      hoverIcon: 'group-hover:text-white',
      buttonHover: 'hover:bg-[#FF8299]/10 hover:border-[#FF8299]/40 hover:text-[#FF8299]',
    },
    {
      id: 'investing',
      label: 'Investing Basics',
      desc: 'Growing your wealth over time.',
      bg: 'bg-yellow-100',
      hoverBg: 'group-hover:bg-yellow-400',
      icon: 'text-yellow-500',
      hoverIcon: 'group-hover:text-white',
      buttonHover: 'hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600',
    },
    {
      id: 'budgeting',
      label: 'Budgeting 101',
      desc: 'Tracking expenses and setting limits.',
      bg: 'bg-emerald-100',
      hoverBg: 'group-hover:bg-emerald-500',
      icon: 'text-emerald-600',
      hoverIcon: 'group-hover:text-white',
      buttonHover: 'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700',
    },
    {
      id: 'debt',
      label: 'Debt Management',
      desc: 'Strategies to become debt-free.',
      bg: 'bg-purple-100',
      hoverBg: 'group-hover:bg-purple-500',
      icon: 'text-purple-500',
      hoverIcon: 'group-hover:text-white',
      buttonHover: 'hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600',
    },
  ];

  const women = [
    {
      name: 'Jane Fraser',
      role: 'CEO of Citigroup',
      img: '/images/jane_fraser.jpg',
      info:
        'As the first woman to lead a major Wall Street bank, Jane Fraser is redefining leadership in finance. She inspires millions by breaking barriers, championing innovation, and promoting diversity across the global banking industry.',
    },
    {
      name: 'Abigail Johnson',
      role: 'CEO of Fidelity Investments',
      img: '/images/abigail_johnson.jpeg',
      info:
        'Abigail Johnson leads one of the world’s largest investment firms, guiding Fidelity with vision and innovation. Her leadership has expanded opportunities in wealth management while emphasizing technology and inclusion.',
    },
    {
      name: 'Janet Yellen',
      role: 'US Treasury Secretary',
      img: '/images/janet_yellen.jpg',
      info:
        'Janet Yellen made history as the first woman to chair the Federal Reserve and now serves as Treasury Secretary. Her expertise, steady guidance, and commitment to economic equity have shaped global financial policy.',
    },
    {
      name: 'Muriel Siebert',
      role: 'Wall Street Pioneer',
      img: '/images/muriel_siebert.png',
      info:
        'Known as the first woman to own a seat on the New York Stock Exchange, Muriel Siebert shattered gender barriers in finance. She championed transparency, education, and empowerment for future generations of investors.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Financial Tips Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Financial Knowledge Hub
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Click on a topic below to receive an instant tip tailored for beginners.
            Learn bite-sized lessons to improve your financial health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
            >
              <div
                className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center mb-4 transition-colors ${cat.hoverBg}`}
              >
                <BookOpen
                  className={`w-6 h-6 ${cat.icon} transition-colors ${cat.hoverIcon}`}
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {cat.label}
              </h3>
              <p className="text-slate-500 mb-6 h-10">{cat.desc}</p>

              <Button
                onClick={() => handleGetTip(cat.label)}
                variant="outline"
                className={`w-full ${cat.buttonHover}`}
              >
                Get {cat.label} Tip
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirational Women Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Inspirational Women in Finance
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Celebrating female leaders who shaped the world of finance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {women.map((woman, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  src={woman.img}
                  alt={woman.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {woman.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4">{woman.role}</p>
              <p className="text-slate-600">{woman.info}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
            <button
              onClick={() => {
                setShowModal(false);
                setTip(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb
                  className={`w-8 h-8 text-yellow-600 ${
                    loading ? 'animate-pulse' : ''
                  }`}
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {loading ? 'Generating Insight...' : 'Pro Tip'}
              </h3>

              {loading ? (
                <div className="space-y-3 w-full max-w-xs mx-auto">
                  <div className="h-2 bg-slate-100 rounded animate-pulse"></div>
                  <div className="h-2 bg-slate-100 rounded animate-pulse w-4/5 mx-auto"></div>
                  <div className="h-2 bg-slate-100 rounded animate-pulse w-3/5 mx-auto"></div>
                </div>
              ) : (
                <p className="text-lg text-slate-700 font-medium italic">
                  "{tip}"
                </p>
              )}

              <div className="mt-8 w-full">
                <Button
                  onClick={() => {
                    setShowModal(false);
                    setTip(null);
                  }}
                  className="w-full"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
