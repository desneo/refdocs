
# 基础  
	== 相当于java中的equals
	
	println xx?.yy;  //安全引用操作符, 如果xx==null， 则后面不执行  
	
	//字符串求值， 或${x}
	def x = 1;
	def doubleQuoteWithDollar = "I am $x dolloar" //输出I am 1 dolloar
	
	//定义变量
	xx = "asdasd"  //全局变量
	def str= "i am a person"  //类型不定
	String str = "12312"    //若指定类型，则变量类型不可修改
	
	//对象
	def xx= {}; xx.name="asdasd"
	
	//定义函数
	def  nonReturnTypeFunc(){  //函数返回值类型可指定类型，如String，如果不return string则报错
	     [return] last_line;   //return可选， 最后一行代码的执行结果就是本函数的返回值
	}

# 容器操作
## List
	def list = [5, 6, 7, 8];
	def list = [];
		
	//取值
	list[2] == 7	
	list[-2]==6		//从尾部往前取

	list.size()==4	//长度
	
	//添加元素
	list.add(5)		//添加
	list[2]=100		//指定位置添加
	[] << 7 << "i" << 11;
	
	//合并数组
	[1, 2] + 3 + [4, 5] + 6 == [1, 2, 3, 4, 5, 6]
	[['a', 'b'], ['c', 'd']].sum() == ['a', 'b', 'c', 'd']	
	
	//删除清空
	['a',2,'c',4].clear()==[]	//清空数组
	['a','b','c','b','b'] - 'b' == ['a','c']
	['a','b','c','b','b'] - ['b','c'] == ['a']
	['a','b','c','b','b'].remove('c');		//如果有元素被删除返回true，否则false
	
	//判空
	![]		//true, 判空
	[].empty	//true
    
	def list3 = list.clone();	//克隆一个list
	
	list3 == list;		//比较两个list，按元素比较
	
	//遍历循环
	[1, 2, 3].each {println "Item: $it" }	
	['a', 'b', 'c'].eachWithIndex { it, i ->  println "$i: $it"}	//带索引遍历
	
	//查找
	[1, 2, 3].find { item ->if(item==3){return true;}} == 3	//返回第一个符合条件的元素，无则返回null
	[1, 2, 3].findAll { it > 1 } == [2, 3]		//查找所有
	['a', 'b', 'c', 'd', 'e'].findIndexOf { it in ['c', 'e', 'g']} == 2;	//满足条件元素的索引
	['a', 'b', 'c', 'd', 'c'].indexOf('c') == 2
	['a', 'b', 'c', 'd', 'c'].indexOf('z') == -1	//-1表示元素不在list中
	['a', 'b', 'c', 'd', 'c'].lastIndexOf('c') == 4		//最后一个匹配元素
	[1, 2, 3].every { it < 5 }		//返回true/false, 所有元素满足条件
	[1, 2, 3].any { it > 2 }
	
	//过滤
	[1, 2, 3].collect { it * 2 } == [2, 4, 6]
	
	//求和
	[1, 2, 3, 4, 5, 6].sum() == 21 	//求和，对所有元素使用plus()方法
	['a', 'b', 'c', 'd', 'e'].sum() == 'abcde';
	['a', 'b', 'c', 'd', 'e'].sum { ((char) it) - ((char) 'a') } == 10;		//自定义求和方法

	//转字符串
	[1, 2, 3].join('-') == '1-2-3';		//连接数组
	
	//比较
	[9, 4, 2, 10, 5].max()==10;		//最大值
	['x', 'y', 'a', 'z'].min() == 'a'
	['abc', 'z', 'xyzuvw', 'Hello', '321'].max { it.size() } == 'xyzuvw'	//自定义比较方法
	Comparator mc = { a, b -> a == b ? 0 : (a < b ? -1 : 1) };		//自定义比较方法
	def list = [7, 4, 9, -6, -1, 11, 2, 3, -9, 5, -13];
	assert list.max(mc) == 11;

    //排序
	[6, 3, 9, 2, 7, 1, 5].sort() == [1, 2, 3, 5, 6, 7, 9]	//排序
	['abc', 'z', 'xyzuvw', 'Hello', '321'].sort {it.size()} == ['z', 'abc', '321', 'Hello', 'xyzuvw'];	//自定义排序
	[7,4,-6,-9,5,-13].sort { a, b -> a == b ? 0 : Math.abs(a) < Math.abs(b) ? -1 : 1 } //自定义排序，（如比较绝对值）
	
    //是否包含
	'a' in ['a','b','c'];	//元素包含，返true/false
	['a','b','c'].contains('a')
	[1,3,4].containsAll([1,4])		//全部包含
	
	//统计
	[1,2,3,3,3,3,4,5].count(3) == 4;	//统计
	[1,2,3,3,3,3,4,5].count { it%2==0} == 2;	//自定义统计方法


## Map
	def map = [name: 'Gromit', likes: 'cheese', id: 1234];
	def map = [:];
	
	//取值
	map.get('name') == 'Gromit';	//未取到值时返回null
	map['name'] == 'Gromit';
	map.name == 'Gromit';
	emptyMap.size() == 0;
	emptyMap.put("foo", 5);
	ages['Bob'] == null

	def map2 = map.clone();	//克隆map
	
	map.containsKey("name");	//是否包含，返回true,false
	
	//遍历
	map.each { entry ->	println "Name: $entry.key Age: $entry.value"}
	map.each { key, value -> println "Name: $key Age: $value"}

	map1.putAll(map2);	//合并map
	
	//过滤
	def bob = people.find { it.value.name == 'Bob' };	//返回第一个满足条件的map元素
	def females = people.findAll { it.value.gender == 'F' } 	//返回所有
	def agesOfMales = people.findAll { id, person ->
		person.gender == 'M'
	}.collect { id, person ->
		person.age
	}

	//判断
	people.every { id, person ->person.age > 18 };	//满足所有条件，返回true，false
	people.any { id, person ->person.age == 54 };

	//map分组
	assert [
			[name: 'Clark', city: 'London'], [name: 'Sharma', city: 'London'],
			[name: 'Maradona', city: 'LA'], [name: 'Zhang', city: 'HK'],
			[name: 'Ali', city: 'HK'], [name: 'Liu', city: 'HK'],
	].groupBy { it.city } == [
			London: [[name: 'Clark', city: 'London'],
					 [name: 'Sharma', city: 'London']],
			LA    : [[name: 'Maradona', city: 'LA']],
			HK    : [[name: 'Zhang', city: 'HK'],
					 [name: 'Ali', city: 'HK'],
					 [name: 'Liu', city: 'HK']],
	]


# [操作文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	//API详解见链接也页上部
	def targetFile = new File(fileName) //创建file对象
## [读文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/InputStream.html)
	new File(baseDir, 'haiku.txt').eachLine { line -> println line };	//读出所有行
	new File(baseDir, 'haiku.txt').eachLine { line, nb -> println "Line $nb: $line" }	//行号
	def list = new File(baseDir, 'haiku.txt').collect {it}	//返回list
	byte[] contents = file.getBytes();	//读取字节
	
## [写文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	targetFile.append(Object text, String charset)    //尾部追加，不存在则创建
	targetFile.write(String text)   
	targetFile.write(String text, String charset)

## [遍历文件树/文件夹](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	def dir = new File(folderName);
	dir.eachFile { file -> println file.name};	//文件和文件夹，非递归
	dir.eachFileMatch(~/.*\.txt/) { file ->println file.name };	//非递归
	
	dir.eachFileRecurse { file ->println file.name };	//递归
	dir.eachFileRecurse(FileType.FILES) { file ->println file.name };	//只文件，递归	
	
## 终止遍历
	dir.traverse { file ->
		if (file.directory && file.name=='bin') {
			FileVisitResult.TERMINATE                   
		} else {
			println file.name
			FileVisitResult.CONTINUE;                    
		}
	}

# [操作xml](http://groovy-lang.org/search.html)
	//创建xml
	import groovy.xml.*
	def st = new StringWriter()
	MarkupBuilder mb  = new MarkupBuilder(st);
	mb.feed{
		entry(id:"1234567"){
			title{
			 show(name:"1234","fdfsa")
			}
			 link:"readf"
		}
	}
	print st

	//解析xml
	//XmlParser 支持xml文档的GPath表达式，支持findAll、find的查找方式
	//XmlSlurper  类似XmlParser，懒加载方式
	//DOMCategory 用一些语法支持DOM的底层解析
	def xmlSource = new File('xmllocation')
	def slurper= new XmlSlurper().parse(xmlSource)
	println  result.person*.city    //result.person我们会得到多个节点，这时候使用列表操作符*.可以对多个节点收集信息并返回为一个集合
	println  result.person*.@name   //@--获取对应属性的值

	def result = xml.parse(new File("C:/Users/xiaonanzhi/Person.xml"))
	result.person.find{it->
	 if(it.@name == "xiao5"){
	 println it.link.@rel
	 }
	}
	
# 其它	
## [调用shell/cmd指令](http://groovy-lang.org/groovy-dev-kit.html#_reading_files)
	//只用Process对象
	def process = "ls -l".execute();	println "Found text ${process.text}" ;
	def process = "ls -l".execute();process.in.eachLine { line ->println line};

## java<-->groovy互相调用  
	//groovy<--java
		import java.sql.Date;
		Date xx = new Date();
	
	//java<--groovy
	//Test.java
		Test test = new Test();
		String[] roots = new String[]{"files/"};	//指定groovy脚本加载目录
		GroovyScriptEngine groovyScriptEngine = new GroovyScriptEngine(roots); //groovy引擎
		Class scriptClass = groovyScriptEngine.loadScriptByName("exp.groovy");	//加載腳本
		GroovyObject scriptInstance = (GroovyObject)scriptClass.newInstance();	//實例化腳本
		//調用方法，傳入參數
		Test ret = (Test)scriptInstance.invokeMethod("helloWithParam",new Object[]{test,100});
		System.out.println(ret.getAge());
	//exp.groovy
		def helloWithParam(person, age){
			person.age = age;
			return person;
		}
	
	//groovy<--groovy
	    String[] roots = new String[]{"files/"};    //指定groovy脚本加载目录
	    GroovyScriptEngine groovyScriptEngine = new GroovyScriptEngine(roots); //groovy引擎
	    Class scriptClass = groovyScriptEngine.loadScriptByName("exp.groovy");  //加載腳本
	    Binding binding = newBinding();   //脚本中变量入参
	    binding.setVariable("name", "zhousahjkshdkajs");  //设置变量值
	    Object output = groovyScriptEngine.run("hello.groovy", binding);
	//hello.groovy
		return "in param name is ${name}"


## 包 
	//默认导入
	java.io.*
	java.lang.*
	java.math.BigDecimal
	java.math.BigInteger
	java.net.*
	java.util.*
	groovy.lang.*
	groovy.util.*
	
	//引入jar包
	*.groovy中加入 import java.math.* 即可！

## 配置  
	1、下载apache-groovy-sdk-2.4.7.zip --> 环境变量：GROOVY_HOME=G:\program-my\groovy-2.4.7 ， path添加：%GROOVY_HOME%/bin; 
	2、测试 groovy -version 
	        groovyconsole.bat //grrovy控制台，运行Ctrl+R (view中可去掉 show script in output)
	3、groovyc hello.groovy //编译[可免] ;  groovy hello.groovy
