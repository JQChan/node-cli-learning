const program = require('commander');

program.parse(process.argv);  //  解释用户输入的命令

require('./command/' + program.args + '.js'); //  根据不同命令转到不同的命令处理文件