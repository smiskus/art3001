$(document).ready(function() {
  var w = $("iframe").width();
  var heightToWidthRatio = 9/16;
  $("iframe").height(w * heightToWidthRatio);
  console.log($("iframe").width())
});