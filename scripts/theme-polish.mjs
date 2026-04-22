import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', 'src');

const COLORS_TO_REPLACE = [
  'purple', 'indigo', 'blue', 'emerald', 'teal', 'cyan', 'rose', 'pink', 'violet'
];

// We treat 'amber' and 'orange' separately as they are often decorative but sometimes warning
const DECORATIVE_COLORS = ['amber', 'orange'];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // 1. Core Primary Variable Normalize
      content = content.replace(/color="var\(--color-primary\)"/g, 'color="var(--color-primary-text)"');

      // 2. Comprehensive Regex for Tailwind Colors
      // Handles bg-, text-, border-, from-, to-, via-, ring-, focus:ring-, etc.
      const prefixPattern = '(bg|text|border|from|to|via|ring|focus:ring)';
      const allColors = [...COLORS_TO_REPLACE, ...DECORATIVE_COLORS];
      
      allColors.forEach(color => {
        // Pattern for -50 or -100 (Tints/Softs)
        const tintRegex = new RegExp(`${prefixPattern}-${color}-(50|100)(\\/\\d+)?`, 'g');
        content = content.replace(tintRegex, (match, prefix, shade) => {
          if (shade === '50') return `${prefix}-[var(--color-primary-tint)]`;
          return `${prefix}-[var(--color-primary-soft)]`;
        });

        // Pattern for -200 to -400 (Borders/Lights)
        const lightRegex = new RegExp(`${prefixPattern}-${color}-(200|300|400)(\\/\\d+)?`, 'g');
        content = content.replace(lightRegex, (match, prefix) => {
          if (prefix === 'text') return `${prefix}-[var(--color-primary-light)]`;
          if (prefix === 'border' || prefix === 'from' || prefix === 'to') return `${prefix}-[var(--color-primary-border)]`;
          return `${prefix}-[var(--color-primary-soft)]`;
        });

        // Pattern for -500 to -600 (Primary/Standard)
        const primaryRegex = new RegExp(`${prefixPattern}-${color}-(500|600)(\\/\\d+)?`, 'g');
        content = content.replace(primaryRegex, (match, prefix) => {
          if (prefix === 'text') return `${prefix}-[var(--color-primary)]`;
          return `${prefix}-[var(--color-primary)]`;
        });

        // Pattern for -700 to -950 (Darks/Text)
        const darkRegex = new RegExp(`${prefixPattern}-${color}-(700|800|900|950)(\\/\\d+)?`, 'g');
        content = content.replace(darkRegex, (match, prefix) => {
          return `${prefix}-[var(--color-primary-text)]`;
        });
      });

      // 3. Icon specific normalization (ensure icons are dark enough)
      content = content
        .replace(/(<[A-Z][a-zA-Z0-9]*[^>]*className="[^"]*)text-\[var\(--color-primary\)\]([^"]*"[^>]*size={?\d+}?[^>]*\/>)/g, '$1text-[var(--color-primary-text)]$2')
        .replace(/(<[A-Z][a-zA-Z0-9]*[^>]*size={?\d+}?[^>]*className="[^"]*)text-\[var\(--color-primary\)\]([^"]*"[^>]*\/>)/g, '$1text-[var(--color-primary-text)]$2');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting God-Mode theme polish...');
walk(rootDir);
console.log('God-Mode theme polish complete.');
