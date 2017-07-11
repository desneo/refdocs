
## 执行多个shell命令
	1) 在每个命令之间用；（分号）隔开。
	2) 在每个命令之间用&&隔开。  表示前一个执行成功才会执行下一个
	3) 在每个命令之间用||隔开。  若前一个命令执行成功，就不会执行下一条了。


# Shell编程
## 变量 (不要空格)
	声明： i=1
	使用: $i / ${i}
## 字符串
	连接字符串： var3=${var1}${var2}
## Shell数组和循环
	声明: array=(element1 element2 element3 .... elementN) 		//()括起来 空格分开
	读取: #echo ${array[0]} 
	遍历： ${array[@]}  
	循环: 	(1) for data in ${array[@]}  
				do  
					echo ${data}  
				done  
			(2) 可用标准的for循环
			(3) for shname in `ls *.sh`
			(4) while循环
				i=1
				while(($i<100))


	sed -n '5,7p' ,只显示5~7行
	sed -n '4p' ,只显示第4行

	
	
	awk 
		-v var=val    变量， 可外部指定一个变量，在{}中使用


# IDEA
## 常用配置
	File --> Settings   (Ctrl + Alt + S)
		1).提示不区分大小写: Editor-->Genereal-->Code Completion-->Case sensitive completion  All
		2).文件tab标签多行显示：  Editor-->Genereal-->Editor Tabs --> show in single rows
		3).注释在代码头部而不是行首: Editor-->Code Style-->Java-->Code generation-->comment Code-->取消 comment at first column
		4).设置字体大小: Editor-->Colors&fonts-->Font --> Size 17合适
		5).开启字体大小滚轮调节: Editor-->General-->Change font size with Ctrl+Mouse Wheel
		5). 文件编码： File Encodings --> 全部改成utf-8即可
		6).显示方法分割线:Editor-->General--》Appearance--> show method separators
		7).文件打开方式: Editors-->File Type--> Rcognized File Types
		8).忽略的文件: Editors-->File Type--> Ignore files and folders
		9).启动时手动选择打开的工程：Appearance-->System Setttings--> startup/shutdown
		10).tab页和左侧文件列表自动对应跳转:Project-->齿轮-->Autoscroll to source
		11). 设置eclipse快捷键 --> keymap --> eclipse
		12). 安装 file explore插件: plugins --> Open Containing Folder in a File Explorer， 右键打开文件地址
	
	//配置maven
		File--> settings -->maven --> 配置即可
	
	//配置代理
		proxy --> http proxy --> manual proxy 手动代理
	
	//修改主题 	http://blog.csdn.net/guliangliang/article/details/50407946
	
	//导入maven工程
		a).设置:Settings-->maven-->Maven Home directory/User settings File
		b).导入maven工程：打开一个工程-->File-->new --Source from exists source-->选中根pom.xml
		c).project-->右键-->maven-->
	
## 快捷键
	//设置eclipse快捷键

	//查找
	双击shift 全局查找
	CTRL+N   查找类
	CTRL+SHIFT+N  查找文件
	CTRL+G   定位行
	CTRL+SHIFT+F  全局查找
	CTRL+R   替换
	CTRL+SHIFT+R  全局替换
	ALT+SHIFT+C  查找修改的文件
	CTRL+E   最 近打开的文件
	F3   向下查找关键字出现位置
	SHIFT+F3  向上一个关键字出现位置
	
	//查看代码
	Alt+1   显示project视图
	Alt+7	显示所有方法和变量	
	Alt+-->/<--	代码前进后退
	
	//编辑
	Alt		列编辑模式
	Ctrl+W	连按扩大选取范围
	Ctrl+Alt+L  格式化代码
	Ctrl+D	复制当前行到下一行
	Ctrl+X	剪切当前行
	
	Alt+Insert  自动生成getter/setter等方法
	Alt+Enter	自动提示
