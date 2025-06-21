import React, { useState } from 'react';

const GetInTouchForm = () => {
  const [result, setResult] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTicketNumber = () => {
    const date = new Date();
    const ymd = date.getFullYear().toString() + (date.getMonth()+1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `TKT-${ymd}-${rand}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setLoading(true);
    const formData = new FormData(event.target);
    const ticketNum = generateTicketNumber();
    formData.append("ticketNumber", ticketNum);
    formData.append("access_key", "7203cedb-c88e-49fd-9559-c83b4426bfcc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      setTicketNumber(ticketNum);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setTicketNumber("");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-white/80 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-white/80 mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          placeholder="Subject"
        />
      </div>
      <div>
        <label className="block text-white/80 mb-2">Message</label>
        <textarea
          name="message"
          required
          rows="4"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
          placeholder="Type your message here..."
        ></textarea>
      </div>
      {result && (
        <div className="mt-2 text-center text-white/80">
          {result}
          {ticketNumber && (
            <div className="mt-2 text-white/90 font-bold">Ticket Number: {ticketNumber}</div>
          )}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </div>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default GetInTouchForm; 