
# [web.xml详解](http://my.oschina.net/u/1383439/blog/224448)
	web.xml 的加载顺序是：context-param -> listener -> filter -> servlet ，而同个类型之间的实际程序调用的时候的顺序是根据对应的 mapping 的顺序进行调用的。

## Web.xml常用元素
    <web-app>
    	<display-name></display-name>定义了WEB应用的名字
    	<description></description> 声明WEB应用的描述信息

    	<context-param></context-param> context-param元素声明应用范围内的初始化参数。
    	<filter></filter> 过滤器元素将一个名字与一个实现javax.servlet.Filter接口的类相关联。
    	<filter-mapping></filter-mapping> 一旦命名了一个过滤器，就要利用filter-mapping元素把它与一个或多个servlet或JSP页面相关联。
    	<listener></listener>servlet API的版本2.3增加了对事件监听程序的支持，事件监听程序在建立、修改和删除会话或servlet环境时得到通知。
    					 Listener元素指出事件监听程序类。
    	<servlet></servlet> 在向servlet或JSP页面制定初始化参数或定制URL时，必须首先命名servlet或JSP页面。Servlet元素就是用来完成此项任务的。
    	<servlet-mapping></servlet-mapping> 服务器一般为servlet提供一个缺省的URL：http://host/webAppPrefix/servlet/ServletName。
    			  但是，常常会更改这个URL，以便servlet可以访问初始化参数或更容易地处理相对URL。在更改缺省URL时，使用servlet-mapping元素。

    	<session-config></session-config> 如果某个会话在一定时间内未被访问，服务器可以抛弃它以节省内存。
    		  可通过使用HttpSession的setMaxInactiveInterval方法明确设置单个会话对象的超时值，或者可利用session-config元素制定缺省超时值。

    	<mime-mapping></mime-mapping>如果Web应用具有想到特殊的文件，希望能保证给他们分配特定的MIME类型，则mime-mapping元素提供这种保证。
    	<welcome-file-list></welcome-file-list> 指示服务器在收到引用一个目录名而不是文件名的URL时，使用哪个文件。
    	<error-page></error-page> 在返回特定HTTP状态代码时，或者特定类型的异常被抛出时，能够制定将要显示的页面。
    	<taglib></taglib> 对标记库描述符文件（Tag Libraryu Descriptor file）指定别名。此功能使你能够更改TLD文件的位置，
    				  而不用编辑使用这些文件的JSP页面。
    	<resource-env-ref></resource-env-ref>声明与资源相关的一个管理对象。
    	<resource-ref></resource-ref> 声明一个资源工厂使用的外部资源。
    	<security-constraint></security-constraint> 制定应该保护的URL。它与login-config元素联合使用
    	<login-config></login-config> 指定服务器应该怎样给试图访问受保护页面的用户授权。它与sercurity-constraint元素联合使用。
    	<security-role></security-role>给出安全角色的一个列表，这些角色将出现在servlet元素内的security-role-ref元素
    				   的role-name子元素中。分别地声明角色可使高级IDE处理安全信息更为容易。
    	<env-entry></env-entry>声明Web应用的环境项。
    	<ejb-ref></ejb-ref>声明一个EJB的主目录的引用。
    	<ejb-local-ref></ejb-local-ref>声明一个EJB的本地主目录的应用。
    </web-app>


## 相应元素配置
### Web应用图标：指出IDE和GUI工具用来表示Web应用的大图标和小图标
    <icon>
    	<small-icon>/images/app_small.gif</small-icon>
    	<large-icon>/images/app_large.gif</large-icon>
    </icon>

###	Web 应用名称：提供GUI工具可能会用来标记这个特定的Web应用的一个名称
    <display-name>Tomcat Example</display-name>

### Web 应用描述： 给出于此相关的说明性文本
    <disciption>Tomcat Example servlets and JSP pages.</disciption>

### 上下文参数：声明应用范围内的初始化参数。
    <context-param>
    	<param-name>ContextParameter</para-name>
    	<param-value>test</param-value>
    	<description>It is a test parameter.</description>
    </context-param>
    在servlet里面可以通过getServletContext().getInitParameter("context/param")得到

### 过滤器配置：将一个名字与一个实现javaxs.servlet.Filter接口的类相关联。
    <filter>
    		<filter-name>setCharacterEncoding</filter-name>
    		<filter-class>com.myTest.setCharacterEncodingFilter</filter-class>
    		<init-param>
    			<param-name>encoding</param-name>
    			<param-value>GB2312</param-value>
    		</init-param>
    </filter>
    <filter-mapping>
    		<filter-name>setCharacterEncoding</filter-name>
    		<url-pattern>/*</url-pattern>
    </filter-mapping>

### 监听器配置
	<listener>
		  <listerner-class>listener.SessionListener</listener-class>
	</listener>

### Servlet配置
    基本配置
    <servlet>
      <servlet-name>snoop</servlet-name>
      <servlet-class>SnoopServlet</servlet-class>
    </servlet>
    <servlet-mapping>
      <servlet-name>snoop</servlet-name>
      <url-pattern>/snoop</url-pattern>
    </servlet-mapping>
    高级配置
    <servlet>
      <servlet-name>snoop</servlet-name>
      <servlet-class>SnoopServlet</servlet-class>
      <init-param>
         <param-name>foo</param-name>
         <param-value>bar</param-value>
      </init-param>
      <run-as>
         <description>Security role for anonymous access</description>
         <role-name>tomcat</role-name>
      </run-as>
    </servlet>
    <servlet-mapping>
      <servlet-name>snoop</servlet-name>
      <url-pattern>/snoop</url-pattern>
    </servlet-mapping>
    元素说明
     <servlet></servlet> 用来声明一个servlet的数据，主要有以下子元素：
     <servlet-name></servlet-name> 指定servlet的名称
     <servlet-class></servlet-class> 指定servlet的类名称
     <jsp-file></jsp-file> 指定web站台中的某个JSP网页的完整路径
     <init-param></init-param> 用来定义参数，可有多个init-param。在servlet类中通过getInitParamenter(String name)方法访问初始化参数
     <load-on-startup></load-on-startup>指定当Web应用启动时，装载Servlet的次序。
                                 当值为正数或零时：Servlet容器先加载数值小的servlet，再依次加载其他数值大的servlet.
                                 当值为负或未定义：Servlet容器将在Web客户首次访问这个servlet时加载它
     <servlet-mapping></servlet-mapping> 用来定义servlet所对应的URL，包含两个子元素
       <servlet-name></servlet-name> 指定servlet的名称
       <url-pattern></url-pattern> 指定servlet所对应的URL

### 会话超时配置（单位为分钟）
    <session-config>
      <session-timeout>120</session-timeout>
    </session-config>

### MIME类型配置
    <mime-mapping>
      <extension>htm</extension>
      <mime-type>text/html</mime-type>
    </mime-mapping>

### 指定欢迎文件页配置
    <welcome-file-list>
      <welcome-file>index.jsp</welcome-file>
      <welcome-file>index.html</welcome-file
      <welcome-file>index.htm</welcome-file>
    </welcome-file-list>

### 配置错误页面
    一、 通过错误码来配置error-page
       <error-page>
          <error-code>404</error-code>
          <location>/NotFound.jsp</location>
       </error-page>
    上面配置了当系统发生404错误时，跳转到错误处理页面NotFound.jsp。
    二、通过异常的类型配置error-page
       <error-page>
           <exception-type>java.lang.NullException</exception-type>
           <location>/error.jsp</location>
       </error-page>
    上面配置了当系统发生java.lang.NullException（即空指针异常）时，跳转到错误处理页面error.jsp

### TLD配置
    <taglib>
       <taglib-uri>http://jakarta.apache.org/tomcat/debug-taglib</taglib-uri>
       <taglib-location>/WEB-INF/jsp/debug-taglib.tld</taglib-location>
    </taglib>
    如果MyEclipse一直在报错,应该把<taglib> 放到 <jsp-config>中
    <jsp-config>
      <taglib>
          <taglib-uri>http://jakarta.apache.org/tomcat/debug-taglib</taglib-uri>
          <taglib-location>/WEB-INF/pager-taglib.tld</taglib-location>
      </taglib>
    </jsp-config>

### 资源管理对象配置
    <resource-env-ref>
       <resource-env-ref-name>jms/StockQueue</resource-env-ref-name>
    </resource-env-ref>

### 资源工厂配置
    <resource-ref>
       <res-ref-name>mail/Session</res-ref-name>
       <res-type>javax.mail.Session</res-type>
       <res-auth>Container</res-auth>
    </resource-ref>
    配置数据库连接池就可在此配置：
    <resource-ref>
       <description>JNDI JDBC DataSource of shop</description>
       <res-ref-name>jdbc/sample_db</res-ref-name>
       <res-type>javax.sql.DataSource</res-type>
       <res-auth>Container</res-auth>
    </resource-ref>

### 安全限制配置
    <security-constraint>
      <display-name>Example Security Constraint</display-name>
      <web-resource-collection>
         <web-resource-name>Protected Area</web-resource-name>
         <url-pattern>/jsp/security/protected/*</url-pattern>
         <http-method>DELETE</http-method>
         <http-method>GET</http-method>
         <http-method>POST</http-method>
         <http-method>PUT</http-method>
      </web-resource-collection>
      <auth-constraint>
        <role-name>tomcat</role-name>
        <role-name>role1</role-name>
      </auth-constraint>
    </security-constraint>

### 登陆验证配置
    <login-config>
     <auth-method>FORM</auth-method>
     <realm-name>Example-Based Authentiation Area</realm-name>
     <form-login-config>
        <form-login-page>/jsp/security/protected/login.jsp</form-login-page>
        <form-error-page>/jsp/security/protected/error.jsp</form-error-page>
     </form-login-config>
    </login-config>

### 安全角色：security-role元素给出安全角色的一个列表，这些角色将出现在servlet元素内的security-role-ref元素的role-name子元素中。
    分别地声明角色可使高级IDE处理安全信息更为容易。
    <security-role>
         <role-name>tomcat</role-name>
    </security-role>

### Web环境参数：env-entry元素声明Web应用的环境项
    <env-entry>
         <env-entry-name>minExemptions</env-entry-name>
         <env-entry-value>1</env-entry-value>
         <env-entry-type>java.lang.Integer</env-entry-type>
    </env-entry>

### EJB 声明
    <ejb-ref>
         <description>Example EJB reference</decription>
         <ejb-ref-name>ejb/Account</ejb-ref-name>
         <ejb-ref-type>Entity</ejb-ref-type>
         <home>com.mycompany.mypackage.AccountHome</home>
         <remote>com.mycompany.mypackage.Account</remote>
    </ejb-ref>

### 本地EJB声明
    <ejb-local-ref>
         <description>Example Loacal EJB reference</decription>
         <ejb-ref-name>ejb/ProcessOrder</ejb-ref-name>
         <ejb-ref-type>Session</ejb-ref-type>
         <local-home>com.mycompany.mypackage.ProcessOrderHome</local-home>
         <local>com.mycompany.mypackage.ProcessOrder</local>
    </ejb-local-ref>

### 配置DWR
    <servlet>
          <servlet-name>dwr-invoker</servlet-name>
          <servlet-class>uk.ltd.getahead.dwr.DWRServlet</servlet-class>
    </servlet>
    <servlet-mapping>
          <servlet-name>dwr-invoker</servlet-name>
          <url-pattern>/dwr/*</url-pattern>
    </servlet-mapping>

### 配置Struts
    <display-name>Struts Blank Application</display-name>
    <servlet>
        <servlet-name>action</servlet-name>
        <servlet-class>
            org.apache.struts.action.ActionServlet
        </servlet-class>
        <init-param>
            <param-name>detail</param-name>
            <param-value>2</param-value>
        </init-param>
        <init-param>
            <param-name>debug</param-name>
            <param-value>2</param-value>
        </init-param>
        <init-param>
            <param-name>config</param-name>
            <param-value>/WEB-INF/struts-config.xml</param-value>
        </init-param>
        <init-param>
            <param-name>application</param-name>
            <param-value>ApplicationResources</param-value>
        </init-param>
        <load-on-startup>2</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>action</servlet-name>
        <url-pattern>*.do</url-pattern>
    </servlet-mapping>
    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>

    <!-- Struts Tag Library Descriptors -->
    <taglib>
        <taglib-uri>struts-bean</taglib-uri>
        <taglib-location>/WEB-INF/tld/struts-bean.tld</taglib-location>
    </taglib>
    <taglib>
        <taglib-uri>struts-html</taglib-uri>
        <taglib-location>/WEB-INF/tld/struts-html.tld</taglib-location>
    </taglib>
    <taglib>
    <taglib-uri>struts-nested</taglib-uri>
    <taglib-location>/WEB-INF/tld/struts-nested.tld</taglib-location>
    </taglib>
    <taglib>
        <taglib-uri>struts-logic</taglib-uri>
        <taglib-location>/WEB-INF/tld/struts-logic.tld</taglib-location>
    </taglib>
    <taglib>
        <taglib-uri>struts-tiles</taglib-uri>
        <taglib-location>/WEB-INF/tld/struts-tiles.tld</taglib-location>
    </taglib>

### 配置Spring（基本上都是在Struts中配置的）
    <!-- 指定spring配置文件位置 -->
    <context-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>
       <!--加载多个spring配置文件 -->
        /WEB-INF/applicationContext.xml, /WEB-INF/action-servlet.xml
      </param-value>
    </context-param>
    <!-- 定义SPRING监听器，加载spring -->
    <listener>
         <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <listener>
         <listener-class>
           org.springframework.web.context.request.RequestContextListener
         </listener-class>
    </listener


# Servlet
	0、servlet生命周期： tomcat等容器将请求分解成 HttpServletRequest/HttpServletResponse --> 调用servlet.init()
		-->servlet.service() 调用doGet/doPost处理 --> servlet.destroy() 一般只需重写doGet/doPost即可
	1、Servlet 是一些遵从Java Servlet API的Java类，这些Java类可以响应web请求。
	2、 Servlet必须部署在Java servlet容器才能使用。虽然很多开发者都使用Java Server Pages（JSP）和Java Server   
		Faces（JSF）等Servlet框架，但是这些技术都要在幕后通过Servlet容器把页面编译为Java Servlet。

## servlet Filter  
	1) 对被访问的URL进行预处理，如记录日志、验证等公共逻辑
	2) 过滤器链：若存在多个匹配给定URL模式的个过滤器，它们就会根据web.xml里的配置顺序被调用。
	3) 包含相同URL模式的过滤器（filter）会在Servlet调用前被调用
	4) 过滤器需实现javax.servlet.Filter, init()/destroy()被容器调用。 doFilter()实现处理逻辑，
		 调用chain.doFilter(request, response)往下执行
		public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
		{
			System.out.println(request.getProtocol());
			chain.doFilter(request, response);
		}
	5) WEB-INF/web.xml中配置servlet ， 详见示例1

### 示例1  
	//1) 必须继承HttpServlet，要么继承GenericServlet的普通Servle， 要么HttpServlet 的HTTP Servlet。
	//2) 重写doGet() 和 doPost() 方法,如果你向这个servlet发送一个HTTP GET请求，doGet()方法就会被调用。其它方法一般不需重写。
	//3) 获取参数: String value1 = req.getParameter("param1");
	//4) 为了发送内容给客户端，从HttpServletResponse获取PrintWriter,任何写到这个对象的内容都会被写进outputstream里发到client。
	public class FirstServlet extends HttpServlet
	{
		private static final long serialVersionUID = 1L;
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
		{
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			try
			{
				// Write some content
				out.println("<html>");
				out.println("<head>");
				out.println("<title>MyFirstServlet</title>");
				out.println("</head>");
				out.println("<body>");
				out.println("<h2>Servlet MyFirstServlet at " + request.getContextPath() + "</h2>");
				out.println("</body>");
				out.println("</html>");
			}
			finally
			{
				out.close();
			}
		}
	}

	//WEB-INF/web.xml中配置servlet
	<?xml version="1.0" encoding="UTF-8"?>
	<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
		xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" id="WebApp_ID" version="3.1">
	   <servlet>
		<servlet-name>MyFirstServlet</servlet-name>
		<servlet-class>com.servlet.test.FirstServlet</servlet-class>
	  </servlet>
	  <servlet-mapping>
		<servlet-name>MyFirstServlet</servlet-name>
		<url-pattern>/MyFirstServlet</url-pattern>
	  </servlet-mapping>
	  
	  <filter>
		<filter-name>LoggingFilter</filter-name>
			<filter-class>com.servlet.test.FirstFilter</filter-class>
		</filter>
	  <filter-mapping>
		<filter-name>LoggingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	  </filter-mapping>
	</web-app>

## Servlet下载文件  
	//Servlet提供一个相应类型(Content-Disposition)，并将文件流写入输出流
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
	{
	final int BYTES = 1024;
	int length = 0;
	ServletOutputStream outStream = response.getOutputStream();
	ServletContext context = getServletConfig().getServletContext();

	response.setContentType("text/plain");
	String fileToDownload = "resources/files/dtfile.xds";
	response.setHeader("Content-Disposition", "attachment; filename=" + fileToDownload.split("/")[2]);

	InputStream in = context.getResourceAsStream("/" + fileToDownload);
	byte[] bbuf = new byte[BYTES];
	while ((in != null) && ((length = in.read(bbuf)) != -1))
	{
		outStream.write(bbuf, 0, length);
	}
	outStream.flush();
	outStream.close();
	}

## 上传文件
	//参考地址: http://www.jianshu.com/p/46e6e03a0d53
	//页面,index.html
	<input id="upload" type="button" value="上传" />
	<script>
		$("#upload").click(function(){
			debugger;
			var formData = new FormData();
			formData.append('file', $('#file')[0].files[0]);
			$.ajax({
				url : '/servletexample/upload',
				type : 'POST',
				cache : false,
				data : formData,
				processData : false,
				contentType : false
			}).done(function(res) {
				alert("上传成功");
			}).fail(function(res) {
			});
		});
	</script>
	
	//后台， Part表示一个上传文件，part.write()会将上传的文件写入到临时目录apache-tomcat-8.0.36\work\Catalina\localhost\servletexample
	//上传的文件需要自己复制保存到指定位置，临时文件会被清空
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		Collection<Part> parts = request.getParts();
		System.out.println("parts num:" + parts.size());
		Iterator<Part> temp = parts.iterator();
		while (temp.hasNext())
		{
			Part part = temp.next();
			System.out.println(part.getSubmittedFileName());
			part.write(part.getSubmittedFileName());
		}
	}

	//web.xml , multipart-config必须配置在上传的servlet中
	<servlet>
		<servlet-name>uploadfileServlet</servlet-name>
		<servlet-class>com.servlet.test.UploadFileServlet</servlet-class>
		<!-- 文件上传的配置 -->
		<multipart-config>
			<max-file-size>20848820</max-file-size>
			<max-request-size>418018841</max-request-size>
			<file-size-threshold>1048576</file-size-threshold>
		</multipart-config>
	</servlet>
	<servlet-mapping>
		<servlet-name>uploadfileServlet</servlet-name>
		<url-pattern>/upload</url-pattern>
	</servlet-mapping>

## 其它
	//forward转发请求到另一个Servlet
	RequestDispatcher rd = servletContext.getRequestDispatcher("/NextServlet");
	rd.forward(request, response);

	//重定向请求到另一个Servlet
	httpServletResponse.sendRedirect("/anotherURL");

	//Servlet读写
	CookieCookie cookie = new Cookie("sessionId","123456789");
	cookie.setHttpOnly(true);
	cookie.setMaxAge(-30);
	response.addCookie(cookie);	//写cookie
	Cookie[] cookies = request.getCookies();  //读cookie

## session  
	//如果没有则创建session, 需要在向客户端发送任何文档内容之前调用 
	HttpSession session = request.getSession();
	setAttribute(String name, Object value) //使用指定的名称绑定一个对象到该 session 会话
	getAttribute(String name)	//返回在该 session 会话中具有指定名称的对象，如果没有指定名称的对象，则返回 null
	removeAttribute(String name)	//从该 session 会话移除指定名称的对象。
	getAttributeNames()	//返回 String 对象的枚举，String 对象包含所有绑定到该 session 会话的对象的名称。
	long getCreationTime()	//该 session 会话被创建的时间
	String getId()	//返回一个包含分配给该 session 会话的唯一标识符的字符串。
	long getLastAccessedTime()	//最后一次发送与该 session 会话相关的请求的时间
	void invalidate()	//指示该 session 会话无效，并解除绑定到它上面的任何对象。
	boolean isNew()	//
	int getMaxInactiveInterval()	//返回Servlet容器在客户端访问时保持session会话打开的最大时间间隔，单位分钟。
	   //在web.xml中配置session超时时间, 将覆盖 Tomcat 中默认的 30 分钟超时时间。
	  <session-config>
		<session-timeout>15</session-timeout>
	  </session-config>


# 其它
## Tomcat
### 配置  
	1、端口号: conf/server.xml--> <Connectors -->
	2、根目录ROOT，将代码部署在根目录访问时不用加项目名称，即127.0.0.1:8080默认打开的是webapps/ROOT中页面

### eclipse中发布项目  
	1、tomcat/bin/startup.bat启动可以打开主页127:0.0.1:8080, 
		eclipse中直接添加启动tomcat则不能打开主页，因为要配置tomcat的发布目录
	2、window-->showview中添加server-->add a server
	   双击server中tomcat-->配置页面-->server Locations选择中间一个(use Tomcat installation),deploy path改成webapps, 超时时间500s
	   (如果无法修改，则删除tomcat所有项目，右键clean后打开)
	3、新建web项目(Dynamic web project),其中会有src源码目录和资源目录,勾选新建web.xml, tomcat-->add and remove添加即可
	4、start server,即可发现项目已部署到 G:\program-my\apache-tomcat-8.0.36\webapps\tt 中, console日志也会有项目发布目录
