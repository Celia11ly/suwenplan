const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

let timeoutId = null;

function syncToGit() {
  console.log('🔄 Detected changes, syncing to GitHub...');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (!status) return; // No changes

    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Auto sync from local changes"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('✅ Successfully synced to GitHub!');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

function watchDir(dir) {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    
    // Ignore updates inside .git or node_modules
    if (filename.includes('.git') || filename.includes('node_modules') || filename.includes('dist')) {
      return;
    }

    // Debounce the git push to prevent rapid firing
    clearTimeout(timeoutId);
    timeoutId = setTimeout(syncToGit, 3000);
  });
}

console.log('👁️ Watching for local updates to auto-push...');
watchDir(__dirname);
