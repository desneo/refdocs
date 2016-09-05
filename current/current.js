function dealmd(path) {
    debugger;
    $.get(path, function(data) {
        var html_content = markdown.toHTML(data);
        $(".markdown-body").html(html_content);
        //html自动编号
        $("h1").each(function(i, vali) {
        	 $(this).prepend(i+1+'.');
        	 $("h2").each(function(j, valj){
        	 	$(this).prepend(i+"."+(j+1)+'.');
        	 	$("h3").each(function(k, valk){
        	 		$(this).prepend(i+"."+(j+1)+'.'+(k+1)+'.');
        	 	});
        	 });
    	});
    });
}

$("#js").on("click", function(event) {
    var value = event.target.text;
    var path = "./frontend/js/" + value + ".md";
    dealmd(path);
});
