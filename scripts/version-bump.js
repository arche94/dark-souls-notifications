const { execSync } = require('child_process');
const pkg = require('../package.json');
const version = pkg.version;

execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "Bump v${version}"`, { stdio: 'inherit' });
execSync(`git push`, { stdio: 'inherit' });
