
## 执行多个shell命令
	1) 在每个命令之间用；（分号）隔开。
	2) 在每个命令之间用&&隔开。  表示前一个执行成功才会执行下一个
	3) 在每个命令之间用||隔开。  若前一个命令执行成功，就不会执行下一条了。


# Shell编程
## 变量 (不要空格)
	声明： i=1
	使用: $i / ${i}
## 字符串
	连接字符串： var3=${var1}${var2}
## Shell数组和循环
	声明: array=(element1 element2 element3 .... elementN) 		//()括起来 空格分开
	读取: #echo ${array[0]} 
	遍历： ${array[@]}  
	循环: 	(1) for data in ${array[@]}  
				do  
					echo ${data}  
				done  
			(2) 可用标准的for循环
			(3) for shname in `ls *.sh`
			(4) while循环
				i=1
				while(($i<100))


	sed -n '5,7p' ,只显示5~7行
	sed -n '4p' ,只显示第4行

	
	
	awk 
		-v var=val    变量， 可外部指定一个变量，在{}中使用
