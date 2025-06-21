import React from 'react';

const PageHeader = ({ title, description, gradient = "from-indigo-900 via-purple-900 to-pink-900" }) => {
  return (
    <div className={`relative bg-gradient-to-br ${gradient} py-20 overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader; 