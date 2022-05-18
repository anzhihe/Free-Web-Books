package com.itany.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.itany.dao.TrainItemDao;
import com.itany.entity.TrainItem;
import com.itany.util.ObjectFactory;

public class TrainItemServletJSON extends HttpServlet {

	private TrainItemDao trainItemDao=(TrainItemDao) ObjectFactory.getObject("trainItemDao");
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<TrainItem> list = trainItemDao.selectAll();
		String str=new JSONArray(list).toString();
		
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
