# 改进点/基础
	
	//安全判空
	val length = text?.length;
			  
	//类型转换
	if (object is Car) {
		var car = object as Ca
	}
	
	//操作符变化
	&   and
	| 	or
	^	xor
	>> 	shr
	<<	shl
	
	//打印日志
	print("123123")
	println("asdassda")

# 字符串
	//多行字符串
	val xx = """asdasdasd
			  asdasdsd """;
				
	//字符串模版
	var a = 1; val s1 = "a is $a"
	
# 容器 可变/不可变
	
	List<out T> 只读list; MutableList<T>;
	Set<out T>/MutableSet<T>
	Map<K, out V>/MutableMap<K, V>
	
	//示例
	val numbers: MutableList<Int> = mutableListOf(1, 2, 3)
	val readOnlyView: List<Int> = numbers
	println(numbers)        // prints "[1, 2, 3]"
	numbers.add(4)
	println(readOnlyView)   // prints "[1, 2, 3, 4]"
	readOnlyView.clear()    // -> does not compile
	
# MutableList
	
# MutableMap
	//属性
	size	//map尺寸
	keys	// Returns a mutable Set of all keys 
	values	// Returns a mutable Set of all values 
	
	isEmpty()	//判空
	
	clear()	
	put(key: K, value: V)
	putAll(from: Map<out K, V>)
	remove(key: K)
	
	all

# 语法
	var name = "123"; 	//可变变量
	val name = "asdasd";	//不可变量，相当于java的final
	var name: String = ...;

## function
	//定义function
	fun sum(a: Int, b: Int): Int {
		return a + b;
	}
	
	//默认参数
	fun read(b: Array<Byte>, off: Int = 0, len: Int = b.size) {
	}
	
	//可变参数
    fun <T> asList(vararg ts: T): List<T> {
        val result = ArrayList<T>()
        for (t in ts) // ts is an Array
            result.add(t)
        return result
    }
	val a = arrayOf(1, 2, 3)
	
	//扩展对象上的function(替换代理模式)， 待扩展对象+方法名+返回值
	fun Any?.funExt(): String {
		if (this == null) return "null"
		return toString()+"11111";
	}
	val str = "SSSS";     println (str.funExt());
	
	//若返回值可能为null， 必须显示定义，否则运行时报错
	fun parseInt(str: String): Int? {
	}
	
## 属性
	//扩展属性
	val <T> List<T>.lastIndex: Int{
		get() = size - 1
	}
	
## Lambdas
	//lambdas表达式定义
	//单个入参时，默认it
	val sum = { x: Int, y: Int -> x + y };	

	//高阶函数 函数作为方法入参
	//示例1--
	fun <T, R> List<T>.map(transform: (T) -> R): List<R> {
		val result = arrayListOf<R>()
		for (item in this)
			result.add(transform(item))
		return result
	}
	//调用方式： val doubled = ints.map { value -> value * 2 }
		或是  	ints.map { it * 2 }
	
	//示例2--内联函数
	fun <T> max(collection: Collection<T>, less: (T, T) -> Boolean): T? {
		var max: T? = null
		for (it in collection)
			if (max == null || less(max, it))
				max = it;
		return max
	}
	//调用： max(strings, { a, b -> a.length < b.length })
	
	//未使用的参数可使用_代替
	map.forEach { _, value -> println("$value!") }
	
# Class
## Class类和继承
	//定义
	class Invoice { }
	或 class Person(val firstName: String, val lastName: String, var age: Int) {
			// ...
		}
	
	//构建函数，一个主，多个次构造函数
	//可自带默认参数
	class Customer(val customerName: String = "")	
	
	//主构造函数是class声明的一部分, 构造函数默认public
	class Customer(name: String) {
		init {
			logger.info("Customer initialized with value ${name}")
		}
	}
	class DontCreateMe private constructor () { }	//构造方法置为private
	
	//次构造函数,可多个
	class Person(val name: String) {
		constructor(name: String, parent: Person) : this(name) {
			parent.children.add(this)
		}
	}
	
	//继承
	class MyView : View {
		constructor(ctx: Context) : super(ctx)
		constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
	}
	
	//覆写方法--overide 
	//kotlin中重写必须明确指定，使用open声明(否则编译报错)可被重写，open的fun必须包含在open的class中
	open class Base {
		open fun v() {}
		fun nv() {}
	}
	class Derived() : Base() {
		override fun v() {}
	}
	
	//覆写规则
	open class A {
		open fun f() { print("A") }
		fun a() { print("a") }
	}

	interface B {
		fun f() { print("B") } // interface members are 'open' by default
		fun b() { print("b") }
	}

	class C() : A(), B {
		// The compiler requires f() to be overridden:
		override fun f() {
			super<A>.f() // call to A.f()
			super<B>.f() // call to B.f()
		}
	}	
	
	//覆写property
	
	//Abstract
	
## property和Fields
	class Address { var name: String = ... 	};

	//改写getter和setter方法
	val isEmpty: Boolean get() = this.size == 0;
	var stringRepresentation: String
		get() = this.toString()
		set(value) {
			setDataFromString(value) // parses the string and assigns values to other properties
		}
	
	//private setter
	var setterVisibility: String = "abc"
		private set

## interface接口
	interface MyInterface {
		fun bar()
		fun foo() { }
	}
	class Child : MyInterface {
		override fun bar() {
			// body
		}
	}

## 	Data Classes 只包含数据的Class
	//针对此种模型，kotlin额外定义了一些扩展方法
	-- equals()/hashCode() pair,
	-- toString() of the form "User(name=John, age=42)",
	data class User(val name: String = "", val age: Int = 0);	//示例1
	
	//copy方法
	val jack = User(name = "Jack", age = 1)
	val olderJack = jack.copy(age = 2)
	
## 泛型Generics
	
	
# 逻辑操作
## for循环
	for (item in items) {
		println(item)
	}

## 退出循环-break label
	//退出多重for循环
    lxx@ for (i in 1..10) {
        for (j in 1..10) {
            println("x=$i;y=$j");
            if (i == 5) break@lxx;
        }
    }
	
	//forEach中退出当次循环
    mutableListOf(1, 2, 3,4).forEach {
        if (it == 2) return@forEach
        print(it);
    }

## when
	//替换switch Case
	var grade = when (score) {
		9, 10 -> "Excellent" 
		in 6..8 -> "Good"
		4, 5 -> "Ok"
		in 1..3 -> "Fail"
		else -> "Fail"
	}

	when {
		"orange" in items -> println("juicy")
		"apple" in items -> println("apple is fine too")
	}
	
## 替换3目运算符
	val text = if (x > 5)
				  "x > 5"
			   else "x <= 5"
	fun maxOf(a: Int, b: Int) = if (a > b) a else b	

# 其它
## main函数
	class KotlinTe { 	}
	fun main(args: Array<String>) {
		var output: String? = "123123";
		println(ou);
	}

# 默认导入
	kotlin.*; 							kotlin.annotation.*; 	kotlin.collections.*;
	kotlin.comparisons.* (since 1.1); 	kotlin.io.*; 			kotlin.ranges.*;
	kotlin.sequences.*; 				kotlin.text.*;	
	
	java.lang.*; 	kotlin.jvm.*;
	
## kotlin的maven依赖
	IDEA maven工程中创建kt文件时会提示增加kotlin依赖，默认即可。(包括dependency和build两类标签)
	
