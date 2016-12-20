# dom4j操作xml
## 解析xml
	SAXReader reader = new SAXReader();
	Document document = reader.read(path.toFile());

	//获取文档的根节点
	Element rootElement = document.getRootElement();

    //取得某个节点的子节点(第一个)
    Element element = root.element(“四大名著");
    //索取所有指定子节点
    List nodes = rootElm.elements("csdn");
    //遍历所有节点
    for(Iterator it=root.elementIterator();it.hasNext();){
        Element element = (Element) it.next();
    }

    //获取节点文字
    String element = node.getText();

    //获取节点属性的值
    Attribute idAttribute = root.attribute("name");
    String bsName = idAttribute.getText();

## 创建xml
	// 创建文档并设置文档的根元素节点   
	org.dom4j.Element root = DocumentHelper.createElement("profiles");
	org.dom4j.Document document = DocumentHelper.createDocument(root);

	//子节点  ,2栏描述信息
	for (Map.Entry<String, String> entry : map.entrySet())
	{   
		//添加节点
		org.dom4j.Element element = root.addElement("view-entity-profile");
		//添加属性
		element.addAttribute("name", entry.getKey());
	}

	//结果写入xml
	//格式化输出
	OutputFormat format = OutputFormat.createPrettyPrint();
	//设置编码，防止乱码
	format.setEncoding("UTF-8");
	Writer xmlwriter = new OutputStreamWriter(new FileOutputStream(desXmlFile), "UTF-8");
	XMLWriter writer = new XMLWriter(xmlwriter, format);

	writer.write(document);
	writer.close();
