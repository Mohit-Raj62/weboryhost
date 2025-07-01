import React from "react";

const mockFeed = [
  { id: 1, user: "Alice", action: "created a new task", time: "2 min ago" },
  { id: 2, user: "Bob", action: "commented on a task", time: "5 min ago" },
  { id: 3, user: "Charlie", action: "uploaded a file", time: "10 min ago" },
  { id: 4, user: "David", action: "moved a task to Done", time: "15 min ago" },
];

export default function ActivityFeed() {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h4 className="font-bold mb-2">Activity Feed</h4>
      <ul className="space-y-2">
        {mockFeed.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>
              <span className="font-semibold">{item.user}</span> {item.action}
            </span>
            <span className="text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 