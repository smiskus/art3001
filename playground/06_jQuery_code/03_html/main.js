$(document).ready(function() {
  
  // get the html content
  var contents = $("#third").html();
  console.log(contents);
  
  // or set the html content
  $('#third').html("This is the <b>updated</b> text!!");
});