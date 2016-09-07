function dealmd(path) {
    debugger;
    $.get(path, function(data) {
        var html_content = markdown.toHTML(data);
        $(".markdown-body").html(html_content);
        //html自动编号
        var h1Index = 0;
        $("h1,h2,h3,h4").each(function(i, val) {
        	if("h1" == val.tagName){
        		h1Index += 1;
		        var h2Index = 0;
        	}
        	$(val).prepend(h1Index+".");

        	if("h2" == val.tagName){
        		h2Index += 1;
		        var h3Index = 0;
        	}
        	$(val).prepend(h1Index+"." + h2Index + ".");

        	if("h3" == val.tagName){
        		h3Index += 1;
		        var h4Index = 0;
        	}
        	$(val).prepend(h1Index+"." + h2Index + "." + h3Index + ".");
        });
    });
}

$("#js").on("click", function(event) {
    var value = event.target.text;
    var path = "./frontend/js/" + value + ".md";
    dealmd(path);
});
