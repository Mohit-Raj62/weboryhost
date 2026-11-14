const fs = require('fs');

function extract(stepIndex, outFile) {
  const content = fs.readFileSync('C:/Users/91620/.gemini/antigravity/brain/d9e38192-48ec-45b7-9f89-47b159c0a675/.system_generated/logs/transcript_full.jsonl', 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line);
    if (obj.step_index === stepIndex && obj.tool_calls && obj.tool_calls[0].name === 'write_file') {
      let fileContent = obj.tool_calls[0].args.Content;
      // If fileContent has leading/trailing quote, or is JSON-encoded
      if (fileContent.startsWith('"') && fileContent.endsWith('"')) {
        try {
          fileContent = JSON.parse(fileContent);
        } catch (e) {
          fileContent = fileContent.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }
      }
      fs.writeFileSync(outFile, fileContent);
      console.log(`Saved step ${stepIndex} to ${outFile} (${fileContent.length} chars)`);
      return;
    }
  }
}

extract(849, 'c:/Users/91620/Desktop/Webory/step849_macbook.jsx');
extract(895, 'c:/Users/91620/Desktop/Webory/step895_macbook.jsx');
