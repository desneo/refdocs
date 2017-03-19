

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require("iconv-lite")   //字符串编码转换

/**
 * 注：从"听歌123"网站下载MP3 http://www.tingge123.com
 */

//待下载的页面
// var indexURL = "http://www.tingge123.com/liuxinggequ/index1.shtml";

//待下载的歌手
var geshou = ["凤凰传奇","玖月奇迹"];
//待下载的歌曲目录
var catogories = [];
//经典歌曲
catogories.push("http://www.tingge123.com/jingdiangequ/index1.shtml");


//返回待下载的歌曲url数组
function parseURL(url){
    debugger;
    console.log("正在分析的页面：" + url);
    if( url.match("/geshou/") ){
        //下载指定的歌手歌曲
    }else{
        //下载分类的歌曲
        request({url: url,encoding: null}, function (error, response, body){
            if (error) {
                return console.error("request获取URL页面失败: " + url);
            }

            //编码转换
            let str = iconv.decode(body, "gb2312");

            //解析当前页面的分类名称
            let $ = cheerio.load(str);
            let temp = $(".title>a[href='http://www.tingge123.com/jingdiangequ/index1.shtml']").text();
            let strs = url.split(/[/.]/);
            let dirName = temp + strs[strs.length-2];

            //获取所有歌曲列表
            console.log("歌曲列表条数"+$("a[class='songname']").length);
            $("a[class='songname']").each(function(i , val){
                //从一级链接爬行进入
                let firstUrl = val.text()
                console.log("firstUrl:"+firstUrl);
            });


        });        
    }
}

//入参歌曲url和放置的文件夹名称
function downMusics(urls, dirname){
    debugger;
    //文件夹是否存在，不存在则创建
    if(!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }

    //格式 http://qqma.tingge123.com:83/123/2017/01/玖月奇迹 - 最美的中国.mp3
    for(var curUrl of urls){
        //文件若存在则跳过
        var fileName = dirname + "/" +curUrl.split("/").pop();
        if( !fs.existsSync(fileName)  ){
            request(encodeURI(curUrl)).pipe(fs.createWriteStream(fileName))
        }
    }
}

// var testUrls = ["http://qqma.tingge123.com:83/123/2017/01/玖月奇迹 - 最美的中国.mp3"];
// var dirname = "流行歌曲";
// downMusics(testUrls, dirname);

function mainFun(){
    debugger;
    for( var catogory of catogories){
        parseURL(catogory);
    }
}

mainFun();