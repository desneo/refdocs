
# js基础
	//<script src="/servletexample/resources/js/jquery-3.1.0.js"></script>
	//<script src="http://cdn.staticfile.org/jquery/2.1.1-rc2/jquery.js"></script>

# js作用域
	1) function级 或 let/const(块级作用域)
	2) let--es6, let声明的变量不允许重复声明 let bar= foo*2;
	3) const-es6, 块级常量不可修改 const b = 4;
	4) 作用域链-逐级向上查找(直到顶部window,未找到报错)，scope chain

# Js关键字
## this
	//既不指向自身，也不指向自身作用域，指向调用它的那一层作用域(调用位置，不是声明位置)
	function foo(){
		var a=2;
		this.bar();
	}
	function bar(){ console.log(this.a); }
	foo();	//undefined


