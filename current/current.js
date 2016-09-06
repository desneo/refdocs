function dealmd(path) {
    debugger;
    $.get(path, function(data) {
        var html_content = markdown.toHTML(data);
        $(".markdown-body").html(html_content);
        //html自动编号
        $("h1").each(function(i, vali) {
        	 $(vali).prepend(i+1+'.');
        	 $(vali).find("h2").each(function(j, valj){
        	 	$(valj).prepend(i+"."+(j+1)+'.');
        	 	$(valj).find("h3").each(function(k, valk){
        	 		$(valk).prepend(i+"."+(j+1)+'.'+(k+1)+'.');
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
