# nodeJS
## 基础
    1) 代码单线，I/O并行 -->JS执行在单线程，但内部I/O另有另有线程池!
    2) 借助libuv实现跨平台。
    3) 适用—I/O密集型,cpu密集型可借助C扩展模块提高速度！
    4) CommonJS—JS规范
    5) 引用模块，var math = require("math");
    优势: 无需同步，无死锁，无线程上下文切换的开销！
    弱点：
        1、无法利用多核CPU
        2、错误引起整个系统退出。
        3、大量计算占用CPU时，无法继续调用异步I/O

### npm常用指令
        npm -v          #显示版本，检查npm 是否正确安装。
        npm install -g express  #全局安装express模块; 安装指定版本 npm install gulp@3.9.1
        npm init        //创建package.json文件，便于后续开发者使用npm install根据dependency安装所有依赖包
        npm list         #列出package.json中安装的包
        npm show express     #显示模块详情
        npm update        #升级当前目录下的项目的所有模块
        npm update -g express  #升级全局安装的express模块
        npm uninstall express  #删除指定的模块

### 设置npm代理
        npm config set proxy http://username:password@proxyhk.huxxx.com:8080/
        npm config set https-proxy http://username:password@proxyhk.huxxx.com:8080/
        npm config set ssl-strict false
        npm config set http-proxy http://username:password@proxyhk.huxxx.com:8080/ -g
        npm config set https-proxy http://username:password@proxyhk.huxxx.com:8080/ -g

### linux(ubuntu)下安装nodeJs
	sudo -i 	//切换到root用户
	apt-get install npm	
	npm install -g n   //安装n
	n latest	//安装nodeJs最新版本
	
	n stable    //升级到stable版本
	n 6.00  //升级到指定版本
		
### windows升级nodeJS
        //windows  gnvm.exe 保存到 Node.js 所在的文件夹
        //示例 gnvm update latest
        config       配置 .gnvmrc
        use          使用某个本地已存在的 Node.js 版本
        ls           输出 [local] [remote] Node.js 版本
        install      下载/安装任意已知版本的 Node.js
        uninstall    删除任意本地已存在的 Node.js
        update       下载 Node.js latest 版本并更新到 .gnvmrc 里面
        npm          NPM 下载/安装/删除 管理
        session      临时设定本地某个已存在的 Node.js 为 全局 Node.js
        search       查询并且输出符合查询条件的 Node.js 版本详细信息的列表
        node-version 输出 [global] [latest] Node.js 版本
        reg          设定 .gnvmrc 属性值 [noderoot] 为 环境变量 [NODE_HOME]，并加入到 Path 中
        version      查看 gnvm 版本

## 系统相关
	console.log(process.__dirname); //代码目录 E:\practice\nodejs\mp3download
	console.log(process.__filename);    //文件全路径 E:\practice\nodejs\mp3download\test.js
	console.log(process.cwd());     //执行node指令时所在的地址 E:\practice\nodejs\mp3download
	console.log(process.execPath)   //当前node.exe的路径  E:\program-my\nodejs\node.exe
			
 
## 文件系统
    const fs = require('fs');
    
    --fs.readdir(path, callback) 读取文件夹,另fs.readdirSync(path) , 返回字符串数组文件名列表 (不包含"."和"..")
        var fs=require("fs");  
        var files = fs.readdirSync("E:\\project\\AS-BES\\checkout");
        console.log(files);

    --fs.readFile(file[, options], callback)  读取文件,另fs.readFileSync(file[, options])
        fs.readFile('/etc/passwd', 'utf8', callback);   //如果指定了option则返回一个字符串，否则返回raw buffer
        fs.readFile(fullPath,'utf-8', function (err, data) {
              fs.appendFileSync('C:\\Users\\z00316474\\Desktop\\fanyi.txt', data);
        });

    --fs.writeFile(file, data[, options], callback) 写入文件，另fs.writeFileSync(file, data[, options]) 
        如果文件已存在，则替换文件（即覆盖）,data可string / buffer
        fs.writeFile('message.txt', 'Hello Node.js', (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        });

    --fs.appendFile(file, data[, options], callback) 追加写入,另fs.appendFileSync(file, data[, options])
        文件不存在则创建，data可string / buffer
        fs.appendFileSync('C:\\Users\\z00316474\\Desktop\\fanyi.txt', data);
		
	//文件是否存在
	fs.existsSync("./node_modules")；
	
	

## 模块
    引用模块require: var math = require("math");
    
    模块定义-exports: 
        一个文件==一个模块，模块中存在一个module对象—代表模块自身，而exports对象是module的属性。将方法挂在exports上即可导出。
        //math.js
        exports.add = function(){
                var sum = 0;
                var argus = arguments;
                var len = arguments.length;
                var i = 0;
                while(i<len){
                    sum += argus[i++];
                }
                return sum;
            }
        //test.js
        var math = require("./math.js");
        console.log(math.add(1, 2, 3));

### 核心模块
    core modules don't has path since it's built-in.
    From the official api site it says that core modules are installed at the /lib folder of the root folder of NodeJS,
    that means /lib folder is in source code not your computer. you can see it in repository
    
    
function foo(x){
	return function(){
		return x;
	}
}


# [爬虫](http://borninsummer.com/2015/03/18/nodejs-crawler/)
## 基本例子
	//1、常用
	var fs = require('fs');
	var request = require('request');
	var cheerio = require('cheerio');
	getSeeds = function(url){
		request({url: url}, function (error, response, body){
			if (error) {
				return console.error(error);
			}
			console.log('得到种子页面： ' + url );
			var $ = cheerio.load(response.body.toString());
			$('a[href*="list.jd.com/"]').each(function(){
				var $me = $(this);
				var href = $me.attr('href');
			});
		});
	};

	//2、通过代理
	var fs = require('fs')
	var request = require('request');
	request({url: url,encoding: null,'proxy':'proxy':'http://userName:password@proxyhk.huawei.com:8080'}, function (error, response, body){
	});

## [request ](https://www.npmjs.com/package/request)
	npm install request
	基本使用： request(options, callback)
	request({url: url,encoding: null}, function (error, response, body){
		let str = iconv.decode(body, "gb2312");
	})
	
## [iconv-lite 编码转换模块](https://www.npmjs.com/package/iconv-lite)
	var iconv = require('iconv-lite');
	//检查编码是否支持
	iconv.encodingExists("us-ascii")；
	//Convert from an encoded buffer to js string 
	str = iconv.decode(new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
	// Convert from js string to an encoded buffer. 
	buf = iconv.encode("Sample input string", 'win1251');
	
	//request请求的网页乱码, encoding--null, 返回Buffer再转换
	request({url: url,encoding: null}, function (error, response, body){
		let str = iconv.decode(body, "gb2312");
	})

## [cheero DOM解析](https://www.npmjs.com/package/cheerio)
	//npm install cheerio	语法同JQuery选择器
	//1) 请求到的页面可能与浏览器中查看到的不同，浏览器解析的是一个完整页面，可能多次请求
	//2) 也可使用str.match()匹配到所需的字符串
	let $ = cheerio.load('<h2 class="title">Hello world</h2>')
	let strs = $(".title>a[href='http://www.tingge123.com/jingdiangequ/index1.shtml']").text();	//经典歌曲

	$('li').each(function(i, elem) {
	  fruits[i] = $(this).text();
	});
	
