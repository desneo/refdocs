# Groovy
## 基础  
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

## 容器操作
### List
	def list = [5, 6, 7, 8];
	list[2] == 7	
	list[-2]==6		//从尾部往前取
	list.size()==4	//长度
	list.add(5)		//添加
	list[2]=100		//指定位置添加
	def list=[];	//追加元素
	list << 7 << "i" << 11
	assert list == [7, "i", 11]
	['a',2,'c',4].clear()==[]	//清空数组

	['a','b','c','b','b'] - 'b' == ['a','c']	//删除元素
	['a','b','c','b','b'] - ['b','c'] == ['a']
	['a','b','c','b','b'].remove('c');		//如果有元素被删除返回true，否则false

	![]		//true, 判空
	[].empty	//true,判空

	def list3 = list.clone();	//克隆一个list
	list3 == list;		//比较两个list，按元素比较

	[1, 2, 3].each {println "Item: $it" }	//遍历数组
	['a', 'b', 'c'].eachWithIndex { it, i ->  println "$i: $it"}	//带索引遍历

	[1, 2, 3].find { it > 1 } == 2	//查找第一个符合条件的元素
	[1, 2, 3].findAll { it > 1 } == [2, 3]		//查找所有
	['a', 'b', 'c', 'd', 'e'].findIndexOf { it in ['c', 'e', 'g']} == 2;	//满足条件元素的索引
	['a', 'b', 'c', 'd', 'c'].indexOf('c') == 2
	['a', 'b', 'c', 'd', 'c'].indexOf('z') == -1	//-1表示元素不在list中
	['a', 'b', 'c', 'd', 'c'].lastIndexOf('c') == 4		//最后一个匹配元素

	[1, 2, 3].every { it < 5 }		//返回true/false, 所有元素满足条件
	[1, 2, 3].any { it > 2 }	

	[1, 2, 3, 4, 5, 6].sum() == 21 	//求和，对所有元素使用plus()方法
	['a', 'b', 'c', 'd', 'e'].sum() == 'abcde';
	['a', 'b', 'c', 'd', 'e'].sum { ((char) it) - ((char) 'a') } == 10;		//自定义求和方法
	[['a', 'b'], ['c', 'd']].sum() == ['a', 'b', 'c', 'd']	//合并数组

	[1, 2, 3].join('-') == '1-2-3';		//连接数组

	[9, 4, 2, 10, 5].max()==10;		//最大值
	['x', 'y', 'a', 'z'].min() == 'a'	
	['abc', 'z', 'xyzuvw', 'Hello', '321'].max { it.size() } == 'xyzuvw'	//自定义比较方法
	Comparator mc = { a, b -> a == b ? 0 : (a < b ? -1 : 1) };		//自定义比较方法	
	def list = [7, 4, 9, -6, -1, 11, 2, 3, -9, 5, -13];
	assert list.max(mc) == 11;

	'a' in ['a','b','c'];	//元素包含，返true/false
	['a','b','c'].contains('a')
	[1,3,4].containsAll([1,4])		//全部包含
	[1,2,3,3,3,3,4,5].count(3) == 4;	//统计
	[1,2,3,3,3,3,4,5].count { it%2==0} == 2;	//自定义统计方法

	[6, 3, 9, 2, 7, 1, 5].sort() == [1, 2, 3, 5, 6, 7, 9]	//排序
	['abc', 'z', 'xyzuvw', 'Hello', '321'].sort {it.size()} == ['z', 'abc', '321', 'Hello', 'xyzuvw'];	//自定义排序
	[7,4,-6,-9,5,-13].sort { a, b -> a == b ? 0 : Math.abs(a) < Math.abs(b) ? -1 : 1 } //自定义排序，（如比较绝对值）

### Map
	def map = [name: 'Gromit', likes: 'cheese', id: 1234];
	map.get('name') == 'Gromit';	//未取到值时返回null
	map['name'] == 'Gromit';
	map.name == 'Gromit';
	emptyMap.size() == 0;
	emptyMap.put("foo", 5);
	ages['Bob'] == null

	def map2 = map.clone();	//克隆map
	map.containsKey("name");	//包含，返回true,false

	map.each { entry ->		//遍历map
		println "Name: $entry.key Age: $entry.value"
	}
	map.each { key, value ->	//直接取key、value
		println "Name: $key Age: $value"
	}

	map1.putAll(map2);	//合并map

	def bob = people.find { it.value.name == 'Bob' };	//查找
	def females = people.findAll { it.value.gender == 'F' }
	def agesOfMales = people.findAll { id, person ->
		person.gender == 'M'
	}.collect { id, person ->
		person.age
	}

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


## 操作xml  
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

## [操作文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)**  
	//主要使用闭包操作
	def targetFile = new File(文件名) //创建file对象
	//读文件
	targetFile.getBytes()  //文件内容一次性读出，返回类型为byte[]
	List	readLines()   //行读取
	targetFile.eachLine { //流式操作每一行
	    String line ->  println line
	}
	
	//写文件
	targetFile.append(Object text, String charset)    //尾部追加，不存在则创建
	targetFile.write(String text)   
	targetFile.write(String text, String charset) 

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

# eclipse
## 快捷键 
	Alt+Shift+B 打开面包屑视图，展示当天文件的路径（重要）  
	Ctrl+Shift+G  展示调用当前方法的所有类（鼠标定位到这个方法） 
	Ctrl+T / F4  当前接口的所有实现类
	Ctrl+Shift+O 删除unuse的包
	Alt+Shift+R  统一修改参数名字/类变量、 方法变量等  
	Ctrl+E/Ctrl+F6 展示当前已打开的所有文件  
	Alt+Shift+->  范围选取  
	Ctrl+Shift+P  跳到对应的大括号处  
	Alt+Shift+M   抽取子方法（先选中代码块)  
	Ctrl+Shift+Y/X  选中字符转大小写  
	Ctrl+K/Ctrl+Shift+K 向下/向上查找  
	Ctrl+L  跳转指定行  
	Ctrl+T 搜索class  
	Ctrl+R 搜索java文件  
	Ctrl+D  删除当前行  
	Ctrl+o  当前文件的属性和方法  
	Ctrl+H  搜索  
	eclispe各种视图 -->Window-->Showview-->Other  

## 插件  
	1) 在线安装：eclipse-->help-->marketpalce
	   离线：插件jar包放在eclipse下plugin目录
	2) 打开文件文件： Open Explorer (市场中名字eclispe explorer)

## 配置 
	1)[关闭变量名后自动补全类型字符](http://www.itnose.net/detail/6143864.html)  
	2)Ctrl+S时自动格式化代码，删除unuse的包:  
		windows->preference->java/Editor/Save action->勾选Format source Code, Organize import  
	3)设置默认编码 
		Window->Preferences->General->Workspace->Text file encoding 选择UTF-8  
	4) 设置tab键为4个空格
		window->preference->General->Editors->Text Editors,选中右侧的 insert space for tabs;

## 远程debug
	下一个断点: F8  单步： F6	  进入： F5  
	查看变量：　debug视图--》 Variables --> 变量名--》voProperties --> properties -->table即可  
	
	--》打开远程debug： debug图标 --> debug configuration -->  Remote java Application --》 配置地址端口--》 勾选"Allow termination of remote VM"
	--》 查看debug远程端口：  /home/business/opt/container/bin/catalina.sh -->  搜索 Xdebug --》（常用:8090）
	-->打开debug视图 --》 右上角 open persperctive --> debug
    
# maven
## 安装
	注：下载后解压即可(先安装jdk), 升级下载最新包，修改M2_HOME值即可
	1.“系统变量”中增加变量 M2_HOME , 值 H:\program\apache-maven-3.2.3 （Maven的安装路径）。 
	2.“ 系统变量”Path中末尾加 %M2_HOME%\bin;	
	//测试安装成功
	echo %M2_HOME%		//变量是否指向了正确的安装目录
	mvn  -v			//能否正确找到mvn的执行脚本
	
	//IDE中配置maven
	window-->preference-->搜索maven-->Installations-->add

## 基础问题 
	1、pom.xml总是在项目的根目录。
	2、约定优于配置：
			源码目录为 src/main/java
			编译输出目录为 target/classes/
			打包方式默认为jar(如果不指定packaging标签的话)
			包输出目录为target
	3、maven中通过groupId、artifactId、version定位到一个唯一jar、pom、car。
	4、Maven所需构件都是直接从本地仓库获取的。如果本地没有，会尝试从远程仓库下载构件至本地仓库，然后再使用本地仓库的构件。
	5、maven指令
		//test前会自动compile，package前会自动test，install前会自动package
		mvn clean compile   //编译
		mvn clean test
		mvn clean package   //打包（成jar后war）
		mvn clean install   //将工程打出的包安装到本地仓库

## pom.xml解析  
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	  <modelVersion>4.0.0</modelVersion>	//当前pom模型的版本，3.0必须是4.0.0
	  <groupId>com.huawei</groupId>		//必须，项目属于哪个组，一般值项目关联的组织/公司
	  <artifactId>ttt</artifactId>		//必须，项目在组中唯一的id
	  <version>0.0.1-SNAPSHOT</version>	//必须，项目当前版本(snapchat-快照，开发中非稳定版本)
	  <packaging>war</packaging>	//可选，打包方式，默认jar
	  <name>Maven hello project</name>	//可选，对用户更友好的项目名称
	  
	  <dependencies>  
		<dependency>  
		    <groupId>org.springframework</groupId>  //必选
		    <artifactId>spring-core</artifactId>  //必选
		    <version>${springframework.version}</version	//必选  
		    <type>jar</type>   //可选，依赖类型，默认jar
		    //可选，依赖范围，默认compile-编译/测试/运行都需要；test-只测试需要；provided-编译测试；runtime-运行
		    <scope>compile</scope>  
		</dependency>  
	  </dependencies>  
	</project>

## 坐标和依赖
	//传递性依赖
	   例子：项目有Spring-aop:4.1.1.RELEASE的依赖，而Spring-aop也有自己的依赖（maven仓库中的pom.xml），maven会自动解析依赖获得依赖的包。
	//依赖冲突的处理
	   如果项目A有这样的依赖关系：A->B->C->X(1.0)、A->D->X(2.0), 这样依赖路径上有两个版本的X。原则如下：
	   1.路径最近者优先。如上1.0的路径长度是3，2.0的长度是2，则2.0的X会被使用。
	   2.路径长度相同时，第一声明者优先。即在pom.xml中使用先声明的那个。
	//排除依赖
	
	查看依赖信息
	   mvn dependency:tree 优先 --> 解析成依赖树，可以看出某个依赖是从哪个路径引入的。
	   mvn dependency:list 	--> 解析并显示依赖列表。 列出所有依赖的文件。

## 仓库  
	//仓库搜索服务 --> http://search.maven.org/
	//超级pom,中央仓库
		${M2_HOME}/lib/maven-model-builder-3.0.4.jar --> \org\apache\maven\model\pom-4.0.0.xml, 所有Maven POM的父POM
	//本地仓库（可从maven中复制一份到此处修改，不要修改全局的settings.xml）
		~/.m2/settings.xml --> localRepository标签指定本地仓库地址
	//远程仓库（私服是一种特殊的远程仓库）可多个，pom.xml配置-单工程有效，settings.xml全部有效
		  <repositories>  
			<repository>  
			  <id>cloudhopper</id>  
			  <name>Repository for Cloudhopper</name>  
			  <url>http://maven.cloudhopper.com/repos/third-party/</url>  //仓库地址，http协议
			  <releases>       
				<enabled>true</enabled>   //开启发布版本支持    
			  </releases>       
			  <snapshots>       
				<enabled>false</enabled>  //不会下载快照版本
			  </snapshots>  
			</repository>  
		  </repositories>  
	
	//快照版本-snapchat，总是更新到最新版本
	//镜像--一般用于代替中央仓库提供服务
	
	//仓库搜索服务

## 其它  
	10、创建maven project：new project-->maven project --> 勾选"Create a simple project" 不使用骨架
	11、[创建webapp项目](http://jingyan.baidu.com/article/9f63fb91a7d2a5c8400f0e20.html)：
		先创建一个普通的maven project（package选war），src/main下面会生成webapp目录--> 工程 properties-->project facets -->java选中1.8
		-->Danamic web module取消，apply， 再勾选apply-->生成webContent目录-->将其下的MEATA_INF和WEB_INF复制到src/main/webapp下
		-->删掉webcontent-->
		修改发布规则-->工程 右键 properties --> Deployment Assembly -->测试目录不需发布可以去掉
						   --> 指定web路径-->add-->folder-->选中webapp目录
