# 基础知识
## [RGB]
	![RGB描述](http://static.oschina.net/uploads/space/2016/0328/172029_VDyH_2607857.png)
		红、绿、蓝三个颜色通道每种色各分为255阶亮度，在0时“灯”最弱——是关掉的，而在255时“灯”最亮。当三色灰度数值相同时，
	产生不同灰度值的灰色调，即三色灰度都为0时，是最暗的黑色调；三色灰度都为255时，是最亮的白色调。(百度)
## [HSL/HSV/HSL颜色空间论述](http://www.360doc.com/content/13/1105/14/10724725_326803150.shtml)
## [CSDN博客](http://m.blog.csdn.net/column/details?alias=opencv-tutorial)
## [Eclipse配置OpenCV](http://docs.opencv.org/3.2.0/d1/d0a/tutorial_java_eclipse.html)
## [官方参考文档](http://docs.opencv.org/3.2.0/d9/df8/tutorial_root.html) 
## [ opencv多通道数据和多维数据的区别](http://blog.csdn.net/kxuehen/article/details/47447663)

## 示例: 
	//JNI加载动态链接库
	System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

	//读取文件,返回格式是 BGR
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
	4--System.out.println("mat = " + mat.dump());  	//以字符串方式打印像素信息，行间；号分隔。
	

# 计算图像直方图
	1--calcHist函数

	
# 相关函数说明
## Imgcodecs.imread 读文件，返回格式BGR

## [Imgcodecs.imwrite 写文件(单通道或3通道的BGR)](http://docs.opencv.org/3.2.0/d4/da8/group__imgcodecs.html#gabbc7ef1aa2edfaa87772f1202d67e0ce)

## mat.get(row, col) 获取/设置像素信息
	mat.put(i, j, temp);
	返回数组，三通道里面有3个值，单通道一个值。
	//遍历所有像素
		Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2GRAY);
        for (int i = 0; i < mat.rows(); i++)
        {
            for (int j = 0; j < mat.cols(); j++)
            {
                double[] temp = mat.get(i, j);
                temp[0] = 256;
                mat.put(i, j, temp);
            }
        }
	
## [Imgproc.cvtColor 颜色空间转换](http://baike.baidu.com/link?url=39OkKSxllQaqxFxO2cZJIFb88wgAQVRocvDD2RM0ltvDFJXJau49mAPuO_pE45s3DQdNLYjSDuQpZvzqyNdPcK)
	cvCvtColor(...)，是Opencv里的颜色空间转换函数，可以实现BGR颜色向HSV，HSI等颜色空间的转换，也可以转换为灰度图像。
	说明：	void cvCvtColor( const CvArr* src, CvArr* dst, int code );
	示例：  Imgproc.cvtColor(mat, mat, Imgproc.COLOR_RGB2GRAY);		//转灰度图
			Imgproc.COLOR_RGB2HLS	//转HLS

## [calcHist 计算图像直方图](http://www.cnblogs.com/ronny/p/opencv_road_4.html)
	//另： http://docs.opencv.org/3.1.0/d6/dc7/group__imgproc__hist.html#ga4b2b5fd75503ff9e6844cc4dcdaed35d
	void calcHist(java.util.List<Mat> images, MatOfInt channels, Mat mask, Mat hist, MatOfInt histSize, MatOfFloat ranges)
		images：为输入的图像，可多个。
		channels：图像的通道，它是一个数组，如果是灰度图像则channels[1]={0};如果是彩色图像则channels[3]={0,1,2}；如果是只是求彩色图像第2个通道的直方图，则channels[1]={1};
		IuputArray mask：是一个遮罩图像用于确定哪些点参与计算，实际应用中是个很好的参数，默认情况我们都设置为一个空图像，即：Mat()。
		OutArray hist：计算得到的直方图
		int dims：得到的直方图的维数，灰度图像为1维，彩色图像为3维。
		const int* histSize：直方图横坐标的区间数。如果是10，则它会横坐标分为10份，然后统计每个区间的像素点总和。
		const float** ranges：这是一个二维数组，用来指出每个区间的范围。
		后面两个参数都有默认值，uniform参数表明直方图是否等距，最后一个参数与多图像下直方图的显示与存储有关。
	
## [阈值处理Imgproc.threshold](http://www.cncoders.net/article/17364/)

## 降噪

## [颜色分解成单通道 Core.split(m, mv);](http://blog.csdn.net/gxiaob/article/details/8799242)	
	
