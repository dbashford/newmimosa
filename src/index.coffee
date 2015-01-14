logger = null

printHelp = ->
  logger.green('  The new command will take you through a series of questions regarding what')
  logger.green('  JavaScript transpiler, CSS preprocessor, micro-templating library, server')
  logger.green('  and server view technology you would like to use to build your project. Once')
  logger.green('  you have answered the questions, Mimosa will create a directory using the name')
  logger.green('  you provided, and place a project skeleton inside of it.  That project skeleton')
  logger.green('  will by default include a basic application using the technologies you selected.')
  logger.blue( '\n    $ mimosa new [nameOfProject]\n')
  logger.green('  If you wish to copy the project skeleton into your current directory instead of')
  logger.green('  into a new one leave off the name.')
  logger.blue( '\n    $ mimosa new\n')

# need 3rd param so mimosa passes logger
exports.registerCommand = (_program, _logger, noop) ->
  program = _program
  logger = _logger
  program
    .command('new [name]')
    .description("create a skeleton matching Mimosa's defaults, which includes a basic Express setup")
    .option("-D, --mdebug", "run in debug mode")
    .action((name, opts) ->
      newProject = require("./new")
      newProject(program, logger, name, opts)
    ).on '--help', printHelp