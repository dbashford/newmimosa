define ['jquery', 'templates'], ($, templates) ->

  class ExampleView

    render: (element) ->
      $(element).append(templates.example.render({name: 'Twig'}));

  ExampleView