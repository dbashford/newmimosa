/// <reference path="./vendor/require.d.ts" />

require.config({
  urlArgs: "b=" + ((new Date()).getTime()),
  paths: {
    jquery: 'vendor/jquery/jquery'
  }
});

require(['app/example-view'], function(ExampleView) {
  var view = new ExampleView();
  view.render('body');
});