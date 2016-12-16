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
