const program = require('commander');

program
  .command('init')
  .description('初始化项目')
  .action(function (options) {
    // todo
    console.log('init command');
  })

program.parse(process.argv);