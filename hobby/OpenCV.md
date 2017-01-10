# 基础知识
## [RGB]
	![RGB描述](http://static.oschina.net/uploads/space/2016/0328/172029_VDyH_2607857.png)
		红、绿、蓝三个颜色通道每种色各分为255阶亮度，在0时“灯”最弱——是关掉的，而在255时“灯”最亮。当三色灰度数值相同时，
	产生不同灰度值的灰色调，即三色灰度都为0时，是最暗的黑色调；三色灰度都为255时，是最亮的白色调。(百度)
## [HSL和HSV颜色空间论述](http://www.360doc.com/content/13/1105/14/10724725_326803150.shtml)
## [CSDN博客](http://m.blog.csdn.net/column/details?alias=opencv-tutorial)
## [Eclipse配置OpenCV](http://docs.opencv.org/3.2.0/d1/d0a/tutorial_java_eclipse.html)
## [官方参考文档](http://docs.opencv.org/3.2.0/d9/df8/tutorial_root.html) 

## 示例: 
	//JNI加载动态链接库
	System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

	//读取文件
	Mat mat = Imgcodecs.imread("G:/practice/openCV/123.jpg");
	System.out.println(mat);
	
	//展示图像
	ImageViewer imageViewer = new ImageViewer(mat, "第一幅图片");
	imageViewer.imshow();
	
	//图片写入文件
	Imgcodecs.imwrite("G:/practice/openCV/cp123.jpg", mat);
	
	//图片信息
	System.out.println("图片像素(行):" + mat.rows());
	System.out.println("图片像素(列):" + mat.cols());
	System.out.println("图片通道(channels):" + mat.channels());
	System.out.println("图片深度(depth of a matrix element):" + mat.depth());
	System.out.println("是否连续存储:" + mat.isContinuous());

# [Mat数据结构](https://github.com/xiahouzuoxin/notes/blob/master/essays/OpenCV%E5%9F%BA%E7%A1%80%E7%AF%87%E4%B9%8BMat%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.md)
	1--图像在数码设备中的表现是矩阵。
	2--Mat对象有矩阵头（矩阵尺寸，存储方法，存储地址等信息），和指向一个所有像素值矩阵的指针。
		当程序中传递图像并创建副本时，大的开销是由矩阵造成的，openCV为了为了解决图像这个问题，计数机制，其思路
			时每个Mat对象都有自己的信息头，但是共享同一个矩阵。
	3--若是任然想复制矩阵本身，则可以用clone 和copyTo

# [阈值处理Imgproc.threshold](http://www.cncoders.net/article/17364/)

# [颜色分解成单通道 Core.split(m, mv);](http://blog.csdn.net/gxiaob/article/details/8799242)
