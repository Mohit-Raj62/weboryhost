import React, { useState, useEffect } from "react";

const themes = ["light", "dark"];
const layouts = ["list", "grid"];

export default function SettingsDashboard() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [layout, setLayout] = useState(() => localStorage.getItem("layout") || "list");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("layout", layout);
    document.body.className = theme;
  }, [theme, layout]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard Settings</h2>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border px-2 py-1 rounded w-full">
          {themes.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Layout</label>
        <select value={layout} onChange={(e) => setLayout(e.target.value)} className="border px-2 py-1 rounded w-full">
          {layouts.map((l) => (
            <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <div className="font-bold mb-1">Preview</div>
        <div className={`border p-4 rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
          style={{ display: layout === "grid" ? "grid" : "block", gridTemplateColumns: layout === "grid" ? "1fr 1fr" : undefined }}>
          <div className="p-2">Widget 1</div>
          <div className="p-2">Widget 2</div>
          <div className="p-2">Widget 3</div>
        </div>
      </div>
      <div className="text-green-600 font-bold">Preferences saved!</div>
    </div>
  );
} 