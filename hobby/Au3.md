
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
## [参考地址](https://zhuanlan.zhihu.com/p/19792473?columnSlug=autohotkey)
## [au3十一天教程](http://blog.csdn.net/bolg_hero/article/details/50083303)
## [AutoIt进行桌面操作](http://www.360doc.com/content/10/1214/18/8392_78106234.shtml)

## windows编程
		Title--窗口标题
		Class--窗口类
		句柄--类似指向指针的指针，用于定位对象和资源
		controlID--窗口内部控件ID，获得 "[CLASS:Edit; INSTANCE:1]" 	 //CLASS和INSTANCE可使用WindowInfo工具在Control标签中查看到
	1、使用自带的Window Info工具查看窗口的Title和Class
	2、 window--窗口， Control--控件
			窗口包含 下拉框、单选按钮等控件
	3、
	
## window系统名中英文对照
	1、右下角的通知区域(系统托盘) <==>System tray
	
	

# 语法 不区分大小写
## 注释;
## 数据类型
	$fBoolean1 = True;	//boolea值
	$fBoolean2 = False
	
	//二进制
	$bin = Binary("abc")
	$str = String($bin)    ; "0x616263"
	
	//指针Pointer
	
## 变量$xX
	Local $vVariabl=1;	//局部变量
	Global $vVariable1="xx", $vVariable2;	//全局变量
	Const $iConst1 = 1, $iConst2 = 12;		//静态变量
	
	//数组
	Local $aArray[4];
	$aArray[0]="asdasd";
	Local $aArray[7] = [3, 7.5, "string"]
	$aArray[0] == "xx";		//取值

## 操作符
	//其它符号同常用含义
	&	//连接字符串, "one" & 10=="one10"
	<>	//是否不相等，等同 Not ("string1" == "string2")
	And	//If $vVar = 5 And $vVar2 > 6 Then 
	Or	//If $vVar = 5 Or $vVar2 > 6 Then
	Not	//Not 1 
	? :		//三目运算符

## 条件语句
	//以下所有，如果一个条件成立，则后面所有条件都被忽略
	1、If...Then...Else 
	2、Select...Case 
	3、Switch...Case 
	4、Ternary 
	
	//示例1
	#include <Constants.au3>
	If $iNumber > 0 Then
    MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was positive!")
	ElseIf $iNumber < 0 Then
		MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was negative!")
	Else
		MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was zero.")
	EndIf 
	
	//示例2, 代替多分的if else
	Select
		Case $iNumber > 1 And $iNumber <= 10
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 1")

		Case $iNumber > 10 And $iNumber <= 20
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 10")

		Case $iNumber > 20 And $iNumber <= 30
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 20")

		Case $iNumber > 30 And $iNumber <= 40
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 30")

		Case $iNumber > 40
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 40")
	EndSelect 
	
	//示例3
	Local $iNumber = 30
	Switch Int($iNumber)
		Case 1 To 10
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 1")
		Case 11 To 20
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 10")
		Case 21 To 30
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 20")
		Case 31 To 40
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 30")
		Case Else
			MsgBox($MB_SYSTEMMODAL, "Example", "$iNumber was greater than 40 or less or equal to 0")
	EndSwitch 
	
## 循环
	1、For...Next 
	2、While...WEnd 
	3、Do...Until 
	4、For...In...Next (可遍历对象节点)
	5、ExitLoop   终止while/do/for循环(类似break)
		ContinueLoop  继续循环(continue)
	
	
	//示例1
	For $i = 5 To 1 Step -1
		MsgBox($MB_SYSTEMMODAL, "", "Count down!" & @CRLF & $i)
	Next
	
	//示例2
	Local $i = 0
	While $i <= 10
		MsgBox($MB_SYSTEMMODAL, "", "Value of $i is: " & $i)
		$i = $i + 1
	WEnd
	
	//示例3
	Local $i = 0
	Do
		MsgBox($MB_SYSTEMMODAL, "", "The value of $i is: " & $i) ; 
		$i = $i + 1 ; 
	Until $i = 10 ;
	
	//示例4--遍历数组或对象节点
	For $Window In $oShellWindows
		$sString = $sString & $Window.LocationName & @CRLF
	Next

## 自定义函数Func...EndFunc
	$iDoubled = MyDouble($iNumber);
	Func MyDouble($iValue)
		$iValue = $iValue * 2
		Return $iValue
	EndFunc	

#宏@--表示一些常用变量
## au相关
	@Compiled Returns 1 if script is a compiled executable or an .a3x file; returns 0 if an .au3 file. 
	@error Status of the error flag. See the function SetError(). 
	@exitCode Exit code as set by Exit statement. 
	@exitMethod Exit method. See the function OnAutoItExitRegister(). 
	@extended Extended function return - used in certain functions such as StringReplace(). 
	@NumParams Number of parameters used in calling the user function. 
	@ScriptName Filename of the running script. 
	@ScriptDir Directory containing the running script. Only includes a trailing backslash when the script is located in the root of a drive. 
	@ScriptFullPath Equivalent to @ScriptDir & "\" & @ScriptName 
	@ScriptLineNumber 	//代码行号，常用与debug 
	@WorkingDir 		//Current/active working directory. Only includes a trailing backslash when the script is located in the root of a drive. 
	@AutoItExe 			//The full path and filename of the AutoIt executable currently running. For compiled scripts it is the path of the compiled script; for .a3x and .au3 files it is the path of the interpreter running the file. 
	@AutoItPID Process identifier (PID) of the current script. 
	@AutoItVersion Version number of AutoIt such as 3.3.10.2 
	@AutoItX64 Returns 1 if the script is running under the native x64 version of AutoIt. 

	 
	@COM_EventObj Object the COM event is being fired on. Only valid in a COM event function. 
	@GUI_CtrlId Last click GUI Control identifier. Only valid in an event Function. See the GUICtrlSetOnEvent() function. 
	@GUI_CtrlHandle Last click GUI Control handle. Only valid in an event Function. See the GUICtrlSetOnEvent() function. 
	@GUI_DragId Drag GUI Control identifier. Only valid on Drop Event. See the GUISetOnEvent() function. 
	@GUI_DragFile Filename of the file being dropped. Only valid on Drop Event. See the GUISetOnEvent() function. 
	@GUI_DropId Drop GUI Control identifier. Only valid on Drop Event. See the GUISetOnEvent() function. 
	@GUI_WinHandle Last click GUI window handle. Only valid in an event Function. See the GUICtrlSetOnEvent() function. 
	@HotKeyPressed Last hotkey pressed. See the HotKeySet() function. 

	 
	For use with the WinSetState(), Run(), RunWait, FileCreateShortcut() and FileGetShortcut() functions: 
	@SW_DISABLE Disables the window. 
	@SW_ENABLE Enables the window. 
	@SW_HIDE Hides the window and activates another window. 
	@SW_LOCK Lock the window to avoid repainting. 
	@SW_MAXIMIZE Activates the window and displays it as a maximized window. 
	@SW_MINIMIZE Minimizes the specified window and activates the next top-level window in the Z order. 
	@SW_RESTORE Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window. 
	@SW_SHOW Activates the window and displays it in its current size and position. 
	@SW_SHOWDEFAULT Sets the show state based on the SW_ value specified by the program that started the application. 
	@SW_SHOWMAXIMIZED Activates the window and displays it as a maximized window. 
	@SW_SHOWMINIMIZED Activates the window and displays it as a minimized window. 
	@SW_SHOWMINNOACTIVE Displays the window as a minimized window. This value is similar to @SW_SHOWMINIMIZED, except the window is not activated. 
	@SW_SHOWNA Displays the window in its current size and position. This value is similar to @SW_SHOW, except the window is not activated. 
	@SW_SHOWNOACTIVATE Displays a window in its most recent size and position. This value is similar to @SW_SHOWNORMAL, except the window is not activated. 
	@SW_SHOWNORMAL Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time. 
	@SW_UNLOCK Unlock window to allow painting. 

	 
	@TRAY_ID Last clicked item identifier during a TraySetOnEvent() or TrayItemSetOnEvent() action. 
	@TrayIconFlashing Returns 1 if tray icon is flashing; otherwise, returns 0. 
	@TrayIconVisible Returns 1 if tray icon is visible; otherwise, returns 0. 

	 
	@CR Carriage return, Chr(13); occasionally used for line breaks. 
	@LF Line feed, Chr(10); occasionally used for line breaks. 
	@CRLF @CR & @LF; typically used for line breaks. 
	@TAB Tab character, Chr(9) 

## 目录相关宏
	Macros for "All Users" data. 
	@AppDataCommonDir Path to Application Data 
	@DesktopCommonDir Path to Desktop 
	@DocumentsCommonDir Path to Documents 
	@FavoritesCommonDir Path to Favorites 
	@ProgramsCommonDir Path to Start Menu's Programs folder 
	@StartMenuCommonDir Path to Start Menu folder 
	@StartupCommonDir Path to Startup folder 

	 
	Macros for Current User data. 
	@AppDataDir Path to current user's Roaming Application Data 
	@LocalAppDataDir Path to current user's Local Application Data 
	@DesktopDir Path to current user's Desktop 
	@MyDocumentsDir Path to My Documents target 
	@FavoritesDir Path to current user's Favorites 
	@ProgramsDir Path to current user's Programs (folder on Start Menu) 
	@StartMenuDir Path to current user's Start Menu 
	@StartupDir current user's Startup folder 
	@UserProfileDir Path to current user's Profile folder. 

	 
	Other macros for the computer system: 
	@HomeDrive Drive letter of drive containing current user's home directory. 
	@HomePath Directory part of current user's home directory. To get the full path, use in conjunction with @HomeDrive. 
	@HomeShare Server and share name containing current user's home directory. 
	@LogonDNSDomain Logon DNS Domain. 
	@LogonDomain Logon Domain. 
	@LogonServer Logon server. 
	@ProgramFilesDir Path to Program Files folder 
	@CommonFilesDir Path to Common Files folder 
	@WindowsDir Path to Windows folder 
	@SystemDir Path to the Windows' System (or System32) folder. 
	@TempDir Path to the temporary files folder. 
	@ComSpec Value of %COMSPEC%, the SPECified secondary COMmand interpreter;
	primary for command line uses, e.g. Run(@ComSpec & " /k help | more") 

## 系统信息
	@CPUArch Returns "X86" when the CPU is a 32-bit CPU and "X64" when the CPU is 64-bit. 
	@KBLayout Returns code denoting Keyboard Layout. See Appendix for possible values. 
	@MUILang Returns code denoting Multi Language if available (Vista is OK by default). See Appendix for possible values. 
	@OSArch Returns one of the following: "X86", "IA64", "X64" - this is the architecture type of the currently running operating system. 
	@OSLang Returns code denoting OS Language. See Appendix for possible values. 
	@OSType Returns "WIN32_NT" for XP/2003/Vista/2008/Win7/2008R2/Win8/2012/Win8.1/2012R2. 
	@OSVersion Returns one of the following: "WIN_10", "WIN_81", "WIN_8", "WIN_7", "WIN_VISTA", "WIN_XP", "WIN_XPe",
		for Windows servers: "WIN_2016", "WIN_2012R2", "WIN_2012", "WIN_2008R2", "WIN_2008", "WIN_2003"". 
	@OSBuild Returns the OS build number. For example, Windows 2003 Server returns 3790 
	@OSServicePack Service pack info in the form of "Service Pack 3". 
	@ComputerName Computer's network name. 
	@UserName ID of the currently logged on user. 
	@IPAddress1 IP address of first network adapter. Tends to return 127.0.0.1 on some computers. 
	@IPAddress2 IP address of second network adapter. Returns 0.0.0.0 if not applicable. 
	@IPAddress3 IP address of third network adapter. Returns 0.0.0.0 if not applicable. 
	@IPAddress4 IP address of fourth network adapter. Returns 0.0.0.0 if not applicable. 

	@DesktopHeight Height of the primary display in pixels. (Vertical resolution) 
	@DesktopWidth Width of the primary display in pixels. (Horizontal resolution) 
	@DesktopDepth Depth of the primary display in bits per pixel. 
	@DesktopRefresh Refresh rate of the primary display in hertz. 

## 日期和时间
	@MSEC Milliseconds value of clock. Range is 000 to 999. The update frequency of this value depends on the timer resolution of the hardware and may not update every millisecond. 
	@SEC Seconds value of clock. Range is 00 to 59 
	@MIN Minutes value of clock. Range is 00 to 59 
	@HOUR Hours value of clock in 24-hour format. Range is 00 to 23 
	@MDAY Current day of month. Range is 01 to 31 
	@MON Current month. Range is 01 to 12 
	@YEAR Current four-digit year 
	@WDAY Numeric day of week. Range is 1 to 7 which corresponds to Sunday through Saturday. 
	@YDAY Current day of year. Range is 001 to 366 (or 001 to 365 if not a leap year) 
