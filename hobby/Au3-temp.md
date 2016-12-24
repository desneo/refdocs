
#内部函数
## 网络管理
	FtpSetProxy Sets the internet proxy to use for ftp access.
	HttpSetProxy Sets the internet proxy to use for http access.
	HttpSetUserAgent Sets the HTTP user-agent string which is sent with all Inet requests.
	InetClose Closes a handle returned from InetGet().
	InetGet 	//下载文件，兼容HHTP/HTTPS/FTP协议
	InetGetInfo Returns detailed data for a handle returned from InetGet().
	InetGetSize Returns the size (in bytes) of a file located on the internet.
	InetRead Downloads a file from the internet using the HTTP, HTTPS or FTP protocol.
	Ping Pings a host and returns the roundtrip-time.
	TCPAccept Permits an incoming connection attempt on a socket.
	TCPCloseSocket Closes a TCP socket.
	TCPConnect Create a socket connected to an existing server.
	TCPListen Creates a socket listening for an incoming connection.
	TCPNameToIP Converts an Internet name to IP address.
	TCPRecv Receives data from a connected socket.
	TCPSend Sends data on a connected socket.
	TCPShutdown, UDPShutdown Stops TCP/UDP services.
	TCPStartup, UDPStartup Starts TCP or UDP services.
	UDPBind Create a socket bound to an incoming connection.
	UDPCloseSocket Close a UDP socket.
	UDPOpen Open a socket connected to an existing server .
	UDPRecv Receives data from an opened socket.
	UDPSend Sends data on an opened socket. 


## 进程管理
	DllCall Dynamically calls a function in a DLL.
	DllCallAddress Dynamically calls a function at a specific memory address.
	DllCallbackFree Frees a previously created handle created with DllCallbackRegister.
	DllCallbackGetPtr Returns the pointer to a callback function that can be passed to the Win32 API.
	DllCallbackRegister Creates a user-defined DLL Callback function.
	DllClose Closes a previously opened DLL.
	DllOpen Opens a DLL file for use in DllCall.
	DllStructCreate Creates a C/C++ style structure to be used in DllCall.
	DllStructGetData Returns the data of an element of the struct.
	DllStructGetPtr Returns the pointer to the struct or an element in the struct.
	DllStructGetSize Returns the size of the struct in bytes.
	DllStructSetData Sets the data of an element in the struct.
	ProcessClose 	//关闭进程
	ProcessExists 	//进程是否存在
	ProcessGetStats Returns an array about Memory or IO infos of a running process.
	ProcessList Returns an array listing the currently running processes (names and PIDs).
	ProcessSetPriority Changes the priority of a process.
	ProcessWait Pauses script execution until a given process exists.
	ProcessWaitClose Pauses script execution until a given process does not exist.
	Run 	//运行外部程序
	RunAs Runs an external program under the context of a different user.
	RunAsWait Runs an external program under the context of a different user and pauses script execution until the program finishes.
	RunWait Runs an external program and pauses script execution until the program finishes.
	ShellExecute Runs an external program using the ShellExecute API.
	ShellExecuteWait Runs an external program using the ShellExecute API and pauses script execution until it finishes.
	Shutdown Shuts down the system.
	StderrRead Reads from the STDERR stream of a previously run child process.
	StdinWrite Writes a number of characters to the STDIN stream of a previously run child process.
	StdioClose Closes all resources associated with a process previously run with STDIO redirection.
	StdoutRead Reads from the STDOUT stream of a previously run child process. 

## 窗口管理
	WinActivate 	//激活窗口到前台
	WinActive 	//指定窗口是否处于激活状态
	WinClose 	//关闭窗口
	WinExists 	//窗口是否存在
	WinFlash Flashes a window in the taskbar.
	WinGetCaretPos Returns the coordinates of the caret in the foreground window.
	WinGetClassList Retrieves the classes from a window.
	WinGetClientSize Retrieves the size of a given window's client area.
	
	WinGetHandle 获得窗口句柄
		WinGetHandle ( "title" [, "text"] )		//title用法详见第一章中windows编程节
	
	WinGetPos Retrieves the position and size of a given window.
	WinGetProcess Retrieves the Process ID (PID) associated with a window.
	WinGetText Retrieves the text from a window.
	WinGetTitle Retrieves the full title from a window.
	WinKill Forces a window to close.
	WinList Retrieves a list of windows.
	WinMenuSelectItem Invokes a menu item of a window.
	WinMinimizeAll 	
	WinMinimizeAllUndo Undoes a previous WinMinimizeAll function.
	WinMove Moves and/or resizes a window.
	WinSetOnTop Change a window's "Always On Top" attribute.
	WinSetState Shows, hides, minimizes, maximizes, or restores a window.
	WinSetTitle Changes the title of a window.
	WinSetTrans Sets the transparency of a window.
	WinWait Pauses execution of the script until the requested window exists.
	WinWaitActive 暂停脚本直到激活指定窗口
	WinWaitClose Pauses execution of the script until the requested window does not exist.
	WinWaitNotActive Pauses execution of the script until the requested window is not active. 

### 控件管理
	1、 ***** ControlID获取见第一章Windows编程

	ControlGetHandle 获取控件的句柄
		ControlGetHandle ( "title", "text", controlID )		//title用法详见第一章中windows编程节
		示例1:获取系统托盘的空间句柄
			$hSysTray = ControlGetHandle('[Class:Shell_TrayWnd]', '', '[Class:ToolbarWindow32;Instance:1]')	
	
	ControlClick Sends a mouse click command to a given control.
	ControlCommand Sends a command to a control.
	ControlDisable Disables or "grays-out" a control.
	ControlEnable Enables a "grayed-out" control.
	ControlFocus Sets input focus to a given control on a window.
	ControlGetFocus Returns the ControlRef# of the control that has keyboard focus within a specified window.
	ControlGetPos Retrieves the position and size of a control relative to its window.
	ControlGetText Retrieves text from a control.
	ControlHide Hides a control.
	ControlListView Sends a command to a ListView32 control.
	ControlMove Moves a control within a window.
	ControlSend Sends a string of characters to a control.
	ControlSetText Sets text of a control.
	ControlShow Shows a control that was hidden.
	ControlTreeView Sends a command to a TreeView32 control.
	StatusbarGetText Retrieves the text from a standard status bar control.
 

	


### WinGetState 获取指定窗口状态
	WinGetState ( "title" [, "text"] )
	成功: 返回一个指示窗口状态的值. 使用 BitAND() 将多个状态值相加检查所需窗口的状态:
		$WIN_STATE_EXISTS (1) = 窗口存在,(即任务栏中存在的程序，仅在通知中心中显示的不算)
		$WIN_STATE_VISIBLE (2) = 窗口可见
		$WIN_STATE_ENABLED (4) = 窗口激活
		$WIN_STATE_ACTIVE (8) = 窗口处于活动状态
		$WIN_STATE_MINIMIZED (16) = 窗口最小化
		$WIN_STATE_MAXIMIZED (32) = 窗口最大化
	失败: 返回 0, @error 设置为 1, 未找到目标窗口.
	Local $hWnd = WinWait("[CLASS:Notepad]", "", 10)
	Local $iState = WinGetState($hWnd)
    If BitAND($iState, 16) Then
    Else

### WinSetState 设置窗口状态
	WinSetState ( "title", "text", flag )
		//title-- The title/hWnd/class of the window to change the state.
		text--The text of the window to change the state(常设"")
		flag:   @SW_HIDE = Hide window
				@SW_SHOW = Shows a previously hidden window
				@SW_MINIMIZE = 最小化窗口(任务栏需有图标)
				@SW_MAXIMIZE = 最大化窗口(任务栏需有图标)
				@SW_RESTORE = Undoes a window minimization or maximization
				@SW_DISABLE = Disables the window
				@SW_ENABLE = Enables the window
		返回值: 1, 0-未找到
	示例：	Local $hWnd = WinWait("[CLASS:Notepad]", "", 10)
			WinSetState($hWnd, "", @SW_SHOW)

# 用户自定义函数参考--UDF--调用WinSDK
	User Defined Function Reference

## GUI相关--分类使用Info中Class确定
### GUI Toolbar--工具栏管理
	1、toolbar 工具栏，内部是按钮。内部的按钮无句柄
	
	_GUICtrlToolbar_ButtonCount		//返回toolbar上的按钮数量
	_GUICtrlToolbar_GetButtonText	//获取按钮上文字
	_GUICtrlToolbar_ClickButton		//点击toolbar上的按钮


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

