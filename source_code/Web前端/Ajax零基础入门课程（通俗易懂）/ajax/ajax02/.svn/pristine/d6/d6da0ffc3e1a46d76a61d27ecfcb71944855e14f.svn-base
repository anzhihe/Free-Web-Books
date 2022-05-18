package com.itany.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.itany.dao.CourseDao;
import com.itany.entity.Course;
import com.itany.util.ObjectFactory;

public class CourseServlet2 extends HttpServlet {
	
	private CourseDao courseDao=(CourseDao) ObjectFactory.getObject("courseDao");
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String courseName=request.getParameter("courseName");
		List<Course> list = courseDao.selectByCourseName(courseName);
		
		String str="";
		for (Course course : list) {
			str+=course.getCourseName()+",";
		}
		if(str.endsWith(",")){
			str=str.substring(0, str.length()-1);
		}
		
		response.setContentType("text/plain;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.print(str);
		out.flush();
		out.close();
	}

}
