import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  period = 'month', 
  features, 
  isPopular = false, 
  buttonText = 'Get Started',
  onSelect,
  gradient = 'from-cyan-500 to-purple-600'
}) => {
  return (
    <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 ${isPopular ? 'scale-105' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="text-4xl font-bold text-white mb-6">
        {typeof price === 'number' ? `$${price}` : price}
        {typeof price === 'number' && <span className="text-lg">/{period}</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/70">
            <span className="mr-2">✓</span> {feature}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelect && onSelect(title)}
        className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard; 