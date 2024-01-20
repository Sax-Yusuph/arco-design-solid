import path from 'path';

const root = process.cwd();

function resolvePath(...relativePath: any[]) {
  return path.resolve(root, ...relativePath);
}

// components相关
const components = resolvePath('./src/components');

// icon相关
const icon = resolvePath('./src/icon');
const iconSvgs = resolvePath('./src/icon/_svgs');
const iconComponents = resolvePath('./src/components/icon');

export default {
  resolvePath,
  root,
  icon,
  iconSvgs,
  iconComponents,
  components,
};
