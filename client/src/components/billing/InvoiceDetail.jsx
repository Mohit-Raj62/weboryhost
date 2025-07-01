import React from "react";

const mockInvoice = {
  id: 1,
  client: "Acme Corp",
  project: "Website Redesign",
  items: [
    { description: "Design", quantity: 1, unitPrice: 800 },
    { description: "Development", quantity: 1, unitPrice: 400 },
  ],
  totalAmount: 1200,
  status: "sent",
  dueDate: "2024-07-10",
};

export default function InvoiceDetail() {
  const handleDownloadPDF = () => {
    alert("PDF download coming soon!");
  };
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Invoice #{mockInvoice.id}</h2>
      <div className="mb-2">Client: <span className="font-semibold">{mockInvoice.client}</span></div>
      <div className="mb-2">Project: {mockInvoice.project}</div>
      <div className="mb-2">Status: <span className="font-semibold">{mockInvoice.status}</span></div>
      <div className="mb-2">Due Date: {mockInvoice.dueDate}</div>
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Unit Price</th>
            <th className="p-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {mockInvoice.items.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{item.description}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.unitPrice}</td>
              <td className="p-2">${item.quantity * item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold text-lg mb-4">Total: ${mockInvoice.totalAmount}</div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
} 