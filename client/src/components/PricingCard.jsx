import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  period,
  features, 
  isPopular = false, 
  buttonText = 'Get Started',
  onSelect
}) => {
  return (
    <div className={`relative bg-white rounded-2xl p-8 border ${isPopular ? 'border-blue-600 shadow-xl shadow-blue-500/10 scale-105' : 'border-slate-200 shadow-sm'} transition-all duration-300`}>
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-md">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
        {typeof price === 'number' ? `₹${price.toLocaleString()}` : String(price).replace(/\$/g, '₹')}
        {period && <span className="text-sm font-normal text-slate-500">/{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-slate-600">
            <span className="mr-2.5 text-blue-600 font-bold">✓</span> {feature}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelect && onSelect(title)}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
          isPopular
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
