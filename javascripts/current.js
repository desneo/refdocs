$( "#refJs" ).on( "click", function( event ) {
  $.get("./frontend/js/js.md", function(data) {
    var html_content = markdown.toHTML( data );
    $(".content").html( html_content )
  });
});
