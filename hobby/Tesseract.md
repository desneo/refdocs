# OCR识别
## 使用
	//可指定语言和模式
	tesseract G:\practice\verifyCode\123.jpg G:\practice\verifyCode\result -psm 8
	
	trsseract --help
		-l eng	//识别所用的语言， --list-langs	 当前支持的语言
		-psm	//图片模式，默认3
			0 =只进行定向和脚本检测（OSD）
			1 =通过OSD进行页面自动分割
			2 =自动分割，但没有OSD，或OCR
			3 =全自动分割，但没有OSD（默认）
			.4 =假设待识别图片是一列的文本
			5 =假设待识别图片是一个统一的垂直对齐的文本块
			6 =假设待识别图片是一个统一的文本块
			7 =把图像作为一个单一的文本行
			8 =把图像当作一个字
			9 =把图像作为一个字在一个圆圈中
			10 =把图像当作一个单独的字符
		-l lang and/or -psm pagesegmode must occur before anyconfigfile.
## 其它
	1--识别中文
		可以到http://code.google.com/p/tesseract-ocr/downloads/list下载对应的语言的字库文件. 
		简体中文字库文件下载地址为:http://tesseract-ocr.googlecode.com/files/chi_sim.traineddata.gz 下载完成后解压，然后将该文件剪切到tessdata目录下去就可以了。
			
## [项目地址](https://github.com/tesseract-ocr/tesseract)
	
