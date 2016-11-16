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

    
# sftp/ssh登录另一台linux
    sftp besread@10.21.89.7     lls显示本地文件夹
    ssh besread@10.21.89.7     

# 查看磁盘空间 df -h

# 查看环境变量 set/env
    win： set
    linux: env
