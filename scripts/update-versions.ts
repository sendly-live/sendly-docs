#!/usr/bin/env npx tsx

/**
 * Update SDK version references in Docu-Flow documentation
 * Run: npx tsx scripts/update-versions.ts <version>
 * Example: npx tsx scripts/update-versions.ts 2.2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_FILE = path.join(__dirname, '../client/src/data/docsContent.tsx');

function updateVersions(version: string): { changes: number } {
  let content = fs.readFileSync(DOCS_FILE, 'utf-8');
  const originalContent = content;
  let changes = 0;

  // Pattern 1: version: "1.0.0" in SDK objects
  content = content.replace(
    /version:\s*["']\d+\.\d+\.\d+["']/g,
    () => {
      changes++;
      return `version: "${version}"`;
    }
  );

  // Pattern 2: <version>1.0.0</version> in Maven examples
  content = content.replace(
    /<version>\d+\.\d+\.\d+<\/version>/g,
    () => {
      changes++;
      return `<version>${version}</version>`;
    }
  );

  // Pattern 3: Gradle implementation strings
  content = content.replace(
    /(com\.sendly:sendly-java:)\d+\.\d+\.\d+/g,
    (_, prefix) => {
      changes++;
      return `${prefix}${version}`;
    }
  );

  content = content.replace(
    /(live\.sendly:sendly-java:)\d+\.\d+\.\d+/g,
    (_, prefix) => {
      changes++;
      return `${prefix}${version}`;
    }
  );

  // Pattern 4: sendly/1.0.0 in CLI examples
  content = content.replace(
    /(sendly\/)\d+\.\d+\.\d+/g,
    (_, prefix) => {
      changes++;
      return `${prefix}${version}`;
    }
  );

  if (content !== originalContent) {
    fs.writeFileSync(DOCS_FILE, content);
  }

  return { changes };
}

const version = process.argv[2];
if (!version) {
  console.error('Usage: npx tsx scripts/update-versions.ts <version>');
  console.error('Example: npx tsx scripts/update-versions.ts 2.2.0');
  process.exit(1);
}

console.log(`\nUpdating Docu-Flow versions to ${version}\n`);
const result = updateVersions(version);
console.log(`Done! Made ${result.changes} replacements.`);
