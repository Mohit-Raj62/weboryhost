import React, { useState } from "react";

const mockInvoices = [
  { id: 1, client: "Acme Corp", totalAmount: 1200, status: "sent", dueDate: "2024-07-10" },
  { id: 2, client: "Beta Ltd", totalAmount: 800, status: "paid", dueDate: "2024-06-15" },
];

export default function InvoiceDashboard() {
  const [loadingId, setLoadingId] = useState(null);

  const handlePay = async (invoiceId) => {
    setLoadingId(invoiceId);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/stripe-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session");
      }
    } catch (err) {
      alert("Payment error: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Client</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockInvoices.map((inv) => (
            <tr key={inv.id} className="border-t">
              <td className="p-2">{inv.client}</td>
              <td className="p-2">${inv.totalAmount}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">{inv.dueDate}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600">View</button>
                <button className="text-green-600">Edit</button>
                <button className="text-red-600">Delete</button>
                {inv.status !== "paid" && (
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handlePay(inv.id)}
                    disabled={loadingId === inv.id}
                  >
                    {loadingId === inv.id ? "Redirecting..." : "Pay"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">+ New Invoice</button>
    </div>
  );
} 