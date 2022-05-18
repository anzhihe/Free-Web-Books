package com.itany.servlet;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.itany.dao.TrainItemDao;
import com.itany.entity.TrainItem;
import com.itany.util.ObjectFactory;

public class TrainItemServletXML extends HttpServlet {

	private TrainItemDao trainItemDao=(TrainItemDao) ObjectFactory.getObject("trainItemDao");
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<TrainItem> list = trainItemDao.selectAll();
		
		//使用dom4j创建XML文档，存储到输出流中
		Document document = DocumentHelper.createDocument();
		Element root = document.addElement("TrainItems");
		for (TrainItem item : list) {
			Element trainItem = root.addElement("TrainItem");
			trainItem.addElement("itemId").setText(item.getItemId()+"");
			trainItem.addElement("itemName").setText(item.getItemName());
		}	
		ByteArrayOutputStream baos=new ByteArrayOutputStream();
		OutputFormat format=new OutputFormat("  ", true, "utf-8");
		XMLWriter xw=new XMLWriter(baos,format);
		xw.write(document);
		System.out.println(baos);
		
		response.setContentType("text/xml;charset=utf8"); //指定响应数据类型为text/xml
		PrintWriter out = response.getWriter();
		out.print(baos);
		out.flush();
		out.close();
	}

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
