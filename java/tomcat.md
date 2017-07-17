# 源码

## 生成sessionId的规则
	ManagerBase.java --> generateSessionId -->  sessionIdGenerator.generateSessionId() --> StandardSessionIdGenerator
		--> generateSessionId() -->
