function dealmd(path) {
    debugger;
    $.get(path, function(data) {
        var html_content = markdown.toHTML(data);
        $(".markdown-body").html(html_content);
        //html自动编号
        var h1Index = 0;
        var h2Index = 0;
        var h3Index = 0;
        var h4Index = 0;
        $("h1,h2,h3,h4").each(function(i, val) {
        	if("H1" == val.tagName){
        		h1Index += 1;
		        h2Index = 0;
        		$(val).prepend(h1Index+".");
        	}

        	if("H2" == val.tagName){
        		h2Index += 1;
		        h3Index = 0;
        		$(val).prepend(h1Index+"." + h2Index + ".");
        	}

        	if("H3" == val.tagName){
        		h3Index += 1;
		        h4Index = 0;
        		$(val).prepend(h1Index+"." + h2Index + "." + h3Index + ".");
        	}
        });
    });
}

//Java下拉框处理
$("#java").on("click", function(event) {
    var value = event.target.text;
    var path = "./java/" + value + ".md";
    dealmd(path);
});

//JS下拉框处理
$("#js").on("click", function(event) {
    var value = event.target.text;
    var path = "./frontend/js/" + value + ".md";
    dealmd(path);
});

//CSS下拉框处理
$("#css").on("click", function(event) {
    var value = event.target.text;
    var path = "./frontend/css/" + value + ".md";
    dealmd(path);
});

//othres下拉框处理
$("#program").on("click", function(event) {
    var value = event.target.text;
    var path = "./others/" + value + ".md";
    dealmd(path);
});

//hobby下拉框处理
$("#hobby").on("click", function(event) {
    var value = event.target.text;
    var path = "./hobby/" + value + ".md";
    dealmd(path);
});
