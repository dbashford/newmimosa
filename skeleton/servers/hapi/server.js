var Hapi = require('hapi');

exports.startServer = function (config, callback) {
  var port = process.env.PORT || config.server.port;
  var serverOptions = {
    views: {
      path: config.server.views.path,
      engines: {
        <% if (view === "handlebars") { %>hbs: require('handlebars')
        <% } else if (view === "jade") { %>jade: require('jade')
        <% } else if (view === "ejs") { %>ejs: require('ejs')
        <% } else if (view === "html") { %>html: require('ejs')
        <% } else if (view === "hogan") { %>hjs: {
          module: {
            compile: function (template, options) {
              var engine = require('hogan.js');
              var tmpl = engine.compile(template, options);
              return function (options) {
                return tmpl.render(options, {});
              }
            }
          }
        }
        <% } else if (view === "dust") { %>dust: {
          compileMode: 'async',
          module: {
            compile: function (template, options, next) {
              var engine = require('dustjs-linkedin');
              var compiled = engine.compileFn(template);
              next(null, function (context, options, callback) {
                return compiled(context, callback);
              });
            }
          }
        }<% } %>
      }
    }
  };

  var server = new Hapi.Server('localhost', port, serverOptions);

  var routeOptions = {
    reload: config.liveReload.enabled,
    optimize: ((config.isOptimize && config.isOptimize) ? true : false),
    cachebust: ((process.env.NODE_ENV !== "production") ? "?b=#{(new Date()).getTime()}" : '')
  };

  // Default Route
  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      <% if (view !== "html") { %>reply.view('index', routeOptions);
      <% } else { %>
      name = (config.isOptimize ? "index-optimize" : "index")
      reply.view(name, routeOptions);<% } %>
    }
  });

  // Statically load public assets
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });

  callback(server.listener);
};