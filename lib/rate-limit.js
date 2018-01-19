const debug = require('debug')('telegraf:ratelimit')
const MemoryStore = require('./memory-store.js')

module.exports = function limit (options) {
  const config = Object.assign({
    window: 1000,
    limit: 1,
    keyGenerator: function (ctx) {
      return ctx.from && ctx.from.id
    },
    onLimitExceeded: () => {}
  }, options)
  const store = new MemoryStore(config.window, config.limit)
  return (ctx, next) => {
    const key = config.keyGenerator(ctx)
    debug(key)
    if (!key || store.add(key)) return next()
    return config.onLimitExceeded(ctx, next)
  }
}
