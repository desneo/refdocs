# 基础 [API](http://api.jquery.com/)
```
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
```

# [绑定动作.on](http://api.jquery.com/on/)
```
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
```

# ajax
## 注释
```
//
```


## 示例
```javascript
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
```
