
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

# JS数组
	//遍历和过滤
		for of: (也可map set string)
			for (let xx of ['a', 'b', 'c']){console.log(xx)}	 //a b c
		forEach	
			["asd","dfdwer"].forEach((item, index)=>{ console.log(item.length)});	//3 6
		.map() 更新对应项,返回新数组
			[1,2,3,4].map(function (item) {   return item * item; });	//1 4 9 16
		.filter() 返回过滤后的数组
			[0,1,2,3].filter(function(item) { return item; });		//1 2 3
		.some() 有一个true就返回true
			[5, 6, 8].some(function(score){ return score<7; });		//true
		.every()每一个都true才返回true
			[5, 6, 8].every(function(score){ return score<7; });	//false
		.reduce() 归并(求和)
			[1, 2, 3, 4].reduce(function (previous, current, index, array) {   return previous + current; });	//10
		reduceRight() 归并(右侧开始)  与reduce相反
	
	join--转字符串，指定连接符	["am","bm","cm"].join("---");	//	am—bm—cm
	slice() 截取/浅复制/可负值	[].slice(1, 3)
	push()/pop() 尾部添加/删除
	unshift()/shift() 头部添加删除	
	concat()合并数组/添加对象，返回新对象		arrayObject.concat(arrayX,arrayX,......,arrayX)
	
	array.splice() 添加/删除,改变源对象
		splice()有三个或以上参数,前两个是必须的,后面参数是可选的
		插入	splice(起始项,0,添加项)		//splice(2 , 0 , "red","green")	从数组位置2插入串"red"和"green"
		删除	splice(起始项,要删除的项个数)		//splice(0,2) 删除数组中的前两项
		替换	splice(起始项,替换个数,替换项)		//其实是添加删除的共同结果, splice(2 , 1, "red","green") 删除位置2，然后再从位置2开始插入串"red"和"green"
	
	//数组排序
	array.sort()  改变源
		[3,4.5,5,1,-2].sort(function(value1, value2){	//自定义排序,
			return Math.abs(value1-4) - Math.abs(value2-4);		
		})		// [4.5, 3, 5, 1, -2]
	array.reverse() 反转数组，改变源
	
	indexOf(xx) / lastIndexOf(xx)  查找位置,返回第一个index，未找到返回-1
		[1,2,4,5 ,3 , 4,2].indexOf(4)	//2
	find()/findIndex() 自定义查找规则ES6
			[1, 4 , -5 ,10].find(n=>n<0)	 -5
			[1, 4 , -5 ,10].findIndex(n=>n<0)	 2
	数组最大值: var values = [1,3,5,6,23,6,7,67,1233,3]; var max = Math.max.apply(null,values);
# JS对象
	遍历属性( for in ): var xx = {xx:123}; for(let tem in xx ){ console.log(xx[tem])}
	合并对象： Object.assign(des, src1, src2, ...)		//将src中所有可枚举属性复制到des对象
	obj下属性：Object.keys(obj);	//返回可枚举属性
	是否存在某个属性(自有属性):  obj.hasOwnProperty("x");	//true,false
	是否存在某个属性(自有和集成属性):  "x" in obj;			//true,false
	复制对象：var zz = JSON.parseJSON(JSON.stringify(xx))
	
	//属性的属性
		var obj = {aa: "123"};
		Object.getOwnPropertyDescriptor(obj, "aa")
		//{	value: "123", 
			writable: true, 	//是否可修改属性的值
			enumerable: true, 	//可枚举
			configurable: true	//可配置
		  }	
## prototype
	//每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含
		可以由特定类型的所有实例共享的属性和方法。

# 其它数据类型
## Set
	//比较相等时使用===(类似)
		var s = new Set(); [2, 4, 6, 2].map(x=>s.add(x)); for(let i of s){console.log(i)};		//2 4 6
	.size	
	add(value)	//添加值，返回Set结构本身
	delete(value)	//删除，返回boolean, 表示删除成功
	has(value)	//返回boolean
	clear()	//清空所有成员，无返回值
	
## Map 
	var map = new Map();
	map.set('a', "11111");
	map.get("a");
	map.has("a");
	map.delte("a");
	map.size		//0
	//遍历
		var map = new Map([['F', "no"], ['T', "yes"]]);
		for( let [key,value] of map){
			console.log(key+" : "+value)
		}
## Math
	Math.PI	 ∏的值(约等于3.14159) 
	数组最大值: var values = [1,3,5,6,23,6,7,67,1233,3]; var max = Math.max.apply(null,values);
	Math.ceil(num)	向上舍入为整数
	Math.floor(num)	向下舍入为整数
	Math.round(num)	标准四舍五入为整数
	Math.random()	//0<返回值<1
	Math.abs(x) 	返回数字的绝对值
	math.trunc()	返回整数部分
	Math.sign()		//返回 1 -1 0, 或NaN
	Math.clz32(x)	//返回一个数的32位无符号整数形式有多少个前导0
	x**y	//指数
	
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
	
	//示例2--封装模块
	function coolModule() {
		var something = "cool";var another = [1,2, 3];
		function doSome(){console.log(something);}
		function doAnother(){console.log(another);}
		return {
			doSome: doSome,
			doAnother: doAnother
		}
	}
	var tt = coolModule();
	tt.doSome();	//cool
	tt.doAnother();		//[1, 2, 3]
	
	
## 高阶函数 函数做入参/返回值
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

# 异步编程
## promise 异步嵌套打平
	Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
	//先创建Promise对象，再监听Resolved和Reject状态变化
		var promise = new Promise(function(resolve, reject) {
		  // ... some code

		  if (/* 异步操作成功 */){
			resolve(value);		//resolve方法，将Promise对象状态从"pending"变为"Resolved"
		  } else {
			reject(error);		//reject方法将Promise对象状态从"pending"变为"Reject"
		  }
		});
		//then方法指定 Resolved状态和Reject状态的回调函数
		promise.then(function(value) {
		  // success
		}, function(error) {
		  // failure
		});
		
	//示例1--异步加载图片
		function loadImageAsync(url) {
		  return new Promise(function(resolve, reject) {
			var image = new Image();
			image.onload = function() { resolve(image); };
			image.onerror = function() { reject(new Error('Could not load image at ' + url)); };
			image.src = url;
		  });
		}	

## async/await
	async可以声明一个异步函数 ，此函数需要返回一个promise对象。await可以等待一个Promise对象resolve，并拿到结果。
### 示例1 sleep函数
	async function sleep(timeout) {  
	  return new Promise((resolve, reject) => {
		setTimeout(function() {
		  resolve();
		}, timeout);
	  });
	}
	(async function() {
	  console.log('Do some thing, ' + new Date());
	  await sleep(3000);
	  console.log('Do other things, ' + new Date());
	})();

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
