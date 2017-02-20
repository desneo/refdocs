# Oracle
## 基础知识
	sqlplus /nolog 
	conn / as sysdba

## 管理SQL
	//用户下所有表
	select t.table_name,t.* from user_tables t;
	//查看表结构(表字段)
	select * from user_tab_columns where table_name  in ('DE_LICENSE_TPS');
	

### 导入/导出数据
	//导出所有表
	exp besfront/Huawei123@BESDB file=/home/oracle/zhou/besfront.dump owner=besfront;
	//导出指定表
	exp besfront/Huawei123@BESDB  tables=DE_LICENSE_TPS file=/home/oracle/zhou/besfront.dump ;

	//DESTROY--如果表中已有数据，先清空，默认值N
	imp besuih/Huawei_123@BESDB fromuser=besfront touser=besuih file=/home/oracle/zhou/besfront.dump DESTROY=Y

### 用户相关
	//修改用户密码:
	alter user bespub identified by Huawei_123;

	新建用户:
	create user besfront identified by Huawei_123;
	//赋予连接权限  (权限分 connect/resource/dba)
	grant connect to besfront;
	//赋予resouce权限，可创建表
	grant resource to besfront;
	//增加该用户表空间"USERS"中得配额(否则imp失败)
	ALTER USER besfront QUOTA UNLIMITED ON "USERS";

	//删除用户
	drop user test cascade;
