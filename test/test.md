public class NagraTool {

	// 公共变量-gekey
	public static JTextField getkeyUrlF = new JTextField();
	public static JTextField drmContentIdF = new JTextField();
	public static JTextField distributionModeF = new JTextField();
	public static JTextField streamingModeF = new JTextField();
	public static JTextField emiF = new JTextField();
	public static JTextField cryptoPeriodF = new JTextField();
	public static JTextField drmSystemIdF = new JTextField();
	public static JTextField drmNameF = new JTextField();
	public static JTextField drmMetadataF = new JTextField();
	public static JTextField timeF = new JTextField();
	public static JTextField keyIdF = new JTextField();
	public static JTextField keyF = new JTextField();
	public static JTextField ivF = new JTextField();
	public static JTextArea reqDataAreaForGetkey = new JTextArea(15, 60);
	public static JTextArea resDataAreaForGetKey = new JTextArea(15, 60);

	// 公共变量-heartBeat
	public static JTextField heartbeatUrlF = new JTextField();
	public static JTextField versionF = new JTextField();
	public static JTextArea reqDataAreaForHeartBeatF = new JTextArea(15, 60);
	public static JTextArea resDataAreaForHeartBeatF = new JTextArea(15, 60);

	public static void main(String[] args) {
		// 创建窗口-frame
		JFrame frame = new JFrame("Nagra Interface Testing Tool");

		// 初始化一个选项卡pane
		JTabbedPane tabbedPane = new JTabbedPane();
		frame.getContentPane().add(tabbedPane);
		tabbedPane.addTab("getKeyAndSignalization test", null);
		tabbedPane.addTab("heartBeat test", null);

		// 设置getkey的界面
		JPanel getKeyPanel = new JPanel();
		tabbedPane.setComponentAt(0, getKeyPanel);
		Box baseBox = Box.createVerticalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		getKeyPanel.add(baseBox);
		makeGetKeyInterface(baseBox);

		// 触发按钮
		JButton btnForGetkey = new JButton("send getkey request");
		baseBox.add(btnForGetkey);
		btnForGetkey.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				// 入参校验
				String errMeg =  getKeyParamVali();
				if (errMeg.length() != 0) {
					JOptionPane.showMessageDialog(getKeyPanel, errMeg);
					return;
				}

				// 创建httpclient
				CloseableHttpClient httpclient = HttpClients.createDefault();

				// 请求地址暂时为空
				HttpPost httpPost = new HttpPost(getkeyUrlF.getText());
				// HttpPost httpPost = new
				// HttpPost("http://www.webservicex.net/geoipservice.asmx");

				// 请求域信息
				Document document = DocumentHelper.createDocument();

				// 增加命名空间
				Namespace soapenv = Namespace.get("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
				Namespace sch = Namespace.get("sch", "drm:KeyAndSignalization/v1/schemas");
				Namespace sch1 = Namespace.get("sch1", "drm:MultiDrmCommon/v1/schemas");

				// 根节点-Envelope (添加命名空间)
				Element eleEnvelope = document.addElement(new QName("Envelope", soapenv))
						.addAttribute("xmlns:sch", "drm:KeyAndSignalization/v1/schemas")
						.addAttribute("xmlns:sch1", "drm:MultiDrmCommon/v1/schemas");

				// 节点-Envelope.Body
				Element eleBody = eleEnvelope.addElement(new QName("Body", soapenv));
				// 节点 -Envelope.Body.GetKeyAndSignalizationRequest
				Element eleGetKeyAndSignalizationRequest = eleBody
						.addElement(new QName("GetKeyAndSignalizationRequest", sch));

				// 节点 drmContent
				Element eleDrmContent = eleGetKeyAndSignalizationRequest.addElement(new QName("drmContent", sch));
				eleDrmContent.addElement(new QName("drmContentId", sch1)).addText(drmContentIdF.getText()); // TODO--drmContentId待填值
				Element eleProfile = eleDrmContent.addElement(new QName("profile", sch1));
				eleProfile.addElement(new QName("distributionMode", sch1)).addText(distributionModeF.getText()); // TODO-待填值
				eleProfile.addElement(new QName("streamingMode", sch1)).addText(streamingModeF.getText()); // TODO-待填值
				eleProfile.addElement(new QName("emi", sch1)).addText(emiF.getText()); // TODO-待填值
				eleProfile.addElement(new QName("cryptoPeriod", sch1)).addText(cryptoPeriodF.getText()); // TODO-待填值

				// 节点drmList
				Element eleDrmList = eleGetKeyAndSignalizationRequest.addElement(new QName("drmList", sch));
				Element eleDrm0 = eleDrmList.addElement(new QName("drm", sch1));
				eleDrm0.addElement(new QName("drmSystemId", sch1)).addText(drmSystemIdF.getText()); // TODO-待填值
				eleDrm0.addElement(new QName("drmName", sch1)).addText(drmNameF.getText()); // TODO-待填值
				eleDrm0.addElement(new QName("drmMetadata", sch1)).addText(drmMetadataF.getText()); // TODO-待填值,(wsdl有默认值)

				// 节点 scheduledKey
				Element eleScheduledKey = eleGetKeyAndSignalizationRequest.addElement(new QName("scheduledKey", sch));
				eleScheduledKey.addElement(new QName("time", sch)).addText(timeF.getText()); // TODO-待填值
				Element eleContentKey = eleScheduledKey.addElement(new QName("contentKey", sch));
				eleContentKey.addElement(new QName("keyId", sch1)).addText(keyIdF.getText()); // TODO-待填值
				eleContentKey.addElement(new QName("key", sch1)).addText(keyF.getText()); // TODO-待填值,wsdl有默认值
				eleContentKey.addElement(new QName("iv", sch1)).addText(ivF.getText()); // TODO-待填值,wsdl有默认值

				// dom转xml
				String requestContent = document.asXML();

				// 设置请求域
				httpPost.setEntity(new StringEntity(requestContent, Charset.forName("UTF-8")));

				// 设置请求报文
				reqDataAreaForGetkey.setText(requestContent);

				// 设置header信息
				httpPost.setHeader("Content-Type", "application/soap+xml; charset=utf-8");

				try {
					// 请求地址
					System.out.println("executing request " + httpPost.getURI());
					// 执行请求
					HttpResponse response = httpclient.execute(httpPost);

					// 获取响应实体
					HttpEntity entity = response.getEntity();

					String resStr = EntityUtils.toString(entity);

					// 设置响应内容
					String text = resStr + "\n";
					resDataAreaForGetKey.setText(text);


					// 解析xml中属性
					Document resdoc = DocumentHelper.parseText(text);
					Node nodeKeyId = document
							.selectSingleNode("/env:Envelope/env:Body/GetKeyAndSignalizationResponse/contentKey/keyId");
					if (nodeKeyId != null) {
						text += "keyId: " + nodeKeyId.getText() + "\n";
					}

					Node nodeKey = document
							.selectSingleNode("/env:Envelope/env:Body/GetKeyAndSignalizationResponse/contentKey/key");
					if (nodeKey != null) {
						text += "key: " + nodeKey.getText() + "\n";
					}

					Node nodeDrmSystemId = document
							.selectSingleNode(
									"/env:Envelope/env:Body/GetKeyAndSignalizationResponse/drmSignalization/hls/drmSystemId");
					if (nodeDrmSystemId != null) {
						text += "drmSystemId: " + nodeDrmSystemId.getText() + "\n";
					}

					Node nodeDrmName = document.selectSingleNode(
							"/env:Envelope/env:Body/GetKeyAndSignalizationResponse/drmSignalization/hls/drmName");
					if (nodeDrmName != null) {
						text += "drmName: " + nodeDrmName.getText() + "\n";
					}

					Node nodeKeyUri = document.selectSingleNode(
							"/env:Envelope/env:Body/GetKeyAndSignalizationResponse/drmSignalization/hls/keyUri");
					if (nodeKeyUri != null) {
						text += "keyUri: " + nodeKeyUri.getText() + "\n";
					}

					// 设置响应内容
					resDataAreaForGetKey.setText(text);

				} catch (Exception e1) {
					e1.printStackTrace();
				} finally {
					// 关闭连接,释放资源
					try {
						httpclient.close();
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}
			}
		});


		/**
		 * 设置heartBeat的界面
		 */
		JPanel heartBeatPanel = new JPanel();
		tabbedPane.setComponentAt(1, heartBeatPanel);

		Box baseBoxForHeartBeat = Box.createVerticalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		heartBeatPanel.add(baseBoxForHeartBeat);
		makeheartBeatInterface(baseBoxForHeartBeat);


		// 触发按钮
		JButton btForHeartBeat = new JButton(" send request");
		baseBoxForHeartBeat.add(btForHeartBeat);
		btForHeartBeat.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				if (heartbeatUrlF.getText().length() == 0 || versionF.getText().length() == 0) {
					JOptionPane.showMessageDialog(heartBeatPanel, "Param  URL and Version can not be empty ! ");
					return;
				}

				// 创建httpclient
				CloseableHttpClient httpclient = HttpClients.createDefault();

				// 请求地址暂时为空
				HttpPost httpPost = new HttpPost(heartbeatUrlF.getText());

				// 请求域信息
				Document document = DocumentHelper.createDocument();

				// 增加命名空间
				Namespace soapenv = Namespace.get("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");
				Namespace sch = Namespace.get("sch", "drm:KeyAndSignalization/v1/schemas");

				// 根节点-Envelope (添加命名空间)
				Element eleEnvelope = document.addElement(new QName("Envelope", soapenv)).addAttribute("xmlns:sch",
						"drm:KeyAndSignalization/v1/schemas");

				// 节点-Envelope.Body
				Element eleBody = eleEnvelope.addElement(new QName("Body", soapenv));
				// 节点 -Envelope.Body.HeartbeatRequest
				Element eleHeartbeatRequest = eleBody.addElement(new QName("HeartbeatRequest", sch));

				eleHeartbeatRequest.addElement(new QName("version", sch)).addText(versionF.getText()); // TODO-version值待填

				// dom转xml
				String requestContent = document.asXML();

				// 设置请求域
				httpPost.setEntity(new StringEntity(requestContent, Charset.forName("UTF-8")));

				// 打印requestdata
				System.out.println(requestContent);
				reqDataAreaForHeartBeatF.setText(requestContent);

				// 设置header信息
				httpPost.setHeader("Content-Type", "application/soap+xml; charset=utf-8");

				try {
					// 请求地址
					System.out.println("executing request " + httpPost.getURI());
					// 执行请求
					HttpResponse response = httpclient.execute(httpPost);

					// 获取响应实体
					HttpEntity entity = response.getEntity();

					// 打印响应内容长度
					System.out.println("Response content length: " + entity.getContentLength());

					String resStr = EntityUtils.toString(entity);

					// 设置响应内容
					String text = resStr + "\n";
					resDataAreaForHeartBeatF.setText(text);

					// 解析xml中属性
					Document resdoc = DocumentHelper.parseText(text);
					Node nodeReturnCode = resdoc
							.selectSingleNode("/env:Envelope/env:Body/HeartbeatResponse/returnCode");
					if (nodeReturnCode != null) {
						text += "returnCode: " + nodeReturnCode.getText() + "\n";
					}

					Node nodeErrorMessage = resdoc
							.selectSingleNode("/env:Envelope/env:Body/HeartbeatResponse/errorMessage");
					if (nodeErrorMessage != null) {
						text += "errorMessage: " + nodeReturnCode.getText() + "\n";
					}

					Node nodeStatus = resdoc
							.selectSingleNode("/env:Envelope/env:Body/HeartbeatResponse/status");
					if (nodeStatus != null) {
						text += "status: " + nodeStatus.getText() + "\n";
					}

					// 打印响应内容
					resDataAreaForHeartBeatF.setText(text);
				} catch (Exception e1) {
					e1.printStackTrace();
				} finally {
					// 关闭连接,释放资源
					try {
						httpclient.close();
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}
			}
		});

		frame.setSize(1000, 1000);
		// 将窗口可见化，这样以便用户在第一次看见窗口之前我们能够向其中添加内容
		frame.setVisible(true);
	}

	public static void makeGetKeyInterface(Box baseBox) {
		// 地址栏
		Box box0 = Box.createHorizontalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		baseBox.add(box0);
		JLabel getkeyUrlL = new JLabel("request url(must):");
		getkeyUrlF.setColumns(30);
		box0.add(getkeyUrlL);
		box0.add(getkeyUrlF);

		// drmContentId输入框
		Box box1 = Box.createHorizontalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		baseBox.add(box1);
		JLabel drmContentIdL = new JLabel("drmContentId(must):");
		drmContentIdF.setColumns(30);
		box1.add(drmContentIdL);
		box1.add(drmContentIdF);

		// distributionMode输入框
		Box box2 = Box.createHorizontalBox();
		baseBox.add(box2);
		JLabel distributionModeL = new JLabel("distributionMode(must):");
		distributionModeF.setColumns(30);
		box2.add(distributionModeL);
		box2.add(distributionModeF);

		// streamingMode输入框
		JLabel streamingModeL = new JLabel("streamingMode(must):");
		Box box3 = Box.createHorizontalBox();
		baseBox.add(box3);
		streamingModeF.setColumns(30);
		box3.add(streamingModeL);
		box3.add(streamingModeF);

		// streamingMode输入框
		JLabel emiL = new JLabel("emi:");
		Box box4 = Box.createHorizontalBox();
		baseBox.add(box4);
		emiF.setColumns(30);
		box4.add(emiL);
		box4.add(emiF);

		// streamingMode输入框
		JLabel cryptoPeriodL = new JLabel("cryptoPeriod:");
		Box box5 = Box.createHorizontalBox();
		baseBox.add(box5);
		cryptoPeriodF.setColumns(30);
		box5.add(cryptoPeriodL);
		box5.add(cryptoPeriodF);

		// drmSystemId输入框
		JLabel drmSystemIdL = new JLabel("drmSystemId(must):");
		Box box6 = Box.createHorizontalBox();
		baseBox.add(box6);
		drmSystemIdF.setColumns(30);
		box6.add(drmSystemIdL);
		box6.add(drmSystemIdF);

		// drmSystemId输入框
		JLabel drmNameL = new JLabel("drmName:");
		Box box7 = Box.createHorizontalBox();
		baseBox.add(box7);
		drmNameF.setColumns(30);
		box7.add(drmNameL);
		box7.add(drmNameF);

		// drmMetadata输入框
		JLabel drmMetadataL = new JLabel("drmMetadata:");
		Box box8 = Box.createHorizontalBox();
		baseBox.add(box8);
		drmMetadataF.setColumns(30);
		box8.add(drmMetadataL);
		box8.add(drmMetadataF);

		// drmMetadata输入框
		JLabel timeL = new JLabel("time(must):");
		Box box9 = Box.createHorizontalBox();
		baseBox.add(box9);
		timeF.setColumns(30);
		box9.add(timeL);
		box9.add(timeF);

		// drmMetadata输入框
		JLabel keyIdL = new JLabel("keyId:");
		Box box10 = Box.createHorizontalBox();
		baseBox.add(box10);
		keyIdF.setColumns(30);
		box10.add(keyIdL);
		box10.add(keyIdF);

		// drmMetadata输入框
		JLabel keyL = new JLabel("key:");
		Box box11 = Box.createHorizontalBox();
		baseBox.add(box11);
		keyF.setColumns(30);
		box11.add(keyL);
		box11.add(keyF);

		// drmMetadata输入框
		JLabel ivL = new JLabel("iv:");
		Box box12 = Box.createHorizontalBox();
		baseBox.add(box12);
		ivF.setColumns(30);
		box12.add(ivL);
		box12.add(ivF);

		// 请求数据展示框
		JLabel j1 = new JLabel("getKey request message:");
		reqDataAreaForGetkey.setLineWrap(true);
		Box box13 = Box.createHorizontalBox();
		baseBox.add(box13);
		box13.add(j1);
		box13.add(reqDataAreaForGetkey);

		// 响应数据展示框
		JLabel j2 = new JLabel("getkey response message:");
		resDataAreaForGetKey.setLineWrap(true);
		Box box14 = Box.createHorizontalBox();
		box14.setBorder(BorderFactory.createEmptyBorder(4, 5, 0, 5));
		baseBox.add(box14);
		box14.add(j2);
		box14.add(resDataAreaForGetKey);
	}

	public static String getKeyParamVali() {
		String errorMsg = "";
		
		if (getkeyUrlF.getText().length() == 0) {
			errorMsg += "Param URL can not be empty!\n";
		}

		if (drmContentIdF.getText().length() == 0) {
			errorMsg += "drmContentId can not be empty!\n";
		}

		if (!("VOD".equals(distributionModeF.getText()) || "LIVE".equals(distributionModeF.getText()))) {
			errorMsg += "distributionMode's value can only be 'VOD' or 'LIVE' !\n";
		}

		if (!("DASH".equals(streamingModeF.getText()) || "HLS".equals(streamingModeF.getText())
				|| "SMOOTH".equals(streamingModeF.getText()) || "CUSTOM".equals(streamingModeF.getText()))) {
			errorMsg += "streamingMode's value can only be one of 'DASH' 'HLS' 'SMOOTH' and 'CUSTOM'  !\n";
		}

		// emi可选
		// cryptoPeriod未使用

		if (drmSystemIdF.getText().length() == 0) {
			errorMsg += "drmSystemId can not be empty !\n";
		}

		// drmName非必须
		// drmMetadata保留使用，暂不填
		if (timeF.getText().length() == 0) {
			errorMsg += "time can not be empty!\n";
		}

		return errorMsg;
	}

	public static void makeheartBeatInterface(Box baseBoxForHeartBeat) {
		// version输入框
		Box b0 = Box.createHorizontalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		baseBoxForHeartBeat.add(b0);
		JLabel heartbeatUrlL = new JLabel("requestUrl(must):");
		heartbeatUrlF.setColumns(30);
		b0.add(heartbeatUrlL);
		b0.add(heartbeatUrlF);

		Box b1 = Box.createHorizontalBox();// 先产生水平排列方式的Box组件，当作基底容器(BaseBox)
		baseBoxForHeartBeat.add(b1);
		JLabel versionL = new JLabel("version(must):");
		versionF.setColumns(30);
		b1.add(versionL);
		b1.add(versionF);

		// 请求数据展示框
		JLabel l1 = new JLabel("heartBeat request message:");
		reqDataAreaForHeartBeatF.setLineWrap(true);
		Box b2 = Box.createHorizontalBox();
		baseBoxForHeartBeat.add(b2);
		b2.add(l1);
		b2.add(reqDataAreaForHeartBeatF);

		// 响应数据展示框
		JLabel l2 = new JLabel("heartBeat response message:");
		resDataAreaForHeartBeatF.setLineWrap(true);
		Box b3 = Box.createHorizontalBox();
		b3.setBorder(BorderFactory.createEmptyBorder(4, 5, 0, 5));
		baseBoxForHeartBeat.add(b3);
		b3.add(l2);
		b3.add(resDataAreaForHeartBeatF);
	}
}
