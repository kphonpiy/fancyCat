#!/usr/bin/env node
const fs = require('fs');

const file = process.argv[2];

if (!file) {
  console.error('Usage: node fancyCat.js <filename>');
  process.exit(1);
}

try {
  if (fs.statSync(file).isDirectory()) {
    console.error(`Error: "${file}" is a directory, not a file.`);
    process.exit(1);
  }

  const data = fs.readFileSync(file, 'utf8');

  if (data.length === 0) {
    console.log('(empty file)');
    console.log('Total lines: 0');
    process.exit(0);
  }

  // Handle both Unix (\n) and Windows (\r\n) line endings
  const lines = data.split(/\r?\n/);
  if (lines[lines.length - 1] === '') lines.pop(); // ignore trailing newline

  const width = String(lines.length).length;
  lines.forEach((line, i) => {
    console.log(`${String(i + 1).padStart(width)} | ${line}`);
  });

  console.log(`\nTotal lines: ${lines.length}`);
} catch (err) {
  if (err.code === 'ENOENT') console.error(`Error: file "${file}" not found.`);
  else if (err.code === 'EACCES') console.error(`Error: permission denied for "${file}".`);
  else console.error(`Error: ${err.message}`);
  process.exit(1);
}
