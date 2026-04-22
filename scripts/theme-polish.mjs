import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // 1. Darken icons
      const iconContent = content.replace(/(<[A-Z][a-zA-Z0-9]*[^>]*className="[^"]*)text-\[var\(--color-primary\)\]([^"]*"[^>]*size={?\d+}?[^>]*\/>)/g, '$1text-[var(--color-primary-text)]$2')
                                .replace(/(<[A-Z][a-zA-Z0-9]*[^>]*size={?\d+}?[^>]*className="[^"]*)text-\[var\(--color-primary\)\]([^"]*"[^>]*\/>)/g, '$1text-[var(--color-primary-text)]$2')
                                .replace(/color="var\(--color-primary\)"/g, 'color="var(--color-primary-text)"');

      if (iconContent !== content) {
        content = iconContent;
        changed = true;
      }

      // 2. Update Empty States
      if (content.includes('IoIosWarning')) {
        const emptyStatePattern = /<div[^>]*className="flex flex-col items-center justify-center py-16 text-gray-400">[\s\S]*?<IoIosWarning size={48} className="text-yellow-400 mb-3" \/>[\s\S]*?<p[^>]*className="text-lg font-semibold text-gray-500">\s*([\s\S]*?)\s*<\/p>[\s\S]*?<p[^>]*className="text-sm text-gray-400 mt-1">\s*([\s\S]*?)\s*<\/p>[\s\S]*?<\/div>/g;
        
        const nextContent = content.replace(emptyStatePattern, (match, title, subtitle) => {
          changed = true;
          return `<div className="flex flex-col items-center justify-center py-16 px-6 bg-[var(--color-primary-tint)] rounded-3xl border border-[var(--color-primary-border)]/30">
          <IoIosWarning size={48} className="text-[var(--color-primary-light)] mb-3" />
          <p className="text-lg font-bold text-[var(--color-primary-text)] text-center">
            ${title.trim()}
          </p>
          <p className="text-sm text-[var(--color-primary-text)]/60 mt-1 font-medium text-center">
            ${subtitle.trim()}
          </p>
        </div>`;
        });

        if (nextContent !== content) {
          content = nextContent;
        }

        const tableEmptyPattern = /<div[^>]*className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 py-10">[\s\S]*?<IoIosWarning size={40} className="text-yellow-400" \/>[\s\S]*?<p[^>]*className="text-base font-medium text-gray-500">\s*([\s\S]*?)\s*<\/p>[\s\S]*?<\/div>/g;
        
        const finalContent = content.replace(tableEmptyPattern, (match, textExpr) => {
          changed = true;
          return `<div className="flex flex-col items-center justify-center h-full gap-3 py-10">
                  <IoIosWarning size={40} className="text-[var(--color-primary-light)]" />
                  <p className="text-base font-bold text-[var(--color-primary-text)] text-center">
                    ${textExpr.trim()}
                  </p>
                </div>`;
        });

        if (finalContent !== content) {
          content = finalContent;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Polished: ${fullPath}`);
      }
    }
  }
}

console.log('Starting theme polish...');
walk(rootDir);
console.log('Polish complete.');
