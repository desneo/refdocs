# 遗留问题
	1、 zookeeper集群如何保证请求的均匀分布?
	2、

# 基本概念

## ZK节点类型
	CreateMode.PERSISTENT		//持久节点，该节点客户端断开后不会删除
	CreateMode.EPHENMERAL		//临时节点，这种目录节点会根据当前已近存在的节点数自动加 1，然后返回给客户端已经成功创建的目录节点名；
	CreateMode.PERSISTENT_SEQUENTIAL  //持久序列节点，断开后不删除，创建时自动在节点名后加一个数字后缀
	CreateMode.EPHENMERAL_SEQUENTIAL  //临时序列节点，断开后删除，创建时自动在节点名后加一个数字后缀 -- 实现分布式锁

## Watcher状态码
	EventType.NodeDeleted		//删除节点
	EventType.NodeChildrenChanged		//修改节点的子节点
	EventType.NodeCreated		//创建节点
	EventType.NodeDataChanged		//修改节点数据 

	
## [leader、follower和 observer](http://blog.sina.com.cn/s/blog_466678e80101hy78.html)
	//Leader
	1).接收客户端的request请求
	2).将会修改同步数据的request请求 转化为proposal，并保存.
	3).向所有的follower发送proposal。
	4).接收follower的ack。
	5).统计收到的ack，如果某一个proposal的ack超过了半数，那么向所有follower发送commit 信令，并向所有observer发送inform信令，执行这个proposal的动作。
	6).leader自己执行已经被commit的proposal所对应的操作，并回复结果
	
	//Follower
	Follower：主要负责批准或否决leader提出的proposal。Follower的主要逻辑处理如下：
	1). 发现leader。
	2). 建立与leader的连接。
	3). 向leader注册。(leader activation)
	4). 与leader进行同步。
	5). 无限循环
		---读取从leader处接收到的信令。
		---处理从leader处接收到的信令。
		A). 如果是PROPOSAL信令（写请求），将此信令投递到FollowerZooKeeperServer的synProcessor。主要作用是回复leader一个ack。
		B). 如果是COMMIT信令，将此信令投递到FollowerZooKeeperServer的commitProcessor。最终执行FollowerZooKeeperServer的commit函数。
		C). 如果是SYNC信令，将此信令投递到FollowerZooKeeperServer的commitProcessor。commitProcessor直接将此信令转发给FinalRequestProcessor，将sync信令带的内容写入持久层
	 
	//Observer 只学习不参与选举，是为了保证提案选举的性能不会随着zookeeper集群规模扩大而降低（参与投票的节点越多，每一次投票花费的事件就越多）
	observer：学习已经被commit的proposal的结果，然后执行相应的操作。Observer主要处理逻辑：
	1). 发现leader。
	2). 连接到leader上，建立TCP连接。
	3). 与leader进行同步，同步leader上已经被commit的proposal。
	4). 无限循环，读取接收到得信令，处理信令。
		a). 如果是syn信令，调用ObserverZooKeeperServer的syn函数，投递到commitProcessor中。
		b). 如果是info信令，同样调用ObserverZooKeeperServer的commit函数，投递到commitProcessor中

# 创建分布式锁
	1). client调用create()方法创建“/root/lock_”节点，注意节点类型是EPHEMERAL_SEQUENTIAL。
	2). client调用getChildren("/root/lock_",false)来获取所有已经创建的子节点，这里并不注册任何Watcher。
	3). 客户端获取到所有子节点Path后，如果发现自己在步骤1中创建的节点是所有节点中最小的，那么就认为这个客户端获得了锁。
	4). 如果在步骤3中，发现不是最小的，那么找到比自己小的那个节点，然后对其调用exist()方法,并注册事件监听移除事件。
	5). 之后一旦这个被关注的节点移除，客户端会收到相应的通知，这个时候客户端需要再次调用getChildren("/root/lock_",false)来确保自己是最小的节点，然后进入步骤3。	
		
# 其它

## ZK命令
	//启动
	zkServer.sh start (stop/restart) / zkServer.cmd
	
	//查看状态
	zkServer.sh status

	//zkCli.sh -server 127.0.0.1:2181 连接ZK
		ls /	//查看节点结构
		create /javaer www.javaer.com.cn	//创建节点
		get /javae		//获取节点数据
		set /javaer sunwenqi	//设置节点数据

## 集群配置
	1). 复制几份zk文件， 修改cfg的集群配置项即可
	2). 启动时报连接错误，待所有节点启动后即正常

## 容灾扩容
	容灾： 布置3机房
	扩容： 逐台重启
	
## 连接封装框架
	a). Curator 
	b). zkClient
	
## zk配置文件
	#The number of milliseconds of each tick, 最小时间单位，很多运行时的时间
	#间隔都是使用tickTime的倍数来表示的，例如initLimit=10就是tickTime的十倍等于2W毫秒
	tickTime=2000
	
	# The number of ticks that can pass between, sending a request and getting an acknowledgement
	# 心跳最大延迟时间，如果leader在规定的时间内无法获取到follow的心跳检测响应,则认为节点已脱离
	syncLimit=5
	
	# the directory where the snapshot is stored. do not use /tmp for storage, /tmp here is just. example sakes.
	# 用于存放内存数据库快照的文件夹，同时用于集群的myid文件也存在这个文件夹里
	dataDir=G:\\program-my\\zookeeper-3.4.9\\data
	
	# the port at which the clients will connect,ZK端口
	clientPort=2181

	# the maximum number of client connections. increase this if you need to handle more clients
	# 允许连接的客户端数目，0-不限制,通过 IP 来区分不同的客户端
	maxClientCnxns=60
	
	#将管理机器把事务日志写入到“ dataLogDir ”所指定的目录，而不是“ dataDir ”所指定的目录。避免日志和快照之间的竞争
	#dataLogDir=/root/Hadoop-0.20.2/zookeeper-3.3.1/log/data_log
	
	# The number of snapshots to retain in dataDir
	#用于配置zookeeper在自动清理的时候需要保留的快照数据文件数量和对应的事务日志文件，最小值时三，如果比3小，会自动调整为3
	#autopurge.snapRetainCount=3
	
	# Purge task interval in hours. Set to "0" to disable auto purge feature
	#配套snapRetainCount使用，用于配置zk进行历史文件自动清理的频率，如果参数配置为0或者小于零，就表示不开启定时清理功能，默认不开启
	#autopurge.purgeInterval=1

	
	##集群配置
	# The number of ticks that the initial, synchronization phase can take
	# follow服务器在启动的过程中会与leader服务器建立链接并完成对数据的同步，leader服务器允许follow在initLimit时间内完成，默认时10.集群量增大时
	#同步时间变长，有必要适当的调大这个参数, 当超过设置倍数的 tickTime 时间，则连接失败
	initLimit=10
	
	#server.A=B：C：D：其中 A 数字，表示是第几号服务器. dataDir目录下必有一个myid文件，里面只存储A的值,ZK启动时读取此文件，与下面列表比较判断是哪个server
	# B 是服务器 ip ；C表示与 Leader 服务器交换信息的端口；D 表示的是进行选举时的通信端口。
	server.1=127.0.0.1:2888:3888
	server.2=127.0.0.1:2889:3889
	server.3=127.0.0.1:2890:3890
	
	# 配置成observer模式
	peerType=observer
	# 注意观察者角色的末尾，需要拼接上observer 
	server.4=10.2.143.38:2886:3886:observer 
	
