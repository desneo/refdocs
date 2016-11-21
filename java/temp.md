
## [操作xml](http://groovy-lang.org/processing-xml.html)
### 解析xml XmlParser/XmlSlurper
	//XmlSlurper-返回GpathResult,懒加载,
	//适用于将一个已存在文件转成另一个文件
	def text = '''
		<list>
			<technology>
				<name>Groovy</name>
			</technology>
		</list>
	'''
	def list = new XmlSlurper().parseText(text) ;
	assert list instanceof groovy.util.slurpersupport.GPathResult ;
	assert list.technology.name == 'Groovy';

	//XmlParser示例-返回Node,加载所有节点
	//适用于同时更新和读文件的场景
	def text = '''
		<list>
			<technology>
				<name>Groovy</name>
			</technology>
		</list>
	'''
	def list = new XmlParser().parseText(text) ;
	assert list instanceof groovy.util.Node ;
	assert list.technology.name.text() == 'Groovy' ;

### GPath
	

### 创建xml
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
