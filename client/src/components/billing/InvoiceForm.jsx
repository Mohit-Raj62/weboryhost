import React, { useState } from "react";

export default function InvoiceForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    client: initial.client || "",
    project: initial.project || "",
    items: initial.items || [{ description: "", quantity: 1, unitPrice: 0 }],
    dueDate: initial.dueDate || "",
    status: initial.status || "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleItemChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const items = [...f.items];
      items[idx][name] = name === "quantity" || name === "unitPrice" ? Number(value) : value;
      return { ...f, items };
    });
  };

  const addItem = () => {
    setForm((f) => ({ ...f, items: [...f.items, { description: "", quantity: 1, unitPrice: 0 }] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <form className="p-6 bg-white rounded shadow max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{initial.id ? "Edit Invoice" : "New Invoice"}</h2>
      <div className="mb-2">
        <label className="block mb-1">Client</label>
        <input name="client" value={form.client} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Project</label>
        <input name="project" value={form.project} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Items</label>
        {form.items.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-1">
            <input
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(idx, e)}
              placeholder="Description"
              className="border px-2 py-1 rounded flex-1"
              required
            />
            <input
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, e)}
              className="border px-2 py-1 rounded w-20"
              min={1}
              required
            />
            <input
              name="unitPrice"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(idx, e)}
              className="border px-2 py-1 rounded w-24"
              min={0}
              required
            />
          </div>
        ))}
        <button type="button" className="text-blue-600 mt-1" onClick={addItem}>+ Add Item</button>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Due Date</label>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="border px-2 py-1 rounded w-full">
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
} 