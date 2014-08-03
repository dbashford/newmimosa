var express = require('express');
var router = express.Router();

var index = function(config) {
  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload:    config.liveReload.enabled,
    optimize:  config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };

  // In the event plain html pages are being used, need to
  // switch to different page for optimized view
  var name = "index";
  if (config.isOptimize && config.server.views.html) {
    name += "-optimize";
  }

  router.get('/', function(req, res) {
    res.render(name, options);
  });

  return router;
};

exports.index = index