package com.itany.dao.impl;

import java.util.List;

import com.itany.dao.CourseDao;
import com.itany.entity.Course;
import com.itany.mapper.CourseMapper;
import com.itany.util.JdbcTemplate;
import com.itany.util.RowMapper;

public class CourseDaoImpl implements CourseDao {
	
	private JdbcTemplate<Course> jt=new JdbcTemplate<Course>();
	private RowMapper<Course> rm=new CourseMapper();
	
	@Override
	public List<Course> selectByItemId(int itemId) {
		String sql="select * from course where itemId=?";
		return jt.query(sql, rm, itemId);
	}

	@Override
	public Course selectByCourseId(int courseId) {
		String sql="select * from course where courseId=?";
		return jt.queryForObject(sql, rm, courseId);
	}

	@Override
	public List<Course> selectByCourseName(String courseName) {
		String sql="select * from course where courseName like ?";
		return jt.query(sql, rm, courseName+"%");
	}

}
