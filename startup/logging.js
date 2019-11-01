/* Exceptions and logging Configuration */
const winston = require('winston')

module.exports = () => {
  const customColors = {
    error: 'bold red',
    warn: 'italic bold yellow',
    info: 'italic cyan',
    verbose: 'blue',
    debug: 'magenta',
    silly: 'whiteBG'
  }

  let format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.colorize({ colors: customColors, all: true })
  )
  let myConsole = new winston.transports.Console({ format: format })

  winston.add(myConsole)
  winston.add(new winston.transports.File({ filename: 'logs/logfile.log' }))

  process.on('unhandledRejection', ex => {
    throw ex
  })

  winston.exceptions.handle(
    new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' }),
    myConsole
  )
}
