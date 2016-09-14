# 60. Groovy
**基础**  
```groovy
== 相当于java中的equals

//安全引用操作符, 如果xx==null， 则后面不执行
println xx?.yy;  

//字符串求值， 或${x}
def x = 1
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


//List
def aList = [5,'string',true] //List由[]定义，其元素可以是任何对象
        //可以直接通过索引存取，而且不用担心索引越界。如果索引超过当前链表长度，List会自动往该索引添加元素
array.add(obj); 
def xx = []; xx +="name"
println(aList[0..1])  //取前2个值
println(aList[-1])  //倒数第一个值
aList.size  ===>结果是101

//Map
def aMap = ['key1':'value1','key2':true]  //Map由[:]定义，注意其中的冒号。冒号左边是key，右边是Value。
println aMap['keyName']   //取值，这种表达方法更传统一点
aMap.anotherkey = "i am map"  //为map添加新元素
def key1="wowo"
def aConfusedMap=[key1:"who am i?"] //aConfuseMap中的key1到底是"key1"还是变量key1的值“wowo”？显然，答案是字符串"key1"。
                              //如果要是"wowo"的话，def aConfusedMap=[(key1):"who am i?"]
```

**闭包**
```
//Groovy中，当函数的最后一个参数是闭包的话，可以省略圆括号。
targetFile.eachLine { //流式操作每一行
    String line ->  println line
}

//定义闭包
def sayhello = {
  name ->   //定义入参
    println("name="+name);
}
```

**内置的集合操作**
```
each  //["Cat", "Dog", "Elephant"].each{yy-> println yy}(默认提供一个it变量)	遍历集合，对每一项处理函数
collect //手机每一项处理后的返回值，类似java8 lamdba中map
inject  //集合分组
findAll //找到所有匹配元素
max   //集合中最大值
min
```

**正则表达式**  
```groovy
~     创建匹配模式
=~    创建一个匹配器
==~   计算是否匹配

```

**操作xml**  
```
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

```

**[文件I/O操作](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)**  
```groovy
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
````

**java<-->groovy互相调用**  
```groovy
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
```


**包**  
```
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
```

**配置**  
```
1、下载apache-groovy-sdk-2.4.7.zip --> 环境变量：GROOVY_HOME=G:\program-my\groovy-2.4.7 ， path添加：%GROOVY_HOME%/bin; 
2、测试 groovy -version 
        groovyconsole.bat //grrovy控制台，运行Ctrl+R (view中可去掉 show script in output)
3、groovyc hello.groovy //编译[可免] ;  groovy hello.groovy
```

#eclipse
**快捷键** 
```
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
```
**插件**  
```
1) 在线安装：eclipse-->help-->marketpalce
   离线：插件jar包放在eclipse下plugin目录
2) 打开文件文件： Open Explorer (市场中名字eclispe explorer)
```

**配置** 
```
1)[关闭变量名后自动补全类型字符](http://www.itnose.net/detail/6143864.html)  
2)Ctrl+S时自动格式化代码，删除unuse的包:  
	windows->preference->java/Editor/Save action->勾选Format source Code, Organize import  
3)设置默认编码 
	Window->Preferences->General->Workspace->Text file encoding 选择UTF-8  
4) 设置tab键为4个空格
	window->preference->General->Editors->Text Editors,选中右侧的 insert space for tabs;
```

**远程debug**
```
下一个断点: F8  单步： F6	  进入： F5  
查看变量：　debug视图--》 Variables --> 变量名--》voProperties --> properties -->table即可  

--》打开远程debug： debug图标 --> debug configuration -->  Remote java Application --》 配置地址端口--》 勾选"Allow termination of remote VM"
--》 查看debug远程端口：  /home/business/opt/container/bin/catalina.sh -->  搜索 Xdebug --》（常用:8090）
-->打开debug视图 --》 右上角 open persperctive --> debug
```
    
# maven
**安装**
```
注：下载后解压即可(先安装jdk), 升级下载最新包，修改M2_HOME值即可
1.“系统变量”中增加变量 M2_HOME , 值 H:\program\apache-maven-3.2.3 （Maven的安装路径）。 
2.“ 系统变量”Path中末尾加 %M2_HOME%\bin;	
//测试安装成功
echo %M2_HOME%		//变量是否指向了正确的安装目录
mvn  -v			//能否正确找到mvn的执行脚本

//IDE中配置maven
window-->preference-->搜索maven-->Installations-->add
```

**基础问题** 
```
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
``` 

**pom.xml解析**  
```
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
```

**坐标和依赖**
```
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
```

**仓库**  
```
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
```

**其它**  
```
10、创建maven project：new project-->maven project --> 勾选"Create a simple project" 不使用骨架
11、[创建webapp项目](http://jingyan.baidu.com/article/9f63fb91a7d2a5c8400f0e20.html)：
	先创建一个普通的maven project（package选war），src/main下面会生成webapp目录--> 工程 properties-->project facets -->java选中1.8
	-->Danamic web module取消，apply， 再勾选apply-->生成webContent目录-->将其下的MEATA_INF和WEB_INF复制到src/main/webapp下
	-->删掉webcontent-->
	修改发布规则-->工程 右键 properties --> Deployment Assembly -->测试目录不需发布可以去掉
					   --> 指定web路径-->add-->folder-->选中webapp目录
```
