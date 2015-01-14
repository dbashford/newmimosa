newmimosa
===========

This is a Mimosa module that comes with Mimosa. This module is responsible for the `mimosa new` command which will scaffold out a new Mimosa project for you.

For details on Mimosa, see the [Mimosa website](http://mimosa.io/).

# `mimosa new`

One way to get started with Mimosa is to use it to create a new application/project structure. Execute `mimosa new` and pass it the name you would like to give to your project.

```
$ mimosa new <<name>>
```

The `new` command will kick off a series of prompts to choose a JavaScript transpiler if you would like one, a CSS pre-processor, a templating library, a server, and a server templating technology. Mimosa will then create a directory using the name provided. Inside that directory Mimosa will populate an application skeleton. The `assets` directory will contain some example code for the chosen selections. At the root of the project will be a `bower.json` file that will be used to pull in jQuery and RequireJS when you first start Mimosa.

The project directory will also contain Mimosa's configuration file which will contain at a minimum a `modules` array. A documented version of the config will also be created. It will contain all the information for each of the modules used to build the project along with defaults.

# Asset Options

### JavaScript

The following JavaScripty languages are available:

* JavaScript
* TypeScript
* LiveScript
* Coco
* CoffeeScript
* Iced CoffeeScript

### CSS

The following CSS pre-processors are available:

* CSS
* SASS
* Less
* Stylus (w/nib)

### Micro-templates

The following client templating libraries are available:

* Dust
* ECO
* EJS
* Handlebars
* Hogan
* HTML (static)
* Jade
* Lodash
* Nunjucks
* Ractive
* Underscore

### Server

If a server is chosen, `mimosa new` will include the bare essentials for that server selection.

If no server is desired.  `mimosa new` delivers an application that includes the [mimosa-server](https://github.com/dbashford/mimosa-server) module which can handle serving assets. mimosa-server provides some configuration options for an embedded Express server so not having a server is a little less painful than it would be otherwise.

The following server options are available:

* None
* Express bundled inside Mimosa
* Express
* Express w/socket.io
* Hapi

If an Express or Hapi option is chosen, Mimosa will provide a single file, written in the chosen JavaScript transpiler, that Mimosa will use to start your Express/Hapi server.

The server code delivered by `mimosa new` will use all of the configuration from the mimosa-config server block. The use of the mimosa-config entries could be removed from the delivered code if you rather have the values in code rather than config.

```javascript
var s = config.server;
app.configure(function() {
  app.set('port', s.port);
  app.set('views', s.views.path);
  app.engine(s.views.extension, engines[s.views.compileWith]);
  app.set('view engine', s.views.extension);
});
```

All server integration options are nodejs-based. The `server` module does not have the ability to start your Rails server or your Tomcat. But Mimosa can deliver compiled assets to the directory your server expects to find them by changing the `watch.compiledDir` to that location.

Mimosa does not require a server. You may simply not need one (static site?) or you may have your own non-node.js server that Mimosa cannot start for you.

### Server Templating

`mimosa new` will also provide some starter views for an index page in the chosen view templating language.

The following server templating options are available:

* Jade
* Hogan
* HTML (static)
* EJS
* Handlebars
* Dust

Depending on the technology chosen, Mimosa will provide one or two view templates for the starter app. As with the server code Mimosa delivers, the view code and routes are built to be flexible enough to work in several scenarios. Some conditionals and mimosa-config properties can be replaced or hard-coded. The code may not need that level of complexity.

Mimosa uses [consolidate](https://github.com/visionmedia/consolidate.js), both internally and within the delivered Express, to easily toggle between different view templating libraries. Also installed will be the NPM module for the chosen templating library.

If Hapi is the chosen server templating language, the Hapi server comes configured to use any of the available server templating languages that are available via `mimosa new`.

The view support is provided via the [mimosa-server](https://github.com/dbashford/mimosa-server) module. For more details on the views technologies that are available, check out that [project's GitHub repository](https://github.com/dbashford/mimosa-server).

# Default Mimosa modules

The following Mimosa modules come with the project created by `mimosa new`:

* [mimosa-server](https://github.com/dbashford/mimosa-server)
* [mimosa-live-reload](https://github.com/dbashford/mimosa-live-reload)
* [mimosa-bower](https://github.com/dbashford/mimosa-bower)
* [mimosa-jshint](https://github.com/dbashford/mimosa-jshint)
* [mimosa-csslint](https://github.com/dbashford/mimosa-csslint)
* [mimosa-minify-js](https://github.com/dbashford/mimosa-minify-js)
* [mimosa-minify-css](https://github.com/dbashford/mimosa-minify-css)
* [mimosa-require](https://github.com/dbashford/mimosa-require)
* [mimosa-copy](https://github.com/dbashford/mimosa-copy)

If a JavaScript transpiler, a CSS preprocessor or a micro-templating library were chosen, the modules for those will be added to the `modules` array and installed inside the project as part of creating the project.

If any of these modules are not desired, simply remove them.
