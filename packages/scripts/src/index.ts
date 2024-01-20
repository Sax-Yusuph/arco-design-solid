#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import icongen from './icongen';
// import screentshotTest from './scripts/test/screentshot';

const program = new Command();

const packageContent = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  'utf8'
);
const packageData: any = JSON.parse(packageContent);

program
  .version(packageData.version)
  .name('arco-solid-scripts')
  .usage('command [options]');

program
  .command('icongen')
  .description('generate icon components.')
  .action(() => {
    icongen();
  });

program.parse(process.argv);
