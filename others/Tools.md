# sublime3
## 快捷键  
    Ctrl+P  project(见插件3)中检索文件，不需通配符*
    Ctrl+G  跳转指定行
    Ctrl+L  选择行，重复则增加选择下一行
    Ctrl+C  复制当前行
    Ctrl+X  删除当前行
    Ctrl+G  跳转指定行
    Ctrl+Shift+方向  交换上下行
    Ctrl+J  合并当前行和下一行
    
## 插件 
    注： preference-->package control -->输入install
    1、Emmet
    2、gbk，GBK编码兼容
    3、sidebarEnhancements -->左侧边栏Folders,View -> Side Bar, Project -> Add Folder to Project
    4、Bracket Highlighter：匹配括号提示
    5、ChineseLocalization 界面中文，切换语言，帮助(H)/Language/简体中文，繁体中文，日本语，English。
    6、TrailingSpaces 尾部空格标注
    7、Html Beautify

## 手动安装package Control  
    1) [点击下载文件](https://sublime.wbond.net/Package%20Control.sublime-package)
    2) sublime-->preference-->Browser Packages 会打开安装目录(如C:\Users\z00316474\AppData\Roaming\Sublime Text 3\Packages)
    3) ../Installed Packages , 将1）中文件放入目录, 重启
    4) 安装成功后，Preferences菜单最下边是否有Package Settings 和Package Control两个选项

## 其它  
    //黑色背景下需调整鼠标
      桌面-->右键-->性化-->改鼠标样式-->“自定义”框中选中“文本选择”-->浏览-->找到beam_r.cur 样式，使用即可！
    //设置4个空格代替tab键
    视图-->缩进-->Tab 4个空格


# Markdown语法
	转义字符\
    换行 --> 尾部至少两个空格
    分割线 --> *** 连续3个*号
    代码块 --> 每一行至少4个空格或1个tab
    粗体 --> **此处粗体** 双*夹起
    斜体 --> *此处斜体* 单*夹起
    标题 --> 1~6个#号，表示1~6级标题， #号后加空格
    图片与链接
      区别在一个!号，图片需要url  
      [baidu](www.baidu.com)  
      ![插入的图片](http://cdn.sspai.com/attachment/thumbnail/2014/04/15/f96c892fc63933ab186235f7c910753b10f77_mw_800_wm_1_wmp_3.jpg)
    列表

## 表格
	//羽毛球<br>乒乓球   br进行表格内换行
	| Tables        | Are           | Cool  |
	| ------------- |:-------------:| -----:|
	| col 3 is      | right-aligned | $1600 |
	| col 2 is      | centered      |   $12 |
	| zebra stripes | are neat      |    $1 |
    
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |	
  
# git  
    索引词：github
## 安装
	//生成密钥对
		1、生成公私钥对： ssh-keygen -t rsa -C "desneo@163.com"  
			（不需密码，默认即可）， 用户主目录（/c/Users/Administrator/.ssh）下生成id_rsa和id_rsa.pub文件  
		2、github设置账户公钥：settings-->SSH and GPG keys -->New SSH key --> 将公钥内容全部复制-->添加  
	//TortoiseGit
		1.安装完成后需要设置，否则clone时报错（可选择指定分支）：右键-->TortoiseGit > Settings > Network > 
			SSH Client to git安装目录\bin\ssh.exe (必须ssh.exe才可)。
		2.如果要提交代码，需要按“命令行”中步骤添加公钥。
		3.右键提交， 可同时commit/push,也可以分步进行。
	
## 命令
	git pull  //	更新
	git reset --hard 4e325b3f4840822647ae0b3cfe5beb01a69affd4	//回退到指定commit
	
    	强制覆盖： git push -f   //强覆盖方式用你本地的代码替代git仓库内的内容

## git stash
		我们有时会遇到这样的情况，正在分支a上开发一半，然后分支b上发现Bug，需要马上处理。
		这时候分支a上的修改怎么办呢，git add 是不行的，有的git客户端版本会提示还有add过的文件没提交不能
	切换分支，有的git客户端版本会把修改带到b分支。
		git stash 就是解决这个问题，它把当前工作区的修改和git add的内容都保存到一个地方，然后git reset HEAD，
	使工作区回到上一次提交，处于干净状态。然后就可以很放心的切到另外的分支b干活了。

	git stash save “先给我保存一下，我要去别的分支修bug”
	git stash list
	git stash pop
	git stash apply stash@{num}

## git blame 查找代码修改人

## http://geek.csdn.net/news/detail/67091
	
## git rebase
		有的时候我们在一个分支a开发的时候，master已经进入了很多修改，这时候如果把a的修改提交上去，可能就会
	跟主干有冲突，需要在主干解决冲突才能提交，这样比较难看。
		这时候git rebase就有用了，git rebase BRANCH_NAME可以把BRANCH_NAME分支的修改带到当前分支来，
	这样当前分支就有了BRANCH_NAME分支的所有内容，这样在当前分支开发的内容提交以后不会跟BRANCH_NAME有冲突，
	冲突在当前分支就可以解决。

## git reset
		可以取消已经提交的commit，一般我们只用git reset HEAD^。因为每个分支可能开发过程中为了保存过程以便回溯会有很多commit，
	但是我们要求进入主干时，每个功能和bugfix只能有一个提交，因此可以先用git reset退回到最早的commit，然后把自己的修改最后打包
	成一个commit，再去跟主干合并。

		利用这两个命令，我们可以很好的管理我们的MySQL开发。我们只有一个master分支作为主干，不允许在主干上直接开发。每个同学根据feature
	和bug的issue建立分支，然后在分支上开发，不管开发过程中有多少个commit，我们要求最终提交每个bugfix或feature只能有一个提交。因此每个
	同学完成开发后，都需要git reset 退到最早的commit，git stash save宝存一下自己的修改，然后git checkout master; git pull拖一下最新的
	主干，然后返回自己的分支，再做git rebase master，把当前分支推进到主干，最后git stash pop弹出修改，有冲突则在当前分支解决，再git push。

# vim/gvim（安装目录下vimrc）
    ##打开utf-8乱码
    "显示行号  
    set nu  
    "自动折行  
    set wrap  
    "tab间距  
    set tabstop=4  
    set softtabstop=4  
    "文件编码，打开utf-8乱码问题  
    set encoding=utf-8  
    "终端编码需与当前主机保持一致，否则展示乱码  
    set termencoding=gbk  
    set fileencoding=utf-8  
    set fileencodings=ucs-bom,utf-8,gbk,cp936,gb18030,big5,euc-jp,euc-kr,latin  
    ##gvim中文菜单乱码乱  
    "gvim解决菜单乱码   
    source $VIMRUNTIME/delmenu.vim  
    source $VIMRUNTIME/menu.vim  
    "gvim解决consle输出乱码  
    language messages zh_CN.utf-8 



# 其它  
## 系统环境变量
    set 命令  //展示当前生效的所有环境变量
    SETX PATH C:\ /M   //新增修改系统环境变量(/M-修改到系统环境变量)
    SETX PATH "%PATH%;C:\\" /M  //某个系统变量中追加

## 安装新字体
    方法a) 字体文件（*.ttf）直接拖进 C:\windows\fonts 目录中。
    方法b) 字体下载到硬盘，然后打开“控制面板”->字体 ->再点击菜单“文件”->安装新字体。


## windows上关闭站口占用的程序
    1) 查找占用端口的进程号， netstat -ano | findstr 80
    2) 进程号找到进程名，tasklist | findstr 2000
    3) 进程管理器中关闭进程即可

# word相关
## 不能输入英文双引号 
    左上角office图标-->word选项-->校对-->自动更正选项-->自动套用格式-->取消“直引号替换为弯引号”
                                                      &&“键入时自动套用格式”取消“直引号替换为弯引号”

## 粘贴图片显示空白 
    点击左上角office图标word选项高级”显示文档内容”栏下的“显示图片框”， 不勾选	。	即可显示图片。
    

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
	12). 安装 file explore插件，Open Containing Folder in a File Explorer， 右键打开文件地址
	
	//配置maven
	File--> settings -->maven --> 配置即可
	
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

## [仓库](http://search.maven.org/)
    1、仓库搜索服务 --> http://search.maven.org/
    2、超级pom,中央仓库 ${M2_HOME}/lib/maven-model-builder-3.0.4.jar --> \org\apache\maven\model\pom-4.0.0.xml, 所有Maven POM的父POM
    3、//本地仓库（可从maven中复制一份到此处修改，不要修改全局的settings.xml）
        ~/.m2/settings.xml --> localRepository标签指定本地仓库地址
        
    4、//远程仓库（私服是一种特殊的远程仓库）可多个，pom.xml配置-单工程有效，settings.xml全部有效
      <repositories>  
    	<repository>  
    	  <id>cloudhopper</id>  
    	  <name>Repository for Cloudhopper</name>  
    	  <url>http://maven.cloudhopper.com/repos/third-party/</url>  //仓库地址，http协议
    	  <releases>       
    		<enabled>true</enabled>   //开启发布版本支持    
    	  </releases>       
    	  <snapshots>       
    		<enabled>false</enabled>  //不会下载快照版本(最新版)
    	  </snapshots>  
    	</repository>  
      </repositories>  

    5、镜像--一般用于代替中央仓库提供服务,一般公司内部有一个
    <mirrors>
      <mirror> 
    	<id>rnd-huawei</id> 
    	<name>ibiblio Mirror of http://repo1.maven.org/maven2/</name> 
    	<url>http://rnd-mirrors.hxxx.com/maven/</url>
    	<mirrorOf>central</mirrorOf> 
      </mirror>
    </mirrors>

## 其它  
	10、创建maven project：new project-->maven project --> 勾选"Create a simple project" 不使用骨架
	11、[创建webapp项目](http://jingyan.baidu.com/article/9f63fb91a7d2a5c8400f0e20.html)：
		先创建一个普通的maven project（package选war），src/main下面会生成webapp目录--> 工程 properties-->project facets -->java选中1.8
		-->Danamic web module取消，apply， 再勾选apply-->生成webContent目录-->将其下的MEATA_INF和WEB_INF复制到src/main/webapp下
		-->删掉webcontent-->
		修改发布规则-->工程 右键 properties --> Deployment Assembly -->测试目录不需发布可以去掉
						   --> 指定web路径-->add-->folder-->选中webapp目录