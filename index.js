var _ = require('underscore')

module.exports = function(target) {
  var subscribers = {}
    , previous = {}

  target.ALL = 'all'
  target.FUTURE = 'future'

  target.on = function(name, cb, mode) {
    if (!mode) mode = target.ALL
    if (mode === target.ALL)
      _.each(previous[name], function(args) { cb.apply(null, args) })
    var listeners = subscribers[name]
    if (!listeners) subscribers[name] = listeners = []
    listeners.push(cb)
  }

  target.fire = function(name) {
    var args = _.rest(arguments)
      , past = previous[name]
    if (!past) previous[name] = past = []
    past.push(args)
    _.each(subscribers[name], function(cb) { cb.apply(null, args) })
  }
}
