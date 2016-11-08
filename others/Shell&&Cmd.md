# 获取文件头/文件尾
    head -100 catanila.out > temp.log
    tail -f oc.logs

# 查看jar包/解压jar包
    jar xvf *.jar   解压
    jar -tvf *.jar 查看内容

# cmd结果导出到文件
    mvn dependency:tree > tree.xml

# 合并文件
    cat *.txt > test.txt 
    
# sftp/ssh登录另一台linux
    sftp besread@10.21.89.7     lls显示本地文件夹
    ssh besread@10.21.89.7     

# 查看磁盘空间 df -h

# 查看环境变量
    win： set
    linux: env
