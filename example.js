var page = new WebPage();

page.open("http://lanyrd.com/places/oxfordshire/", function(){
  var events = page.evaluate(function(){
    return $('.vevent .summary').map(function(e){ 
      return '* ' + this.innerText
    }).toArray().join('\n');
  });

  console.log('Upcoming Events in Oxfordshire:');
  console.log(events);

  phantom.exit();
});