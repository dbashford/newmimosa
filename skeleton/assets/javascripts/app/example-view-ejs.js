define(['jquery', 'templates'], function($, templates) {
  function ExampleView() {}

  ExampleView.prototype.render = function(element) {
    $(element).append(templates.example({name: 'EJS', css: 'CSSHERE'}));
    $(element).append(templates['another-example']({name: 'EJS'}));
  };

  return ExampleView;

});