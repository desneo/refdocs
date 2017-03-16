# 基础 [API](http://api.jquery.com/)
	//<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.1.0.js"></script>
	//插入html
	$( "button.continue" ).html( "Next Step..." )

	//绑定动作
	var hiddenBox = $( "#banner-message" );
	$( "#button-container button" ).on( "click", function( event ) {
	  hiddenBox.show();
	});

	//ajax
	$.ajax({
	  url: "/api/getWeather",
	  data: {
	    zipcode: 97201
	  },
	  success: function( result ) {
	    $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
	  }
	});

# jQuery选择器
    1.转义字符\\ ，示例： !"#$%&'()*+,./:;<=>?@[\]^`{|}~ , id="foo.bar"-->$("#foo\\.bar")
    2.多选择器(组合结果)： $("selector1,selector2, selectorN")
## 基本选择器
    $("*")          //选择所有元素
    $(#id)          //id选择器
    $(".sclass")    //class选择器
    $("P")          //元素选择器
## 继承关系选择器
    $("parent > child")     //选中上一级元素是parent的child元素
    $("ancestor descendant")    //祖先中有ancestor的descendant的元素
    $("prev + next")            //prev之后的next兄弟元素
    $("prev ~ sibling")        //与prev共一个parent节点，但是在prev之后的所有兄弟sibling元素
	
	//查找父元素
	$('#item1').parent()/.parent('.parent1');	//上一级
	$('#items').parents('.parent1');	//取得一个包含着所有匹配元素的祖先元素的元素集合（不包含根元素）
	$('#items1').closest('.parent1');	//closest会首先检查当前元素是否匹配，如果匹配则直接返回元素本身。如果不匹配则向上查找父元素，
											一层一层往上，直到找到匹配选择器的元素。如果什么都没找到则返回一个空的jQuery对象。
    
  
## 属性过滤器
    //1-单双引号是有意义的，$("a[rel='nofollow']")
         $("a[rel='nofollow']"), will select <a href="example.html" rel="nofollow">Some text</a> ， but not <a href="example.html" rel="nofollow foe">Some text</a>.
    //2-单双引号转义 $("a[rel=\"nofollow self\"]")

    $("[attribute|='value']")       //属性值是value或以value-开头
    $("[attribute*='value']")       //属性值中含有字符串
    $("[attribute~='value']")       //属性值中含有value字符串（以空格分开）的元素
    $("[attribute='value']")        //含有属性+属性值匹配
    $("[attribute!='value']")       //不含有属性或属性名称不为value
    $("[attribute^='value']")       //以value字符串开头的属性
    $("[attribute$='value']")       //以value字符串结尾的属性
    $("[attributename]")            //含有属性(值任意)的元素
    $( "input[id][name$='man']" ).val( "only this one" );   //同时满足所有属性条件的元素
## 内容过滤器
    $("div:contains('John')")     //内容含有指定字符串，如<div>John Resig</div>
    $("div:has(p)")                //至少含有一个满足条件selector的div

# 属性/内容操作-addClass等
    $( "p" ).addClass( "myClass yourClass" );       //添加class
    $( "#mydiv" ).hasClass( "foo" )                 //是否有某个class，true false
    $("p").removeClass("myClass yourClass")；    //移除class

    $("select.foo").val();    //获取标签value属性的值
				.html();    //设置或获取标签内的值
				.text();	//获取内部所有标签夹起来的值
	
    input.removeAttr( "title" )；    //移除属性
    $("a[name=\"public0_dyg01\"]").attr("href")；    //获取第一个匹配元素指定属性的值
		.attr( attributeName, value )                //设置所有元素的属性值

    $( "div.tumble" ).toggleClass( "bounce" )   //没有class则添加，有则删除

# jQuery DOM操作
## 插入节点
	内容后追加: $("p").append("<b>你好</b>");		// <p>我想说:<b>你好</b></p>
	内容前追加: $("p").prepend("<b>你好</b>")		// <p><b>你好</b>我想说: </p>
	元素后同级插入: $("p").after("<b>你好</b>")		// <p>我想说：</P> <b>你好！</b>
	元素前统计插入: $("p").before("<b></b>") 		// 元素前同级插入

# [绑定动作.on](http://api.jquery.com/on/)
	$("#js").on( "click", function( event ) {
	  var value = event.target.text;
	});
    
	//用法 .on( events [, selector ] [, data ], handler )
		events --> 异或多个用空格分开的事件名称，如"click"等
		selector --> 进一步的过滤条件
		data --> Data to be passed to the handler in event.data when an event is triggered.
		handler --> function(event){}
    
	//移除事件	.off()
	//只触发一次 	.one()

# ajax
## 示例
	//下载文件
	$( "#refJs" ).on( "click", function( event ) {
	  $.get("./frontend/js/js.md", function(data) { 
	    $(".jumbotron").html( data )
	  });
	});
	
	//jq上传文件， 使用 FormData 对象添加字段方式, IE11支持
	<input id="upload" type="button" value="上传" />
	<script>
		$("#upload").click(function(){
			debugger;
			var formData = new FormData();
			formData.append('file', $('#file')[0].files[0]);
			$.ajax({
				url : '/servletexample/upload',
				type : 'POST',
				cache : false,
				data : formData,
				processData : false,
				contentType : false
			}).done(function(res) {
				alert("上传成功");
			}).fail(function(res) {
			});
		});
	</script>

# jQuery其它
## 模拟点击
	document.getElementsByTagName("a")[0].click();	//原生js已自带点击事件
	$("#b").click()		//常用,可点击btn
	$("#zh-top-nav-count-wrap")[0].click()
	$("#a").trigger("click")	//执行#a的click事件
	
	//点击<a>标签，我们平时都是点击的A标签中的文字,触发文字上的click才会跳转
	如:  <a class="zu-top-nav-link open" href="javascript:;" id="zh-top-nav-count-wrap" role="button"><span class="mobi-arrow"></span></a>
	$("#zh-top-nav-count-wrap .mobi-arrow").click()

## 区分模拟点击和用户点击事件
	//1-我们可以通过传递的参数e来判断是否是真正的用户点击，如果是用户点击事件，对象e将有clientX, clientY, pageX, pageY等属性，并且均是数字。我们也可以检查originalEvent属性
		$("#foo").click(function(e){  
		if(e.hasOwnProperty('originalEvent'))  
			// Probably a real click.  
		else  
			// Probably a fake click.  
		}); 
	
	//2-也可以在定义事件函数的时候指定额外的参数，通过此参数来判断,详见trigger api

## 模拟鼠标移动
    JS可以触发 mouseover 但是不能触发 hover
        document.getElementById( 'link' ).dispatchEvent( new Event( 'mouseover' ) );
    但是可以通过class的方式，比如CSS里面这样写：
        a:hover, a.hover {color : red; }
    这样在JS里面可以通过添加class .hover 来实现你说的功能。

## [查看jquery绑定的事件函数](http://sudodev.cn/detect-jquery-event-function-define/)
	
