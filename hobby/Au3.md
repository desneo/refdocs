
##基本信息
	后缀: *.au3
### [参考地址](https://zhuanlan.zhihu.com/p/19792473?columnSlug=autohotkey)

	
## [拟鼠标点击（按钮等）控件](https://zhuanlan.zhihu.com/p/19792473?columnSlug=autohotkey)
	适用命令/函数：Click/MouseClick/ControlClick
	其 中 Click/MouseClick 用来模拟用户的物理操作（点击），把鼠标点击事件发送到指定坐标位置（相对当前窗口或绝对位置）上，但这种方法并不能保证 100% 的准确性，屏幕分辨​率、用户干扰和系统环境等都会影响到它们的执行结果；
	而 ControlClick 则直接把鼠标点击事件发送到目标窗口的目标控件上，因而更准确，一般我们不考虑使用坐标位​置方式的点击

### ControlClick 
	使用：ControlClick ( "窗口标题", "窗口文本", 控件ID [, 按钮] [, 点击次数]] )
	查看标题等信息使用安装目录下的  AutoIt Window Info 工具。
	
	//示例
	ControlClick("SearchGroupCustListBO.bo.xml 属性", "", "确定")	//打开了文件的属性，自动点击属性上的"确定"按钮。
### MouseClick
	使用：MouseClick ( “按钮” [, X坐标, Y坐标 [, 点击次数 [, 速度 ]]] )
		// 按钮:”left”(左键),”right”(右键),”middle”(中键),”main”(主键),”menu”(菜单键),”primary”(主要按钮),”secondary”(次要按钮)，默认点击左键。
		//X坐标, Y坐标：[可选] 鼠标移动到屏幕 X/Y坐标处执行点击，若两者都留空则使用当前位置。
		//点击次数：[可选] 点击鼠标按钮的次数，默认值为 1。
		//速度：[可选] 鼠标移动速度,可设数值范围在 1(最快)和 100(最慢)之间.若设置速度为 0 则立即移动鼠标到指定位置.默认速度为 10.
		//返回1表示点击成功，返回0点击失败。
	
	鼠标位置查看器： http://jszj.7edown.com:808/green/mousexy.rar
		
	//使用示例
	
	
	
	
	
	
	
	
