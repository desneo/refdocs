# OCR识别
## 使用
	//可指定语言和模式
	tesseract G:\practice\verifyCode\123.jpg G:\practice\verifyCode\result -psm 8
	
	trsseract --help
		-l eng	//识别所用的语言， --list-langs	 当前支持的语言
		-psm	//图片模式，默认3
			0 = 方向，Orientation and script detection (OSD) only.  
			1 = Automatic page segmentation with OSD.
			2 = Automatic page segmentation, but no OSD, or OCR
			3 = Fully automatic page segmentation, but no OSD. (Default)
			4 = Assume a single column of text of variable sizes.
			5 = Assume a single uniform block of vertically aligned text.
			6 = Assume a single uniform block of text.
			7 = 单行文本，Treat the image as a single text line.
			8 = 单词，Treat the image as a single word.
			9 = Treat the image as a single word in a circle.
			10 = 单个字母，Treat the image as a single character.
			-l lang and/or -psm pagesegmode must occur before anyconfigfile.
## 其它
	1--识别中文
		可以到http://code.google.com/p/tesseract-ocr/downloads/list下载对应的语言的字库文件. 
		简体中文字库文件下载地址为:http://tesseract-ocr.googlecode.com/files/chi_sim.traineddata.gz 下载完成后解压，然后将该文件剪切到tessdata目录下去就可以了。
			
## [项目地址](https://github.com/tesseract-ocr/tesseract)
	
