
#基本信息
	Windows自动安装脚本语言
	软件: autoit-v3-setup.exe	
		  SciTE4AutoIt3.exe  //专用脚本编辑器
	后缀: *.au3
	帮助文档： 安装目录下的 AutoIt.chm
	
	//注释
	;MouseClick ( "left" , 3653, 184,2000,0 )	//单行注释 ;号开头
	#comments-start 	//多行注释，成对出现
		asfasdasd
	#comments-end 

## 语法
	1-每个功能都以"命令"的形式提供，Function(param1, param2, …) 
	2-解释器自上而下，除非遇到“Return”、“Goto”、“Gosub”、“Exit”等语句、函数、热键或其它能使​脚本“跳”到某个标识符的条件成立。
	3-不区分大小写，包括关键字和标识符（包括变量名、命令名、函数名等）s。
	
## [参考地址](https://zhuanlan.zhihu.com/p/19792473?columnSlug=autohotkey)
## [au3十一天教程](http://blog.csdn.net/bolg_hero/article/details/50083303)

# 运行程序或打开文件
## 运行程序
	Run("Notepad.exe")
	
# [模拟鼠标点击（按钮等）控件](https://zhuanlan.zhihu.com/p/19792473?columnSlug=autohotkey)
	适用命令/函数：Click/MouseClick/ControlClick
	其 中 Click/MouseClick 用来模拟用户的物理操作（点击），把鼠标点击事件发送到指定坐标位置（相对当前窗口或绝对位置）上，但这种方法并不能保证 100% 的准确性，屏幕分辨​率、用户干扰和系统环境等都会影响到它们的执行结果；
	而 ControlClick 则直接把鼠标点击事件发送到目标窗口的目标控件上，因而更准确，一般我们不考虑使用坐标位​置方式的点击

## ControlClick 
	使用：ControlClick ( "窗口标题", "窗口文本", 控件ID [, 按钮] [, 点击次数]] )
	查看标题等信息使用安装目录下的  AutoIt Window Info 工具。
	
	//示例
	ControlClick("SearchGroupCustListBO.bo.xml 属性", "", "确定")	//打开了文件的属性，自动点击属性上的"确定"按钮。
	
## MouseClick
	使用：MouseClick ( “按钮” [, X坐标, Y坐标 [, 点击次数 [, 速度 ]]] )
		// 按钮:”left”(左键),”right”(右键),”middle”(中键),”main”(主键),”menu”(菜单键),”primary”(主要按钮),”secondary”(次要按钮)，默认点击左键。
		//X坐标, Y坐标：[可选] 鼠标移动到屏幕 X/Y坐标处执行点击，若两者都留空则使用当前位置。
		//点击次数：[可选] 点击鼠标按钮的次数，默认值为 1。
		//速度：[可选] 鼠标移动速度,可设数值范围在 1(最快)和 100(最慢)之间.若设置速度为0则立即移动鼠标到指定位置(速度最快),默认速度为 10. 
		//返回1表示点击成功，返回0点击失败。
	
	鼠标位置查看器： http://jszj.7edown.com:808/green/mousexy.rar
		
	//使用示例
	MouseClick ( "left" , 3653, 184,1000,0 )
	
# 热键--快捷键
	使用： HotKeySet( "key" [, "function"] )
		//key： # win, ! Alt, + Shift, ^ Ctrl
## 示例1
	//win+r 快捷键时弹出对话框
	#include <MsgBoxConstants.au3>
	HotKeySet("#c", "ShowMessage") ; Shift-Alt-d
	While 1
		Sleep(100)
	WEnd
	Func ShowMessage()
		MsgBox($MB_SYSTEMMODAL, "", "This is a message.")
	EndFunc   ;==>ShowMessage
## 示例2
	//若未打开则打开 ，以打开则展示窗口
	HotKeySet("#c", "ShowMessage") ; Shift-Alt-d
	While 1
		Sleep(100)
	WEnd
	Func ShowMessage()
		If Not ProcessExists("Everything.exe")Then Run("D:\program\Everything\Everything.exe")
	EndFunc   ;==>ShowMessage

	
	
	
