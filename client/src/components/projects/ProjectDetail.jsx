import React, { useState } from "react";
import TaskBoard from "./TaskBoard";
import ActivityFeed from "./ActivityFeed";

const mockProject = {
  name: "Website Redesign",
  client: "Acme Corp",
  status: "In Progress",
  deadline: "2024-07-15",
  team: ["Alice", "Bob"],
  description: "Redesign the corporate website for Acme Corp.",
};

const tabs = ["Tasks", "Files", "Comments", "Activity Feed"];

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("Tasks");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{mockProject.name}</h2>
      <div className="mb-2 text-gray-600">Client: {mockProject.client}</div>
      <div className="mb-2">Status: <span className="font-semibold">{mockProject.status}</span></div>
      <div className="mb-2">Deadline: {mockProject.deadline}</div>
      <div className="mb-2">Team: {mockProject.team.join(", ")}</div>
      <div className="mb-4">{mockProject.description}</div>
      <div className="flex gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 -mb-px border-b-2 ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "Tasks" && <TaskBoard />}
        {activeTab === "Files" && <div>/* Files UI goes here */</div>}
        {activeTab === "Comments" && <div>/* Comments UI goes here */</div>}
        {activeTab === "Activity Feed" && <ActivityFeed />}
      </div>
    </div>
  );
} 