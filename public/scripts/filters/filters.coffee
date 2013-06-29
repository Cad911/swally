window.ourApp.filter('range', ()->
  (input, total)->
    total = parseInt(total);
    for i in [total..6]
      input.push(i);
    return input;
)