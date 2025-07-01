import React, { useState } from "react";

const initialColumns = {
  "To Do": [
    { id: 1, title: "Design homepage", assignee: "Alice" },
    { id: 2, title: "Set up repo", assignee: "Bob" },
  ],
  "In Progress": [
    { id: 3, title: "Develop login page", assignee: "Charlie" },
  ],
  Done: [
    { id: 4, title: "Gather requirements", assignee: "David" },
  ],
};

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);
  // Placeholder for drag-and-drop logic

  return (
    <div className="flex gap-6 p-6 overflow-x-auto">
      {Object.entries(columns).map(([col, tasks]) => (
        <div key={col} className="bg-gray-100 rounded p-4 min-w-[250px] flex-1">
          <h3 className="font-bold mb-2">{col}</h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-2 rounded shadow flex justify-between items-center">
                <span>{task.title}</span>
                <span className="text-xs text-gray-500">{task.assignee}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 