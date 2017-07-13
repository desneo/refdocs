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
	
## MutableList
	//示例
	val numbers: MutableList<Int> = mutableListOf(1, 2, 3)
	val readOnlyView: List<Int> = numbers
	println(numbers)        // prints "[1, 2, 3]"
	numbers.add(4)
	println(readOnlyView)   // prints "[1, 2, 3, 4]"
	readOnlyView.clear()    // -> does not compile

	//属性
	size	//尺寸
	lastIndex	//最尾元素的索引值

	//方法
	isNotEmpty()

	forEach		//循环
	forEachIndexed	//带索引的循环

	//取值
	component1()	//获取第1(2/3/4/5/)个元素
	elementAtOrElse	//返回指定E,或index越界时返回入参函数的执行结果
	getOrElse	//取值，如果越界则返回传入的默认值
	getOrNull	//取值，越界则返回null
	
	contains	//包含
	containsAll
	
	//删除
	remove
	removeAll	//删除有所满足入参函数的元素
	drop(n)	//list,返回删除前n个元素后的新list
	dropLast
	
	slice	//子list
	sort()	//排序
	sortBy	//指定排序
	sorted	//返回新的排序后的list
	
	
	//去重
	distinct()	//list
	distinctBy(T->{})	//list,使用入参函数处理
	
	//统计--判断
	all		//boolean,每个元素都满足入参函数
	any		//任一满足
	count	//满足入参函数E的个数
	none  	//都不满足

	//转换成其它类型
	toHashSet
	toSet
	toSortedSet
	zip	
	
	
	//转换
	reverse		//反转列表
	reversed
	asReversed	//list,生成反转列表
	associate	//map,将E按入参函数转成pair返回
	associateBy	//map,将E按入参函数转成K返回
	map			//对每一个元素做变换后返回新的list
	mapNotNull	
	flatMap		//对每一个元素做变换后返回新的list
	mapIndexed	//函数入参带index
	mapIndexedNotNull	//list，只返回非null值
	minus
	minusAssign
	plus
	plusAssign
	take	//返回前n个元素
	takeLast
	
	
	//过滤--新增
	filter		//list,返回符合入参函数的E
	filterNot
	filterNotNull	//返回非null元素
	filterIsInstance	//list,返回特定类型的元素
	groupBy		//map, 分组
	intersect	//set,两个容器中都包含的元素
	
	//查找
	find	//返回第一个符合入参函数的元素或null
	findLast
	indexOf	//返回第一个的索引值，无则-1
	indexOfFirst	//返回第一个符合入参条件的元素索引
	indexOfLast	
	last	//最后一个入参是否符合
	lastIndexOf		//最后一个符合条件元素索引，或-1
	lastOrNull	//最有一个元素是否符合,或null
	single	//未找到则抛出异常
	singleOrNull
	
	
	//最大，最小
	max()	//返回最大值的元素
	maxBy	//经过入参函数处理过的最大值
	min()
	minBy
	
	//求和--递减
	fold	//从左往右，在基础值上求和,	 xx.fold(9){t,a->a+t}
	foldRight	//从右往左求和
	reduce	//从左往右递减
	reduceIndexed
	sumBy	//求和 
	
## MutableMap
	//基本示例
	val readWriteMap = hashMapOf("foo" to 1, "bar" to 2)
	println(readWriteMap["foo"])  // prints "1"
	val snapshot: Map<String, Int> = HashMap(readWriteMap)

	//属性
	size	//map尺寸
	keys	// Returns a mutable Set of all keys 
	values	// Returns a mutable Set of all values 
	
	isEmpty()	//判空
	isNotEmpty
	orEmpty()	//如果为null，则返回新map
	forEach((key,value)->{})	//循环

	get		//取值
	getOrDefault	//有则取值，无则返回传入的默认值
	getOrElse		//有则返回值，无则返回传入函数的返回值
	getOrPut		//有则返回，无则设值
	getValue		//key无对应值时抛出异常
	
	clear()	
	put(key: K, value: V)
	putAll(from: Map<out K, V>)
	remove(key: K)
	
	//统计/判断
	all		//boolean, 所有元素匹配
	any		//boolean,任一元素匹配
	count	//int, 返回符合入参函数的规则个数
	none()	//boolean,如果为空
	none((k,v)->{})	//boolean,所有元素都不匹配	
	
	contains	//boolean,是否包含
	containsValue	//boolean
	
	//过滤--新增
	filter	//map,按规则过滤返回新map
	filterNot	//map,反向
	minus		//map,返回删除key(s)后的新map
	minusAssign		//map,删除对应的key(s)
	plus		//map,返回添加新pair(s)后的新map
	plusAssign	//添加到当前map
	toSortedMap
	
	//转换
	map			//list, pair用入参函数转换后放入list中返回, 和flatmap区别是入参函数的入参不同
	flattmap	//list,按入参函数将pair转成元素
	mapKeys		//map, 将key处理后当做新key
	mapValues		//map, 将value处理后当做新value
	toMutableMap	//转成可变map
	
	//查找
	maxBy	//<K,V>, 返回入参函数处理后值最大的那一个pair (null if there are no entries)
	MaxWith	//<K,V>,入参比较函数
	minBY
	minWith

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
	
