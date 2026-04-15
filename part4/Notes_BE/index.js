// entry point of application, starts server, no route logic
// starts the app, does not know business logic

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// listening to port
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})