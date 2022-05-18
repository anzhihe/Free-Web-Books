package com.itany.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.itany.entity.Course;
import com.itany.util.RowMapper;

public class CourseMapper implements RowMapper<Course> {

	@Override
	public Course mapRow(ResultSet rs) throws SQLException {
		return new Course(rs.getInt("courseId"), rs.getString("courseName"),
				rs.getInt("period"), rs.getInt("itemId"),
				rs.getString("details"));
	}

}
