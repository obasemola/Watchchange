#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of file to execute')
  .action(async ({ filename }) => {
      //filename = args.filename
    const name = filename || 'index.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }
    const start = debounce (() => {
      console.log('STARTING PROGRAM');
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

  program.parse(process.argv)