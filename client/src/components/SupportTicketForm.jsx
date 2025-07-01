import React, { useState } from 'react';

const SupportTicketForm = () => {
  const [result, setResult] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTicketNumber = () => {
    const date = new Date();
    const ymd = date.getFullYear().toString() + (date.getMonth()+1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SUP-${ymd}-${rand}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const issueType = form.issueType.value;
    const description = form.description.value;
    const ticketNum = generateTicketNumber();

    // Build web3FormsData
    const web3FormsData = {
      access_key: "7203cedb-c88e-49fd-9559-c83b4426bfcc",
      from_name: "Webory Support Ticket",
      subject: `New Support Ticket #${ticketNum} from ${name}`,
      form_type: 'Support Ticket',
      ticketNumber: ticketNum,
      name,
      email,
      issueType,
      description
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(web3FormsData)
      });
      const data = await response.json();
      if (data.success) {
        setResult("Support Ticket Submitted Successfully!");
        setTicketNumber(ticketNum);
        form.reset();
      } else {
        setResult(data.message);
        setTicketNumber("");
      }
    } catch (error) {
      setResult("Submission failed. Please try again.");
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
        <label className="block text-white/80 mb-2">Issue Type</label>
        <select
          name="issueType"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
        >
          <option value="">Select issue type</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="Billing Question">Billing Question</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Feature Request">Feature Request</option>
        </select>
      </div>
      <div>
        <label className="block text-white/80 mb-2">Description</label>
        <textarea
          name="description"
          required
          rows="4"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
          placeholder="Please describe your issue in detail"
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
          "Submit Ticket"
        )}
      </button>
    </form>
  );
};

export default SupportTicketForm; 