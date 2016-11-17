帮助信息 wc --help

# 文件操作
## 获取文件头/文件尾
    head -100 catanila.out > temp.log
    tail -f oc.logs
    tail -100 oc.log
## 合并文件
    cat *.txt > test.txt 
## 清空文件
    echo "" > oc.log
## 创建文件
    touch test.txt
## cmd结果导出到文件
    mvn dependency:tree > tree.xml

# 查看jar包/解压jar包
    jar xvf *.jar   解压
    jar -tvf *.jar 查看内容



# 搜索文件find
    find ./ -name "test.txt"

# 检索文件内容grep 
    grep -r bes.dsf.server.zookeeper ./*.properties 
    grep [options] 'pattern' FILE
## 示例
    1、行首为root的行	 grep “^root” /etc/passwd
    2、行尾为sh的行		grep “sh$” /etc/passwd
    3、查找空白行 		grep “^$” /etc/passwd
    4、a后面跟了任意单个字符的行	grep “a.” /etc/passwd
    5、a后面跟了任意个a的行			grep “a*” /etc/passwd
    4、a后面跟了任意长度的任意字符，再跟上b的行			grep “a.*b” /etc/passwd
    5、a后面跟了任意个一数字后又跟了任意一个字母的行	grep “a[0-9][a-zA-Z]” /etc/passwd
    6、a后面跟了任意一个数字或字母的行					grep “a[0-9a-zA-Z]” /etc/passwd
    7、0或1个a后面跟了个b的行					grep “a\?b” /etc/passwd
    8、最少一个a，最多3个a后面跟了一个b的行		grep “a\{1,3\}b” /etc/passwd
    9、单词admin的行							grep “\<admin\>” /etc/passwd
    10、匹配自少出现一次ad，最多出现3次ad的行	grep “\(ab\)\{1,3\}” /etc/passwd
## 选项option
    --color=auto 自动为匹配的字符附色
    -r: 递归搜索用法同 -d recurse(递归)
    -v: 反向选取，只显示不符合模式的行；
    -o: 只显示被模式匹配到的字串，而不是整个行；
    -i: 不区分字符大小写；
    -A #：显示匹配到的行时，顺带显示其后面的#个行；
    -B #：前面的#行；
    -C #：前后的#行；
    -E: 使用扩展的正则表达式
## 正则表达式
    ^：锚定行首的符合条件的内容，用法格式“^pattern”；
    $: 锚定行尾的符合条件的内容，用法格式“pattern$”；
    .: 匹配任意单个字符
    *：匹配紧挨在其前面的字符任意次；
    a*b: ab, aab, acb, b
    .*: 匹配任意长度的任意字符
    []:匹配指定范围内的任意单个字符
    [^]:匹配指定范围外的任意单个字符
    \?: 匹配紧挨在其前面的字符0次或1次；
    \{m,n\}: 匹配其前面的字符至少m次，至多n次；
    \{0,n\}: 至多n次；0-n次；
    {m,\}：至少m次
    \{m\}: 精确匹配m次；
    \<: 锚定词首，用法格式：\<pattern
    \>: 锚定词尾，用法格式：pattern\>
    \(\): 分组，用法格式: \(pattern\)

# 文件行处理
## sed 处理一行，替换 删除
	sed option 'action' filename   （文件可多个）
		option: -i 直接在原文件中修改！
				-n 安静模式，默认情况所有数据都会被列出，但-n只有经过动作处理的那一行才被列出（结合p使用)
### 选项-动作
	动作：'[n1[,n2]]function'   表示对n1、n2之间的行进行处理！
	function： 
		d 删除当前行，sed '2,5d'  删除2~5行
		g 获得内存缓冲区的内容，并替代当前模板块中的文本。配合s使用，否则只替换一行中的第一个！

		a 将后续的字符新增一行到目前的下一行，sed '2a drink tea \(插入多行分隔符) ...' ，添加行
		i  同上，插入到当前的前一行，添加行
		c 替换，用后续的字符串替换n1 , n2之间的行，sed '2,5c No number 2-5'
		s 替换单个词，sed '1,20s/old/new/g' ，使用可参考vi替换，s#可将#作为分隔符（紧跟s）
		p 打印，将选中的行打印出来，通常和sed -n 一起使用，sed -n '5,7p' ,只显示5~7行,
		P	打印第一行！
### 示例
	行首插入字符:	sed -i '2s/^/\t/g' file_name
	行位插入字符:	sed -i 's/$/啥话/g' 123.log
	
	删除指定行:	sed '2d'	;	sed '3,5'
	删除包含test的行:	sed '/test/d'
	
## awk 分解行、字段
	格式:	awk 'pattern {action} pattern {action}' filename
	注：多个文件时，读取从左到右，读完第一个再读取第二个
	pattern
		1-/正则表达式/：使用通配符的扩展集。
		2-关系表达式: 可以是字符串或数字的比较，如$2>$1选择第二个字段比第一个字段长的行。
		3-模式匹配表达式：~ 匹配； ~！ 不配置
		4-BEGIN：让用户指定在第一条输入记录被处理之前所发生的动作，通常可在这里设置全局变量。
		5-END：让用户在最后一条输入记录被读取之后发生的动作。
### action
	//由一或多个命令、函数、表达式组成，之间由换行符\或;分号隔开，并位于大括号内。主要有四部份：
		变量或数组赋值
		输出命令
		内置函数
		控制流命令
		也可以调用外部shell，使用system指令（参见详解知识点）。
### 打印指定字段 {print $1} 序号1开始
	awk -F '|' '$2>3 {print $1}' data.cvs
### 指定分隔符 -F '|' 
	awk -F '|' '$2>3 {print $1}'	
### 只输出字段匹配的行 ~
	$ awk '$4 ~/Technology/'	//只第4个字段匹配的行 (不匹配 ~!)
	$ awk '$1 ~/^root/' test	//将显示test文件第一列中以root开头的行。
### 调用外部shell
	ls -l |awk '$1~/^d/{system("du -s "$9)}'	//筛选出当前目录下的左右文件夹并显示大小。

### 过滤出两个文件中相同行
	awk -F'[/,]' 'NR==FNR{a[$1]=$1}NR>FNR{if ($2 in a) print $0}' b a >c		//推荐，先将记录放在数组中！
	
### awk内部变量名
	$0		完整的输入记录-即当期的完整行
	$n		当前记录的第n个字段，字段间由FS分隔。
	NF		每一行（$0）拥有的字段数；
	NR		目前awk处理的是“总共第几行”数据；FNR 在当前文件的多少行！（多文件处理时用到）
	FS		指定被处理文件的分割字符，默认空格键，如  awk -F'[;:]'
	OFS		输出字段分隔符(默认值是一个空格)。awk  -F:'{print $1,$3}' OFS="\t" passwd.dat
	FS 		目前的分割字符，默认空格键
	ARGC	命令行参数的数目。
	ARGIND	命令行中当前文件的位置(从0开始算)。
	ARGV	包含命令行参数的数组。
	CONVFMT	数字转换格式(默认值为%.6g)
	ENVIRON	环境变量关联数组。
	ERRNO	最后一个系统错误的描述。
	FIELDWIDTHS	字段宽度列表(用空格键分隔)。
	FILENAME	当前文件名。
	IGNORECASE	如果为真，则进行忽略大小写的匹配。
	NF		当前记录中的字段数。
	OFMT	数字的输出格式(默认值是%.6g)。
	ORS		输出记录分隔符(默认值是一个换行符)。
	RLENGTH	由match函数所匹配的字符串的长度。
	RS		记录分隔符(默认是一个换行符)。
	RSTART	由match函数所匹配的字符串的第一个位置。
	SUBSEP	数组下标分隔符(默认值是\034)。

### awk内部字符串函数
	gsub(r,s)	在整个$0中用s代替r
	gsub(r,s,t)	在整个t中用s替代r
	index(s,t)	返回s中字符串t的第一位置
	length(s)	返回s长度
	match(s,r)	测试s是否包含匹配r的字符串
	split(s,a,fs)	在fs上将s分成序列a
	sprint(fmt,exp)	返回经fmt格式化后的exp
	sub(r,s)		用$0中最左边最长的子串代替s
	substr(s,p)		返回字符串s中从p开始的后缀部分
	substr(s,p,n)	返回字符串s中从p开始长度为n的后缀部分

### awk操作符-运算符
	in	是否数组成员	//{if ($2 in a)print $0}

	
## sort 排序
	//如果指定多个文件，则将全部文件当做一个文件进行处理
	sort [options]  [files]
		-t  指定域分隔符(默认空格或tab) 	sort -t: -r video
		-n	按数字排序（将字符串转数字）
		-k	按指定字段(序号1开始)排序		l | sort -n -k 7
		-b	忽略行前空格
		-f  忽略大小写
		-r	逆序排列

## uniq	去重 统计重复行次数（需相邻，先sort）
	uniq -c test.txt
		-c	行首显示行出现的次数
		-d	只打印重复行
		-u	只打印非重复行
	awk -F "/" '{print $3}' b.txt | sort -r| uniq -u	

## cut 分解出单个字符
	cut -c3-5 /etc/passwd		//就是输出/etc/passwd文件中每行的第三到第五个字符。
		-c5		提取第5个字符
		-c5-    提取第5个字符以后的字符
		-c1,5,12  提取多个字符，中间用“,”符号隔开
		-c5-14  提取第5个字符到第14个字符间的字符





# 统计 ls -l | wc -l
    wc [option] file
        -c,--bytes  统计字节
        -m,--chars  统计chracter
        -l,--lines  统计行数
        -L,--max-lene-length    长度最大行的长度
        -w,--words  统计单词


# 文件(夹)大小 du -m file/folder
    du : 		du -sm	file/directory
       默认不加选项 只显示文件夹的大小，包括显示子目录中的文件夹
    -a 显示所有文件的大小，包括文件子目录中的文件
    -s 只显示文件夹的总容量！ 以k为单位显示，无后缀
    -h 已G/M显示文件大小	显示后缀（只适用于linux）
    -m 以M为单位显示大小	不显示M，只显示数字
    -k  以1024 bit单位显示
    -g   以GB为单位显示
    
# sftp/ssh登录另一台linux
    sftp besread@10.21.89.7     lls显示本地文件夹
    ssh besread@10.21.89.7     

# 查看磁盘空间 df -h

# 查看环境变量 set/env
    win： set
    linux: env