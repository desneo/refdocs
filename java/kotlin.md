# 改进点/基础
	
	//安全判空
	val length = text?.length;

	var name = "123"; 	//可变变量
	val name = "asdasd";	//不可变量，相当于java的final
	
	//三目运算符变化
	val text = if (x > 5)
				  "x > 5"
			   else "x <= 5"
	
	//多行字符串
	val xx = """asdasdasd
			  aasdasd
			  asdasdsd """;
			  
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

## 逻辑操作
	//替换switch Case
	var score = // some score
	var grade = when (score) {
		9, 10 -> "Excellent" 
		in 6..8 -> "Good"
		4, 5 -> "Ok"
		in 1..3 -> "Fail"
		else -> "Fail"
	}

## 对象
	//1-- 扩展原有类, 如实现扩展String，添加toDate()方法
		public fun String.toDate(): Date {
			return java.text.SimpleDateFormat("yyyy-MM-dd").parse(this)
		}
		// 直接使用 "2017-02-02".toDate()　就直接将String转为Date
	
	//2-- 不可为null对象
	var output: String; output = null;	//编译报错
	
## 容器操作

# 其它
## main函数
	class KotlinTe { 	}
	fun main(args: Array<String>) {
		var output: String? = "123123";
		println(ou);
	}


## eclipse插件安装
	完成后重启eclipse，可以看到在新建项目里有kotlin项目
	1) 在线安装
		help --> eclispe market --> kotlin
	2) 手动安装
		0. https://dl.bintray.com/jetbrains/kotlin/eclipse-plugin/0.8.2/  手动下载上面地址里的两个文件夹（plugins/和features/）
		a.假设Eclipse的安装目录在C:\eclipse，在该文件夹下，新建这样的目录结构C:\eclipse\PluginsEclipse\kotlin；
		b.将features and plugins两个文件夹放到C:\eclipse\PluginsEclipse\kotlin里。
		c.在C:\eclipse目录中新建links（C:\eclipse\links）目录，在links目录中建立一个以link为扩展名的文本文件如kotlin.link，内容如下path=C:\eclipse\PluginsEclipse\kotlin 或者path=C:\\eclipse\\PluginsEclipse\\kotlin（插件的目录），
		d.保存后重启eclipse插件就会安装完成。
	
