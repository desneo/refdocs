
# kafka配置
## 配置文件
	#当前机器在集群中的唯一标识，和zookeeper的myid性质一样
	broker.id=0  
	#当前kafka对外提供服务的端口默认是9092
	port=19092 
	#这个参数默认是关闭的，在0.8.1有个bug，DNS解析问题，失败率的问题。
	host.name=192.168.7.100 
	#这个是borker进行网络处理的线程数
	num.network.threads=3 
	#这个是borker进行I/O处理的线程数
	num.io.threads=8 
	#消息存放的目录，这个目录可以配置为“，”逗号分割的表达式，上面的num.io.threads要大于这个目录的
	#个数这个目录，如果配置多个目录，新创建的topic他把消息持久化的地方是，当前以逗号分割的目录中，那个分区数最少就放那一个
	log.dirs=/opt/kafka/kafkalogs/ 
	#发送缓冲区buffer大小，数据不是一下子就发送的，先回存储到缓冲区了到达一定的大小后在发送，能提高性能
	socket.send.buffer.bytes=102400 
	#kafka接收缓冲区大小，当数据到达一定大小后在序列化到磁盘
	socket.receive.buffer.bytes=102400 
	#这个参数是向kafka请求消息或者向kafka发送消息的请请求的最大数，这个值不能超过java的堆栈大小
	socket.request.max.bytes=104857600 
	#默认的分区数，一个topic默认1个分区数
	num.partitions=1 
	#默认消息的最大持久化时间，168小时，7天
	log.retention.hours=168 
	#消息保存的最大值5M
	message.max.byte=5242880  
	#kafka保存消息的副本数，如果一个副本失效了，另一个还可以继续提供服务
	default.replication.factor=2  
	#取消息的最大直接数
	replica.fetch.max.bytes=5242880  
	#这个参数是：因为kafka的消息是以追加的形式落地到文件，当超过这个值的时候，kafka会新起一个文件
	log.segment.bytes=1073741824 
	#每隔300000毫秒去检查上面配置的log失效时间（log.retention.hours=168 ），到目录查看是否有过期的消息如果有，删除
	log.retention.check.interval.ms=300000 
	#是否启用log压缩，一般不用启用，启用的话可以提高性能
	log.cleaner.enable=false 
	#设置zookeeper的连接端口
	zookeeper.connect=192.168.7.100:12181,192.168.7.101:12181,192.168.7.107:1218 
