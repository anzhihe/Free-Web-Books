package com.itany.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.itany.dao.TrainItemDao;
import com.itany.entity.TrainItem;
import com.itany.util.ObjectFactory;

public class TrainItemServlet extends HttpServlet {

	private TrainItemDao trainItemDao=(TrainItemDao) ObjectFactory.getObject("trainItemDao");
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<TrainItem> list = trainItemDao.selectAll();
		String str="";
		for (TrainItem trainItem : list) {
			str+=trainItem.getItemId()+","+trainItem.getItemName()+";";
		}
		if(str.endsWith(";")){
			str=str.substring(0, str.length()-1);
		}
//		System.out.println(str);
		
		response.setContentType("text/plain;charset=utf8");
		PrintWriter out = response.getWriter();
		out.print(str);
		out.flush();
		out.close();
	}

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
