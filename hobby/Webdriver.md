# Selenium基础
	//等待几秒钟
	Thread.sleep(1000);

## 简单示例-打开网页
	//需对应浏览器的驱动，驱动单独下载
	System.setProperty("webdriver.chrome.driver", "C:\\my-program\\chromedriver.exe");	
	WebDriver driver = new ChromeDriver();
	driver.get("http://www.baidu.com/");
## [Webdriver使用指南](https://www.gitbook.com/book/easonhan007/selenium-webdriver/details)
## POM
	<dependencies>
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-java</artifactId>
			<version>3.0.1</version>
		</dependency>
	</dependencies>
	
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
	//浏览器最大化
	driver.manage().window().maximize();

	//设置浏览器大小
	//webdriver提供了很多调整浏览器窗口的接口，比如move_to(移动窗口)，position(设置或获取浏览器的位置)。在一般情况下这些功能并不常用。
	driver.manage().window().setSize(new Dimension(320, 240));
	
	//前进和后退
	 driver.navigate().back();
	 driver.navigate().forward();
	
	//当前title和url
	System.out.printf("title of current page is %s\n", dr.getTitle());
	System.out.printf("url of current page is %s\n", dr.getCurrentUrl());
	
## 启动浏览器 
	System.setProperty("webdriver.chrome.driver", "C:\\my-program\\chromedriver.exe");
	WebDriver driver = new ChromeDriver();

## 关闭浏览器-quit
	close--关闭当前的浏览器窗口
	quit--不仅关闭窗口，还会彻底的退出webdriver，释放与driver server之间的连接
	WebDriver dr = new ChromeDriver();
	dr.quit(); 


## 打开页面URL get
	//navigate.to会产生1个Navigator对象，其封装了与导航相关的一些方法，比如前进后退等。
	driver.get("http://www.baidu.com");	
		//注：页面加载完成后才会往下执行

## 对象定位(s)
	//定义一组对象 List<WebElement> checkboxes = dr.findElements(By.cssSelector("input[type=checkbox]"));
	id			//id定位，dr.findElement(By.id("inputEmail")).click();
	xpath		//dr.findElement(By.xpath("/html/body/form/div[3]/div/label/input")).click();
	css selector	//WebElement div = dr.findElement(By.cssSelector(".controls"));
	name		//标签属性值定位，  dr.findElement(By.name("password"));  
				//<input type="password" id="inputPassword" placeholder="Password" name="password">
	class name	
	link text	//WebElement link = dr.findElement(By.linkText("register"));
	partial link text	//WebElement sameLink = dr.findElement(By.partialLinkText("reg"));
	tag name	//标签定位， dr.findElement(By.tagName("form")).getAttribute("class");  如<form>

### 层级定位 select中的某一项
	dr.findElement(By.linkText("Link1")).click();
	
	(new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>(){
		public Boolean apply(WebDriver d){
			return d.findElement(By.id("dropdown1")).isDisplayed();
		}
	} );
	
	WebElement menu = dr.findElement(By.id("dropdown1")).findElement(By.linkText("Another action"));
	(new Actions(dr)).moveToElement(menu).perform();

### [定位frame中的元素](https://easonhan007.gitbooks.io/selenium-webdriver/content/26/frame.java.html)
	处理frame需要用到2个方法，分别是switchTo().frame(element|index|id)和switchTo.defaultContent()
	switchTo().frame()入参支持一下。作用是把当前定位的主体切换到指定的frame里
		WebElement， 可以传入一个已经定位的frame元素。如 switchTo().frame(dr.findElement(By.id("myFrame")))
		int index， 可以传入页面上frame的索引，如0表示第1个frame
		String id, 可以传入frame的id
	switchTo.defaultContent方法的话则是从frame中嵌入的页面里跳出，跳回到最外面的原始页面中。
	示例 ：
		dr.switchTo().frame("f1");
		dr.switchTo().defaultContent();

## 操作测试对象
	//click 点击对象
		dr.findElement(By.linkText("Link1")).click();
		
	//clear 清除对象的内容，如果可以的话
		WebElement element = dr.findElement(By.name("q");
		element.clear();
		
### sendKeys 在对象上模拟按键输入
	WebElement element = dr.findElement(By.id("q"));
	element.sendKeys("something");
	
	示例2：将A多行文本框中的内容清空并复制到B文本框中。
	dr.findElement(By.id("A")).sendKeys(Keys.chord(Keys.CONTROL + "a"));	
	dr.findElement(By.id("A")).sendKeys(Keys.chord(Keys.CONTROL + "x"));
	dr.findElement(By.id("B")).sendKeys(Keys.chord(Keys.CONTROL + "v"));

### 示例 百度页面自动搜索
	driver.get("http://www.baidu.com");
	WebElement element = driver.findElement(By.name("kw"));
	element.sendKeys("周绍华");
	driver.findElement(By.id("su")).click();
	
	
	
## 执行js executeScript
	//页面上直接执行一段js
	((JavascriptExecutor)dr).executeScript("$('#tooltip').fadeOut();");
	
	//在某个已经定位的元素的上执行js
	WebElement button = dr.findElement(By.className("btn"));
	((JavascriptExecutor)dr).executeScript("$(arguments[0]).fadeOut();", button);

## [wait 等待执行完成](https://easonhan007.gitbooks.io/selenium-webdriver/content/25/wait.java.html)
	//Wait类的使用场景是在页面上进行某些操作，然后页面上就会出现或隐藏一些元素，此时使用WebDriverWait类的
		until方法来等待这些效果完成以便进行后续的操作。另外页面加载时有可能会执行一些ajax，这时候也需要去
		WebDriverWait的until的等待ajax的请求执行完毕。
	在实例化WebDriverWait类时，有下面2个构造方法
		public WebDriverWait(WebDriver driver, long timeOutInSeconds);
		public WebDriverWait(WebDriver driver, long timeOutInSeconds, long sleepInMillis);
			//WebDriver driver。不言而喻
			//long timeOutInSeconds。总体的超时时间，最多等这么久。
			//long sleepInMillis。每隔多久去检查一次until的结果
			默认情况下，unitl中的NotFoundException会被忽略，但是其他异常还是正常传播的。你可以通过ignoring(exceptions to add)自己定义需要忽略的异常。
            dr.findElement(By.id("btn")).click();
            (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>() {
				public Boolean apply(WebDriver d) {
						return d.findElement(By.className("label")).isDisplayed();
					}
			});	
	
## [cookie与自动登录](https://easonhan007.gitbooks.io/selenium-webdriver/content/32/cookie.java.html)
	有很多系统的登陆信息都是保存在cookie里的，因此只要往cookie中添加正确的值就可以实现自动登陆了。什么图片验证码、登陆的用例就都是浮云了。
	webdriver读写cookie的接口有以下一些:
		//构造函数中可设置过期时间, 
			Cookie(String name, String value, String path, Date expiry)
		addCookie(Cookie cookie)。添加cookie，参数是Cookie对象
		deleteAllCookies。删除所有cookie
		getCookies。返回所有的cookie
		deleteCookieNamed(String name)。删除name这个cookie
		getCookieNamed(String name)。返回特定name的cookie值
	示例：
		Cookie c1 = new Cookie("BAIDUID", "xxxxxxxxxx");
        dr.manage().addCookie(c1);
		
	示例2：自动登录百度
		driver.get("http://www.baidu.com");
        System.out.println(driver.manage().getCookies());
        Cookie c1 = new Cookie("BAIDUID", "FEBF1691EDBA5CACD0E35016F5DB070B:FG=1");
        Cookie c2 = new Cookie("BDUSS",
                "FNRXVGYXJFbWVucFZXazdlYXk0d2ttSX45blVSVHY5OFJPOTZ3Y3d1Q3BaSlZZSVFBQUFBJCQAAAAAAAAAAAEAAAB4px4MZ2V0bWUxOTg3MTIwOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKnXbVip121Y");
        driver.manage().addCookie(c1);
        driver.manage().addCookie(c2);
        driver.findElement(By.id("su")).click();

## [浏览器tab页切换](http://www.bubuko.com/infodetail-912343.html)
			
	
## 超时设置
	//webdriver中可以设置很多的超时时间
	implicitlyWait。识别对象时的超时时间。过了这个时间如果对象还没找到的话就会抛出NoSuchElement异常
	setScriptTimeout。异步脚本的超时时间。webdriver可以异步执行脚本，这个是设置异步执行脚本脚本返回结果的超时时间
	pageLoadTimeout。页面加载时的超时时间。因为webdriver会等页面加载完毕在进行后面的操作，所以如果页面在这个超时时间内没有加载完成，那么webdriver就会抛出异常。

	# 定位对象时给3s的时间
	# 如果3s内还定位不到则抛出异常
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	# 页面加载超时时间设置为5s
		dr.manage().timeouts().pageLoadTimeout(5, TimeUnit.SECONDS);
	# 异步脚本的超时时间设置成3s 
		dr.manage().timeouts().setScriptTimeout(3, TimeUnit.SECONDS);	
		
