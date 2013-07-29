// import the webserver module, and create a server
var server = require('webserver').create();

// start a server on port 8080 and register a request listener
server.listen(8080, function(request, response) {

  var page = new WebPage();

  page.open("http://lanyrd.com/places/oxfordshire/", function(){
    var events = page.evaluate(function(){
      return $('.vevent .summary').map(function(e){ 
        return '* ' + this.innerText
      }).toArray().join('\n');
    });

    // Rather than console logging, write the data back as a 
    // response to the user
    //
    // console.log('Upcoming Events in Oxfordshire:');
    // console.log(events);

    response.statusCode = 200;
    response.write('Upcoming Events in Oxfordshire:\n');
    response.write(events);
    response.close();

    // We want to keep phantom open for more requests, so 
    // instead of exiting - we close the webpage and we're
    // ready for more requests.
    //
    // phantom.exit();

    page.close();

  });
});