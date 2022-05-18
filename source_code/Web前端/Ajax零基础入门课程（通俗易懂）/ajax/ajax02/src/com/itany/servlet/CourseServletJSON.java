package com.itany.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.itany.dao.CourseDao;
import com.itany.entity.Course;
import com.itany.util.ObjectFactory;

public class CourseServletJSON extends HttpServlet {
	
	private CourseDao courseDao=(CourseDao) ObjectFactory.getObject("courseDao");
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String flag=request.getParameter("flag");
		String str="";
		if("train".equals(flag)){ //根据培训项目查找对应的课程信息
			int itemId=Integer.parseInt(request.getParameter("itemId"));
			List<Course> list = courseDao.selectByItemId(itemId);
			str=new JSONArray(list).toString();
		}else{ //根据课程编号查找课程详细信息
			int courseId=Integer.parseInt(request.getParameter("courseId"));
			Course course = courseDao.selectByCourseId(courseId);
			if(course!=null){
				str=new JSONObject(course).toString();
			}
		}
		
		response.setContentType("text/plain;charset=utf8");
		PrintWriter out = response.getWriter();
		out.print(str);
		out.flush();
		out.close();
		
	}
}
