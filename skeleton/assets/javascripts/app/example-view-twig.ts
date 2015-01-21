/// <reference path="../vendor/require.d.ts" />

define(['jquery', 'templates'], function($, templates) {

  function ExampleView() {}

  ExampleView.prototype.render = function(element) {
    $(element).append(templates.example.render({name: 'Twig'}));
  };

  return ExampleView;

});