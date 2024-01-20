import fs from 'fs-extra';
import path from 'path';

let cache: Record<string, any>;

export const getPackage = async () => {
  if (!cache) {
    const content = await fs.readFile(
      path.resolve(process.cwd(), 'package.json'),
      'utf8'
    );
    try {
      cache = JSON.parse(content);
    } catch {}
  }

  return cache ?? {};
};

/**
 * "devDependencies": {
    "@types/fs-extra": "^9.0.6",
    "@types/inquirer": "^7.3.3",
    "@types/jest": "^26.0.24",
    "@types/jsdom": "^16.2.11",
    "@types/less": "^3.0.2",
    "@types/nunjucks": "^3.1.5",
    "@types/svgo": "^2.3.0",
    "@typescript-eslint/eslint-plugin": "^4.18.0",
    "@typescript-eslint/parser": "^4.12.0",
    "eslint": "^7.21.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-import-resolver-typescript": "^2.4.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^3.3.1",
    "prettier": "^2.2.1",
    "ts-node": "^10.1.0"
  }
	tsc && node copy-template.js
 */
