# 数组
    //声明
    let arr3:number[] = [3,4,5,6,7,8];
	
	//循环
	1) for (let entry of someArray) { console.log(entry); 	}
	2) list.foreach((val,index [, array])=>{ console.log("")});
	
    //排序，若返回值>0，则a在b后，即升序排列
    示例: [6, 8, 5 ,4].sort(function(a,b){ if(a>b){return 1}else {return -1} })  //[4, 5, 6, 8]
    [].sort(function(a, b ) {
        if (a > b) {return 1;
        }else if(a === b) {return 0;
        }else {return -1; }
    );
	
	
