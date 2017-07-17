# 源码

## 生成sessionId的规则
	ManagerBase.java --> generateSessionId -->  sessionIdGenerator.generateSessionId() 
		while (sessions.containsKey(result))   //保证单机session不会重复
	--> StandardSessionIdGenerator --> generateSessionId() 
		getRandomBytes(random)+"."+jvmRoute	//jvmRoute保证多节点时不重复，在负载匀衡中使用的标识符，必须唯一
					
