const fs = require('fs');
const lines = fs.readFileSync('C:/Users/91620/.gemini/antigravity/brain/d9e38192-48ec-45b7-9f89-47b159c0a675/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');
for (const line of lines) {
  if (line.includes('"step_index":938') || line.includes('"step_index":895') || line.includes('"step_index":849')) {
    const obj = JSON.parse(line);
    console.log('--- Step', obj.step_index, '---');
    if (obj.thinking) console.log('Thinking:', obj.thinking.slice(0, 200));
    if (obj.tool_calls) {
      console.log('Tool call:', obj.tool_calls[0].name);
      if (obj.tool_calls[0].args.Path) console.log('Path:', obj.tool_calls[0].args.Path);
    }
  }
}
