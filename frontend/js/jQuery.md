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

# jQuery DOM操作
## 

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

## [查看jquery绑定的事件函数](http://sudodev.cn/detect-jquery-event-function-define/)
	
