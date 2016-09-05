$( "#refJs" ).on( "click", function( event ) {
  $.get("./frontend/js/js.md", function(data) {
    var html_content = markdown.toHTML( data );
    $(".markdown-body").html( html_content )
  });
});
