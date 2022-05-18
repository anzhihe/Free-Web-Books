package com.itany.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JSONPServlet extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		//获取回调函数的名称
		String callback=req.getParameter("callback");
		
		res.setContentType("text/plain;charset=utf-8");
		//res.setContentType("text/javascript;charset=utf-8"); //也可以指定响应类型为text/javascript
		PrintWriter out = res.getWriter();
		//将数据包裹到回调函数中
		//String str=callback+"("+"{\"id\":1001,\"name\":\"tom\",\"age\":20}"+")";
		//System.out.println(str);
		
		/*
		 * CORS解决跨域数据的访问
		 * 需要设置服务器端允许跨域请求，但存在安全问题，不推荐
		 */
		//res.setHeader("Access-Control-Allow-Origin", "*"); //允许任何域的跨域请求
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); //允许指定域的跨域请求
		String str="{\"id\":1001,\"name\":\"tom\",\"age\":20}"; //直接响应JSON数据
		out.print(str);
		out.flush();
		out.close();
	}
}
