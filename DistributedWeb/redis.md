
# 待梳理
	1. redis订阅
	2. redis事务
	3. redis备份
	4. 还原redis数据
	5. redis安全-配置密码
	

# 数据类型-前B都是阻塞版本
	exists foo		//键是否存在，存在返回1， 否则0
	del foo			//删除键
	del foo bar		//一次删除多个键,空格分隔
	type foo		//节点的数据类型，string-hash-list-set-zset
	keys *		//列出所有的键，
	
## 字符串
	SET name "yiibai" ; 	
	GET name
	mget xx yy	//获取多个值
	mset name "joan" age 9 float 33.33	//设置多个值
	incr key  		//如果是整型数字，自增1, 返回新增的值
	incrby key number 	//指定自增值，
	decr key		//自减
	decrby key number
	append key value 	//尾部追加，返回总长度值
	strlen key        //获取字符串值总长度，返回值就是长度，如果key不存在，则返回0
	bitcount key 	 //返回字符串类型键值中二进制值为1的个数。
	getbit foo 3	//获取key对应的字符串类型键值指定位置的二进制的值（0或1），索引从0开始,如超出也返回0
	setbit foo 6 0	//设置key对应的指定位置的二进制值的。返回值是该位置的旧值
	
	
## 哈希-散列 键值对的集合
	//存储对象， 例如现在要存储ID为1的文章，分别有title、author、time、content
	hlen key	//获取字段数量
	hmset post:1 title "the first post" author "JoJo" time 2016/08/25 content "this is my first post"
	hset key field value   		//例如hset post:2 title “second post”
	hdel key field [field ...]	//删除字段，一个或多个，返回值是被删除字段的个数。
	hget key field             	//例如hget post:2 title，获取id为2的post的title值
	hmset key field value [field value ...]  	//这个同上，批量存值
	hmget key field [field ...]                 //批量取值，取得列表
	hgetall key                  #取得key所对应的所有键值列表
	hexists key field	//是否存在键值，存在1，不存在返回0
	hsetnx key field value	//如果字段存在则不执行任何操作
	hincrby key field number	//字段自增
	hkeys key    #获取字段名	
	hvals key    #获取字段值
	
## 列表-链表实现
	//简单的字符串列表，排序为插入顺序，可实现栈和队列
	lpush tutoriallist redis
	rpush tutoriallist mongodb
	lpop key
	rpop key	
	lrange 	key 2 -1	//取子列表，不改变源, 负值从右往左数
	ltrim key start end	 //只保留指定范围的值
	llen key	//获取元素个数，不存在则返回0
	lrem key count value	//删除列表中前count个值为value的元素，返回实际删除的元素个数, count为负则从右边开始,0-删除所有
	lindex key index	获取指定所有的值
	lset key index value
	rpoplpush source destination	//先执行rpop再执行lpush。这个命令会先从source右边弹出一个元素插入到destination列表的左边，并返回这个元素的值
	linsert key before|after pivot value	//先从列表中查找值为pivot的元素，然后根据是before还是after在前或是后添加元素, linsert mylist before 0 1
	
## 无序集合-差/交/并集运算
	//无序，唯一
	sadd key member [member ...]	//增加元素，如果元素已存在，会忽略而不覆盖，返回成功加入的元素数量(忽略元素不算)
	srem key member [member ...]	//删除元素，如果元素存在才会删除成功，返回值是成功删除的元素的个数
	scard key	//数量
	smembers key	//获取所有元素
	sismember key member	//元素是否存在集合中
	srandmember key [count]	//随机获取
	spop key	//从集合中弹出一个元素
	
	
	sdiff key [key ...]		//差集
	sinter key [key ...]	//交集
	sunion key [key ...]	//并集
	sdiffstore destination key [key ...]	//结果存储到新key
	sinterstore destination key [key ...]
	sunionstore destination key [key ...]
	
## 有序集合-散列和skip list实现
	//在集合类型上，为每个元素都关联一个分数，有序实际上说的是分数有序，我们根据分数的范围获取集合及其他操作。集合的元素依然是不能够相同的，但是分数可以相同。
	ZADD key score member [score member ...]	//增加元素, 返回值是成功增加的元素的个数，如果member存在，则score会覆盖原有的分数。scor支持整数和浮点
	ZSCORE key member		//获取元素的分数
	ZRANGE key start stop [WITHSCORE]	//会按照元素分数的从小到大顺序返回索引从start到stop之间所有的元素（包含两端）。WITHSCORE代表是否加上分数
	ZREVRANGE key start stop [WITHSCORE] 	//按照分数从大到小给出顺序结果
	ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]		//获取指定分数范围的元素，min是最小值，max是最大值，
		//WITHSCORE还是和上面介绍的一样，LIMIT是为了指定偏移量及数量的，和sql的有点像。offset是偏移量，count是数量。同时这些min和max都是包含的，如果要想不包含，需要使用“(”符号。
	ZINCRBY scoreboard 2 peter		//增加一个元素的分数，返回值是更改后的分数
	ZCARD key	//获取集合中元素的值
	ZCOUNT key min max		//获得指定分数范围的元素个数
	ZREM key member [member ...]	//删除一个或多个元素,返回值是成功删除的元素的个数。
	ZREMRANGEBYRANK key start stop		//按照元素分数从小到大顺序删除指定范围内所有的元素（其实就是先排序，然后按照排好的序列的索引删除），并返回删除的元素的数量。
	ZRANK key member			//ZRANK命令按照元素分数的从小到大的顺序获得制定元素的排名
	ZREVRANK  key member		//与ZRANK相反

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

## [集群动态添加主从节点](http://blog.csdn.net/woshimike/article/details/56479773)	
	
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
	
	FLUSHDB		//删除当前数据库的数据
	FLUSHALL	//删除所有数据库中的所有数据
	

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

## linux下安装redis-源码
	a). C语言编写，编译依赖gcc和make
	b). wget http://download.redis.io/releases/redis-4.0.0.tar.gz
	c). tar -xvf *.gz; make
	d). 编译完成后，拷出src目录下的redis-server/redis-cli/redis.conf共3个文件即可
	
	
	
## [windows下安装](https://github.com/MicrosoftArchive/redis/releases)
	1.官方值linux，通过Microsoft Open Tech group支持windows 64.
	2.启动: redis-server.exe  redis.windows.conf   
	3.关闭： redis-cli.exe shutdown
	
