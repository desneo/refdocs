# redis集群
	1). Redis 集群通过分区来提供一定程度的可用性,部分节点宕机时:
		自动分割数据到不同的节点上。
		整个集群的部分节点失败或者不可达的情况下能够继续处理命令
	2). 集群使用了主从复制模型,每个节点都会有N-1个复制品.

## 启动集群模式的redis实例
	集群模式需要通过配置开启，最小集如下：
		port 7000
		#开始
		cluster-enabled yes		
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes

## redis集群哈希槽-slot
	Redis 集群没有使用一致性hash, 而是引入了 哈希槽的概念.
	Redis 集群有16384个哈希槽,每个key通过CRC16校验后对16384取模来决定放置哪个槽.集群的每个节点负责一部分hash槽,举个例子,比如当前集群有3个节点,那么:
		节点 A 包含 0 到 5500号哈希槽.
		节点 B 包含5501 到 11000 号哈希槽.
		节点 C 包含11001 到 16384号哈希槽.
	这种结构很容易添加或者删除节点. 比如如果我想新添加个节点D, 我需要从节点 A, B, C中得部分槽到D上. 如果我像移除节点A,需要将A中得槽移到B和C节点上,然后将没有任何槽的A节点从集群中移除即可
		
## redis集群的主从复制模型
		为了使在部分节点失败或者大部分节点无法通信的情况下集群仍然可用，所以集群使用了主从复制模型,每个节点都会有N-1个复制品.
		如具有A，B，C三个节点的集群,在没有复制模型的情况下,如果节点B失败了，那么整个集群就会以为缺少5501-11000这个范围的槽而不可用.
		然而每个节点添加一个从节点A1，B1，C1,那么整个集群便有三个master节点和三个slave节点组成，这样在节点B失败后，集群便会选举B1为
	新的主节点继续服务，整个集群便不会因为槽找不到而不可用了不过当B和B1 都失败后，集群是不可用的
	
## 搭建集群-redis-trib.rb
	1). 使用源码目录下redis-trib.rb , ruby编写，先安装
		aptitude 	install ruby
					install rubygems
		gem install redis 
	2). 修改上一步操作中的集群配置，端口不同即可
	3). ./redis-server redis.conf 启动六个redis集群实例， ps -ef | grep redis检测是否启动成功
	4). ./redis-trib.rb create --replicas 1 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006
		创建一个新的集群, 选项–replicas 1 表示我们希望为集群中的每个主节点创建一个从节点
	5). 创建成功会有提示，

## 动态增加节点
### [集群动态添加主从节点](http://blog.csdn.net/woshimike/article/details/56479773)	
	1). ./redis-trib.rb  add-node    new_host:new_port existing_host:existing_port		//将新redis节点关联到任一个集群redis节点上
	2). ./redis-trib.rb reshard 192.168.142.128:7007	//为新加入的节点分配空间槽, 
			//输入分配节点数量(数量)--输入新节点id--从所有空间分配(all)--开始分配
	3). 挂载从节点(先添加到集群)
		./redis-trib.rb  add-node    192.168.142.128：7008 192.168.142.128：7002	
		cluster replicate 主节点id	//登录从节点执行命令，添加自身到主节点下

### 删除节点
	//从节点没有分配槽 可直接删除
	./redis-trib.rb del-node 127.0.0.1:7008 65ee465423c925326a5137668541151b4c37d2d9 	//参数ip:port + id
	
	//主节点先移除，再删除
	./redis-trib.rb reshard 127.0.0.1:7007	//需要移除多少个节点，移动到哪个节点，从哪个节点移除
	./redis-trib.rb del-node127.0.0.1:7007 61f786c40bcc170006a440abd7dc773e6dd15a19
		
## Redis cluster命令
	先连接上任意结点

	//集群(cluster)  
	cluster info       打印集群的信息
	cluster nodes   列出集群当前已知的所有节点(node)，以及这些节点的相关信息   
	
	//节点(node)  
	cluster meet <ip> <port>       将ip和port所指定的节点添加到集群当中，让它成为集群的一份子  
	cluster forget <node_id>        从集群中移除node_id指定的节点
	cluster replicate <node_id>   将当前节点设置为node_id指定的节点的从节点
	cluster saveconfig                   将节点的配置文件保存到硬盘里面
	cluster slaves <node_id>       列出该slave节点的master节点
	cluster set-config-epoch        强制设置configEpoch 
	
	//槽(slot)  
	cluster addslots <slot> [slot ...]          将一个或多个槽(slot)指派(assign)给当前节点
	cluster delslots <slot> [slot ...]			移除一个或多个槽对当前节点的指派 
	cluster flushslots						移除指派给当前节点的所有槽，让当前节点变成一个没有指派任何槽的节点 
	cluster setslot <slot> node <node_id>            
	
	//将槽slot指派给node_id指定的节点，如果槽已经指派给另一个节点，那么先让另一个节点删除该槽，然后再进行指派 
	cluster setslot <slot> migrating <node_id>   将本节点的槽slot迁移到node_id指定的节点中  
	cluster setslot <slot> importing <node_id>   从node_id 指定的节点中导入槽slot到本节点 
	cluster setslot <slot> stable				取消对槽slot的导入(import)或者迁移(migrate) 
	
	//键(key)  
	cluster keyslot <key>					计算键key应该被放置在哪个槽上  
	cluster countkeysinslot <slot>			返回槽slot目前包含的键值对数量 
	cluster getkeysinslot <slot> <count>	返回count个slot槽中的键
	
	//其它
	cluster myid       返回节点的ID
	cluster slots       返回节点负责的slot
	cluster reset      重置集群，慎用		
		
# redis管理
## redis命令
	//连接redis
	redis-cli  //默认本机，6739端口
	redis-cli -h 127.0.0.1 -p 16380 -a Huawei_123	//指定ip、端口、密码连接redis
		
	shutdown	//通过客户端关闭redis
	
	info		//查看redis信息和状态，包括server、client、cluster等信息
	
	Expire KEY_NAME TIME_IN_SECONDS		//设置失效时间，单位秒
	Expireat KEY_NAME TIME_IN_UNIX_TIMESTAMP	//设置key失效时间，单位毫秒
	TTL keyName		//key不存在时返回-2 。key存在但没有设置剩余生存时间时，返回 -1 。 否则，以毫秒为单位，返回 key 的剩余生存时间

## redis配置文件
	bind 192.168.1.100 10.0.0.1		//允许连接的客户端ip,可多个
	requirepass Huawei_123		//客户端访问时需要此密码
	port 16380			//redis端口
	daemonize no		//是否生成守护进程
	
	//集群配置
	//开启集群模式
	cluster-enabled yes		
	//保存节点配置文件的路径，默认nodes.conf.无须人为修改，由 Redis 集群在启动时创建， 并在有需要时自动进行更新
	cluster-config-file nodes.conf
	//节点能够失联的最大时间，超过这个时间，该节点就会被认为故障。如果主节点超过这个时间还是不可达，
	//则用它的从节点将启动故障迁移，升级成主节点
	cluster-node-timeout 5000
	
# 其它
	1.默认端口 6379
	2.

## 优势
	0). 内存数据库，磁盘用作持久化。
	1). 速度快，每秒能执行约11万集合，每秒约81000+条记录.
	2). 支持丰富的数据类型：字符串、列表、集合、有序集合、散列数据类型.
	3). 原子性：所有Redis操作是原子的，保证了同时访问的Redis服务器将获得更新后的值。
	4). 多功能实用工具：Redis是一个多实用的工具，可以在多个用例如缓存，消息，队列使用(Redis原生支持发布/订阅)，任何短暂的数据，应用程序，如Web应用程序会话，网页命中计数等。	

## java操作--jedis
	//单机版
	Jedis jedis = new Jedis ("192.168.0.1", 22400); 
	
	//集群, ostAndPort为集群中任意可以联通的成员。JedisCluster将通过这个成员获取整个集群的信息
	HostAndPort host1 = new HostAndPort("192.168.0.1", 22400);  
	HashSet<HostAndPort> set = new HashSet<HostAndPort>();
	set.add(host1);
	JedisCluster cluster = new JedisCluster(set); 
	String result = cluster.set("key111", "value111"); 
	
	//pom.xml
	<dependency>
		<groupId>redis.clients</groupId>
		<artifactId>jedis</artifactId>
		<version>2.9.0</version>
	</dependency>
