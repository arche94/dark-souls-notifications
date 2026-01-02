const { execSync } = require('child_process');
const pkg = require('../package.json');
const version = pkg.version;

execSync(`git tag v${version}`, { stdio: 'inherit' });
execSync(`git push origin v${version}`, { stdio: 'inherit' });
