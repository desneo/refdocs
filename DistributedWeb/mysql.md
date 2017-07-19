

# mysql性能升级
	分库	//每张大表对应一个库
	分表	//按用户id%256将用户信息分布到256张表中
	集群	//master（双master备份）+多个slave， master负责写，salve负责读，读写分离
			//通过master的binary log将master数据复制到slave
