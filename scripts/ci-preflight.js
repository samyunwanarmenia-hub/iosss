#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const errors = [];
const warnings = [];

const cwd = process.cwd();

const requireFile = (relativePath, label = relativePath) => {
  const full = path.join(cwd, relativePath);
  if (!existsSync(full)) {
    errors.push(`Missing ${label} at ${relativePath}`);
    return null;
  }
  return full;
};

const checkJson = (relativePath, label = relativePath) => {
  const full = requireFile(relativePath, label);
  if (!full) return null;
  try {
    return JSON.parse(readFileSync(full, 'utf8'));
  } catch (e) {
    errors.push(`Invalid JSON in ${label}: ${e.message}`);
    return null;
  }
};

// Project structure
requireFile('package.json');
requireFile('next.config.mjs', 'Next config');
const appDir = existsSync(path.join(cwd, 'src', 'app'));
const pagesDir = existsSync(path.join(cwd, 'src', 'pages'));
if (!appDir && !pagesDir) {
  errors.push('Neither src/app nor src/pages found (Next.js entrypoints missing)');
}

// Capacitor config
const capConfig = checkJson('capacitor.config.json', 'Capacitor config');
if (capConfig) {
  const webDir = capConfig.webDir || capConfig?.server?.url;
  if (webDir !== '.next') {
    errors.push(`Capacitor webDir expected ".next" for SSR build, got "${webDir}"`);
  } else if (!existsSync(path.join(cwd, webDir))) {
    errors.push(`Capacitor webDir ".next" does not exist. Run CAPACITOR=true npm run build`);
  }
}

// PWA assets
['public/manifest.json', 'public/service-worker.js', 'public/offline.html'].forEach(file =>
  requireFile(file, `PWA asset ${file}`),
);

// Next build artifacts
const buildIdFile = path.join(cwd, '.next', 'BUILD_ID');
const nextIndex = path.join(cwd, '.next', 'index.html');
if (!existsSync(buildIdFile)) {
  errors.push('Missing .next/BUILD_ID. Run CAPACITOR=true npm run build');
}
if (!existsSync(nextIndex)) {
  errors.push('Missing .next/index.html placeholder (run postbuild or scripts/prepare-capacitor-index.js)');
}

// Basic package verification
try {
  const pkg = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  ['@capacitor/core', '@capacitor/ios', '@capacitor/cli'].forEach(dep => {
    if (!deps?.[dep]) {
      errors.push(`Dependency ${dep} is not installed (package.json)`);
    }
  });
  if (pkg.scripts?.build !== 'next build') {
    warnings.push('package.json build script is not the standard "next build"');
  }
} catch (e) {
  errors.push(`Failed to read package.json: ${e.message}`);
}

if (errors.length) {
  console.error('❌ CI preflight failed:');
  errors.forEach(err => console.error(` - ${err}`));
  if (warnings.length) {
    console.warn('Warnings:');
    warnings.forEach(w => console.warn(` - ${w}`));
  }
  process.exit(1);
}

console.log('✅ CI preflight passed.');
if (warnings.length) {
  warnings.forEach(w => console.warn(`Warning: ${w}`));
}
