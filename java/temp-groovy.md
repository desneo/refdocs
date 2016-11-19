## [操作文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	//API详解见链接也页上部
	def targetFile = new File(fileName) //创建file对象
### [读文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/InputStream.html)
	new File(baseDir, 'haiku.txt').eachLine { line -> println line };	//读出所有行
	new File(baseDir, 'haiku.txt').eachLine { line, nb -> println "Line $nb: $line" }	//行号
	def list = new File(baseDir, 'haiku.txt').collect {it}	//返回list
	byte[] contents = file.getBytes();	//读取字节
	
### [写文件](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	targetFile.append(Object text, String charset)    //尾部追加，不存在则创建
	targetFile.write(String text)   
	targetFile.write(String text, String charset)

### [遍历文件树/文件夹](http://docs.groovy-lang.org/latest/html/groovy-jdk/java/io/File.html)
	def dir = new File(folderName);
	dir.eachFile { file -> println file.name};	//文件和文件夹，非递归
	dir.eachFileMatch(~/.*\.txt/) { file ->println file.name };	//非递归
	
	dir.eachFileRecurse { file ->println file.name };	//递归
	dir.eachFileRecurse(FileType.FILES) { file ->println file.name };	//只文件，递归	
	
### 终止遍历
	dir.traverse { file ->
		if (file.directory && file.name=='bin') {
			FileVisitResult.TERMINATE                   
		} else {
			println file.name
			FileVisitResult.CONTINUE;                    
		}
	}

## [操作xml](http://groovy-lang.org/search.html)
	
	
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
	
	
## [调用shell/cmd指令](http://groovy-lang.org/groovy-dev-kit.html#_reading_files)
	//只用Process对象
	def process = "ls -l".execute();	println "Found text ${process.text}" ;
	def process = "ls -l".execute();process.in.eachLine { line ->println line};

