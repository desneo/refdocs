
# js基础
	//<script src="/servletexample/resources/js/jquery-3.1.0.js"></script>
	//<script src="http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.js"></script>


# String 字符串
## 删除所有空格 .replace(/[\n ]/g,"")

## 转字符串 String(xx)

## 长度 "ss".length

## slice(startend) 子串，可负数

## split.split(",") 分割成数组,可正则
	"zhou shao".split("") 分割成字母
	"zhou,shao".split(",") 指定分隔符
	"zhou shao".split("",3) 只返回结果前3项

## replace(/-/g,"/") 替换可正则
	var ss = "2016-4-30 23:59:59";
	var tt = ss.replace(/-/g,"/")	// "2016/4/30 23:59:59"
	"asdasda777777".replace(/[^\d]/gi,"9")		//"9999999777777"
	双引号转单引号：
		var tt = {};
		var json = {releaseProject:"name"}
		tt.xx = JSON.stringify(json);		//{xx: "{"releaseProject":"name"}"}
		tt.xx.replace(/"/g,"'")		//"{'releaseProject':'name'}"	

## 字符串比较大小
	规则：
		1、长度长的大
		2、按每一位的charCode比较大小，直到出现不同
	测试：
		var a = "2014-08-08";
		var b = "2014-09-09";
		// console.log(a>b, a<b); 

## match 字符串匹配/是否存在 支持正则

## 其它重用
	indexOf("a") / lastIndexOf(""a)		//查找
	includes()/startsWith()/endsWith() 	//ES6
	
	"ad".repeat(3)		//重复字符串,ababab

	padStart() / padEnd() 	//补齐 es6
		"x".padStart(4,"ab")	 "abax"
		"x".padEnd(5,"ab")		 "xabab"
		"x".padEnd(4)	
	
	toLowerCase()/toUpperCase()		//大小写转换

## Unicode转字符串
	索引词：unicode转utf8、
	①	var data = "ad.gift.label.recipientNumber=\u53D7\u8D60\u53F7\u7801\uFF1A";
	unescape(data.replace(/\\/g,"%");	  'ad.gift.label.recipientNumber=受赠号码：'
	escape("我在")	 "%u6211%u5728"
	② 	var xx = "ad.person.label.OfferByPhoneFee=\u8BDD\u8D39\u652F\u4ED8";
		console.log(xx.normalize());		// normalize  ES6



# js作用域
	1) function级 或 let/const(块级作用域)
	2) let--es6, let声明的变量不允许重复声明 let bar= foo*2;
	3) const-es6, 块级常量不可修改 const b = 4;
	4) 作用域链-逐级向上查找(直到顶部window,未找到报错)，scope chain

# Js关键字
## this
	//既不指向自身，也不指向自身作用域，指向调用它的那一层作用域(调用位置，不是声明位置)
	1）作为对象方法调用-->指向该对象
		var obj = {
			a:1,
			getA:function(){
				alert(this === obj);	//true
				alert(thi.a);	//1
			}
		}
		obj.getA();	//1
	2) 作为普通函数调用-->指向window对象
		var a = "YYYYY";
		var xx = obj.getA;
		xx();	//YYYYY
	3) new时构造器调用-->指向构造器返回的对象
		//当new运算符调用函数是，函数总是返回一个对象
		var MyClass = function(){
			this.name = "SVEN";
			return { name: "kkkkk"};	//显式的返回对象
		}
		var obj = new MyClass();
	4) call/apply调用-->指向传入的对象
		var obj1 = {
			name:"SVEN",
			getName:function(){
				return this.name;
			}
		}
		var obj2 = {
			name:"ZZZZZ"
		}
		console.log(obj1.getName());	//SVEN
		console.log(obj1.getName.call(obj2));	//ZZZZZ

## call/apply
	


