# Selenium基础
## 简单示例-打开网页
	//需对应浏览器的驱动，驱动单独下载
	System.setProperty("webdriver.chrome.driver", "C:\\my-program\\chromedriver.exe");	
	WebDriver driver = new ChromeDriver();
	driver.get("http://www.baidu.com/");

# 常用的Selenium命令
	open					//通过URL打开网页。
	click/clickAndWait 		//执行单击操作，同时等待新页面加载。
	verifyTitle/assertTitle //验证期望的网页标题。
	verifyTextPresent 		//验证网页中有期望的文本。
	verifyElementPresent 	//验证通过HTML标记定义的期望UI元素在页面中存在。
	verifyText 				//验证期望文本，同时它对应的HTML标记在页面中存在。
	verifyTable 			//验证表格期望的内容。
	waitForPageToLoad 		//暂停执行直到期望的新页面加载完成。当clickAndWait使用时会自动调用。
	waitForElementPresent 	//暂停执行直到通过HTML标记定义的期望UI元素在页面中存在。

# 常用操作
## 启动浏览器 
	System.setProperty("webdriver.chrome.driver", "C:\\my-program\\chromedriver.exe");
	WebDriver driver = new ChromeDriver();

## 关闭浏览器-quit
	close--关闭当前的浏览器窗口
	quit--不仅关闭窗口，还会彻底的退出webdriver，释放与driver server之间的连接
	WebDriver dr = new ChromeDriver();
	dr.quit(); 

## 浏览器最大化
	driver.manage().window().maximize();

## 设置浏览器大小
	//webdriver提供了很多调整浏览器窗口的接口，比如move_to(移动窗口)，position(设置或获取浏览器的位置)。在一般情况下这些功能并不常用。
	driver.manage().window().setSize(new Dimension(320, 240));
	
## 打开页面URL get
	//navigate.to会产生1个Navigator对象，其封装了与导航相关的一些方法，比如前进后退等。
	driver.get("http://www.baidu.com");




