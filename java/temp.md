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
