$(document).ready(function() {
  
  
  $("#showP1").click(showP1);
  $("#showP2").click(showP2);
  $("#showP3").click(showP3);
  
  function showP1() {
    $('.project').hide();
    $('#p1').show();
  }
  
  function showP2() {
    $('.project').hide();
    $('#p2').show();
  }
  function showP3() {
    $('.project').hide();
    $('#p3').show();
  }
});