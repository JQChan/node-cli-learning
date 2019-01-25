#!/usr/bin/env node
console.log('Hi Welcome node cli')
console.log(process)
console.log('call %s', process.argv[2])

const program = require('commander');
const packageJSON = require('../package.json'); //  获取package.json
const path = require('path')

require('../src')

program
  .version(packageJSON.version)
  .option('-C, --chdir <path>', 'change the working directory') // hi -C path
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('setup')
  .description('run remote setup commands')
  .action(function () {
    console.log('setup');
  });

program
  .command('exec <cmd>')
  .description('run the given remote command')
  .action(function (cmd) {
    console.log('exec "%s"', cmd);
  });

program
  .command('teardown <dir> [otherDirs...]')
  .description('run teardown commands')
  .action(function (dir, otherDirs) {
    console.log('dir "%s"', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('dir "%s"', oDir);
      });
    }
  });

program
  .command('list')
  .description('列出当前活动文件夹下的所有文件')
  .option('-a, --all', 'Whether to display hidden files')
  .action(function (options) {
    const fs = require('fs');
    fs.readdir(process.cwd(), function (err, files) {
      let list = files;
      if (!options.all) {
        list = files.filter(function (file) {
          console.log(file)
          return file.indexOf('.') !== 0
        })
      }
      console.log(list.join('\n\r'));
    })
  })

program
  .command('*')
  .action(function (env) {
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);