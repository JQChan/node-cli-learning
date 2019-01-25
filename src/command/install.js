const program = require('commander')

program
  .command('install')
  .description('安装项目')
  .action(function (options) {
    console.log('install command');
  });

program.parse(process.argv);