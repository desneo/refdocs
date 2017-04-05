
# js基础
	//<script src="/servletexample/resources/js/jquery-3.1.0.js"></script>
## 类型判断 typeof/instanceof
	typeof "XX"	//"string";	"undefined"/"boolean"/"string"/"number"/"object"/"function"/
	3 instanceof String		//false
	
## JS初始化过程
	1、在JS解释器执行任何代码之前,创建全局对象
	2、用预定义的值和函数来初始化全局对象中的属性,eg.Math,Infinity,parseInt
	3、搜索函数外的var声明,创建全局对象相应的属性,初始化为undefined
	4、创建全局的执行环境,作用域链只有一个对象-全局对象
	5、依次执行代码
		a)遇到var声明赋值语句给全局对象相应的属性赋值
		b)遇到未声明赋值语句,在全局对象中增加相应的属性,并赋值
		c)遇到函数调用,创建调用对象
			i.搜索函数中的var声明和参数,创建调用对象相应的属性,初始化为undefined。
			ii.创建函数执行环境,作用域链--第一对象:调用对象;第二对象:全局对象
			iii.依次执行代码
				1.遇到var声明赋值语句给调用对象相应的属性赋值
				2.遇到未声明赋值语句,在全局对象中增加相应的属性,并赋值
				3.遇到函数调用,创建嵌套函数的调用对象
					a)搜索嵌套函数中的var声明和参数,创建嵌套函数的调用对象相应的属性,初始化为undefined.
					b)创建嵌套函数执行环境,作用域链--第一对象:嵌套函数的调用对象;第二对象:调用对象;第三对象:全局对象


# String 字符串
	//转字符串 	String(xx)
	//长度 "ss".length
	//slice(startend) 子串，可负数
	
	//replace 替换可正则
		删除所有空格 .replace(/[\n ]/g,"")
		"2016-4-30 23:59:59".replace(/-/g,"/")	// "2016/4/30 23:59:59"
		双引号转单引号: SON.stringify(json).replace(/"/g,"'")

	//split.split(",") 分割成数组,可正则
		"zhou shao".split("") 分割成字母
		"zhou,shao".split(",") 指定分隔符
		"zhou shao".split("",3) 只返回结果前3项

	//字符串比较大小
		规则：1、长度长的大; 2、按每一位的charCode比较大小，直到出现不同

	match 字符串匹配/是否存在 支持正则
	indexOf("a") / lastIndexOf(""a)		//查找
	includes()/startsWith()/endsWith() 	//ES6
	"ad".repeat(3)		//重复字符串,ababab
	padStart() / padEnd() 	//补齐 es6
		"x".padStart(4,"ab")	 "abax"
		"x".padEnd(5,"ab")		 "xabab"
		"x".padEnd(4)	
	toLowerCase()/toUpperCase()		//大小写转换

# js作用域
	1) function级 或 let/const(块级作用域)
	2) let--es6, let声明的变量不允许重复声明 let bar= foo*2;
	3) const-es6, 块级常量不可修改 const b = 4;
	4) 作用域链-逐级向上查找(直到顶部window,未找到报错)，scope chain

# 闭包和高阶函数
## 闭包 未销毁的局部变量
	//示例1--函数在定义的此法作用域以外执行
		function foo() {
			var a = 2;
			function bar(){
				console.log(a);
			}
			return bar;
		}
		var zz = foo();
		var a=111;
		zz();		//2
	
## 高阶函数
	1--函数可以作为参数被传递，
	2--函数可以作为返回值返回
	//示例1 判断数据类型
	//原方法
	isString = function(obj){ return Object.prototype.toString.call(obj) === "[object String]"; 	}
	isNumber = function(obj){ return Object.prototype.toString.call(obj) === "[object Number]"; 	}
	isArray = function(obj){ return Object.prototype.toString.call(obj) === "[object Array]"; 	}
	//改进
	isType = function(type) {
		return function(obj) {
			return Object.prototype.toString.call(obj) === "[object " + type + "]";
		}
	}
	isString = isType('String');
	isNumber = isType('Number');
	isArray = isType('Array');	
	
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
	//0--为了动态改变this，当某个object没有某个方法，可以借助call/apply用其它对象的方法来操作
	//1-作用相同，入参形式不同； Function原型上定义的方法，Function.prototype.call/apply
	//funtion.call(this, arg1, arg2, .....);	func.apply(this, [arg1, arg2, arg3])
	//示例1
	var obj1 = {name: "sven"};
	var obj2 = {name: "anne"};
	window.name = "xxxx";
	var getName = function(){	alert(this.name)	}
	getName();		//XXXX
	getName.call(obj1);		//sven
	getName.call(obj2)		//anne

## new 关键字
	返回一个对象，如果有return则返回其值，没有则默认返回执行完后的对象
	var xx = function(){
		var name = "NAME";
		return {
			"name": "RRRRRR"
		}
	}
	var yy = new xx();
	yy.name;	//RRRRRR
