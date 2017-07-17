# 分布式锁--zookeeper
	1). client调用create()方法创建“/root/lock_”节点，注意节点类型是EPHEMERAL_SEQUENTIAL。
	2). client调用getChildren("/root/lock_",false)来获取所有已经创建的子节点，这里并不注册任何Watcher。
	3). 客户端获取到所有子节点Path后，如果发现自己在步骤1中创建的节点是所有节点中最小的，那么就认为这个客户端获得了锁。
	4). 如果在步骤3中，发现不是最小的，那么找到比自己小的那个节点，然后对其调用exist()方法,并注册事件监听移除事件。
	5). 之后一旦这个被关注的节点移除，客户端会收到相应的通知，这个时候客户端需要再次调用getChildren("/root/lock_",false)来确保自己是最小的节点，然后进入步骤3.

# 分布式session--redis
	
