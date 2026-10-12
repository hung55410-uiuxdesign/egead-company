import { execSync, spawnSync } from 'node:child_process';

const DEFAULT_DATABASE_URL = 'mysql://root@localhost:3306/egead';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/prisma-with-env.mjs <prisma-args...>');
  process.exit(1);
}

function hasCommand(command) {
  try {
    execSync(process.platform === 'win32' ? `where ${command}` : `which ${command}`, {
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

const runner = hasCommand('bunx') ? 'bunx' : 'npx';
const result = spawnSync(runner, ['prisma', ...args], {
  stdio: 'inherit',
  env: process.env,
  shell: true,
});

process.exit(result.status ?? 1);
