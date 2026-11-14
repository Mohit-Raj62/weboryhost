import fs from 'fs';

async function run() {
  const js = await (await fetch('https://techservenexus.com/_next/static/chunks/bd49aa00e8e59e32.js')).text();
  const start = js.indexOf('C=({src:e,showGradient:r,title:n,badge:o})=>');
  // Find preceding helper definitions like A, I, R, z, KBtn etc.
  const idxA = js.indexOf('A=()=>(0,t.jsx)("svg"');
  console.log('start C:', start, 'idxA:', idxA);
  const code = js.slice(idxA - 5000, start + 4000);
  fs.writeFileSync('c:/Users/91620/Desktop/Webory/tsn_chunk_slice.txt', code);
  console.log('Saved slice, length:', code.length);
}
run();
