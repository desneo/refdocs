    package com.test;

    import org.openqa.selenium.By;
    import org.openqa.selenium.WebDriver;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.ExpectedCondition;
    import org.openqa.selenium.support.ui.WebDriverWait;

    public class AutoLoginSuning
    {
        /**
         * 苏宁自动打卡领云钻
         * @param args
         * @throws InterruptedException
         * @author z00316474
         * @since  BES V100R001C00
         */
        public static void main(String[] args) throws InterruptedException
        {
            System.setProperty("webdriver.chrome.driver", "G:\\program-my\\chromedriver.exe");
            WebDriver dr = new ChromeDriver();

            dr.get("http://www.suning.com/");
            //窗口最大化
            dr.manage().window().maximize();

            //等待登录组件加载完成
            (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>()
            {
                public Boolean apply(WebDriver d)
                {
                    return d.findElement(By.cssSelector("a[href='javascript:SFE.base.logonurl();']")).isDisplayed();
                }
            });

            //如果有新人弹出框，先关闭
            if (dr.findElement(By.cssSelector(".new-user")).isDisplayed())
            {
                dr.findElement(By.cssSelector("i[name='index3_homepage1_xrtk_close']")).click();
            }

            //点击登录按钮
            dr.findElement(By.cssSelector("a[href='javascript:SFE.base.logonurl();']")).click();

            //等待登录页面加载完成
            (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>()
            {
                public Boolean apply(WebDriver d)
                {
                    return d.findElement(By.cssSelector(".login-tab-r span")).isDisplayed();
                }
            });
            //点击账户登录
            dr.findElement(By.cssSelector(".login-tab-r span")).click();

            //输入密码和账户
            dr.findElement(By.cssSelector("#userName")).sendKeys("177xxxx");
            dr.findElement(By.cssSelector("#password")).sendKeys("getxxx");

            //勾选自动登录框
            //WebElement autoLogin = dr.findElement(By.cssSelector("#rememberMe"))

            //点击登录按钮
            dr.findElement(By.cssSelector("#submit")).click();

            //等待"我的易购"按钮加载完成
            //等待登录页面加载完成
            (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>()
            {
                public Boolean apply(WebDriver d)
                {
                    return d.findElement(By.cssSelector(".mysuning-handle span")).isDisplayed();
                }
            });

            //等待 我的易购页加载完成
            dr.findElement(By.cssSelector(".mysuning-handle span")).click();

            (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>()
            {
                public Boolean apply(WebDriver d)
                {
                    return d.findElement(By.cssSelector(".radiu-btn")).isDisplayed();
                }
            });
            dr.findElement(By.cssSelector(".radiu-btn")).click();

            //等待打开 打卡签到页面
            Thread.sleep(3000);
            for (String tempHandleId : dr.getWindowHandles())

            {
                dr.switchTo().window(tempHandleId);
                if (dr.getTitle().equals("打卡签到_苏宁会员_苏宁易购"))
                {
                    //等待 点我打卡加载完成
                    (new WebDriverWait(dr, 10)).until(new ExpectedCondition<Boolean>()
                    {
                        public Boolean apply(WebDriver d)
                        {
                            return d.findElement(By.cssSelector(".lotterydraw-start .starttip")).isDisplayed();
                        }
                    });
                    dr.findElement(By.cssSelector(".lotterydraw-start .starttip")).click();
                }
                continue;

            }

            Thread.sleep(10000);
            dr.quit();
        }
    }
