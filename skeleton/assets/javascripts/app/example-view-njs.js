define(['jquery', 'templates', 'vendor/nunjucks-slim'], function($, templates, nunjucks) {
  function ExampleView() {}

  ExampleView.prototype.render = function(element) {
    $(element).append(nunjucks.render("example", {name:'nunjucks', css:'CSSHERE'}));
  };

  return ExampleView;
});