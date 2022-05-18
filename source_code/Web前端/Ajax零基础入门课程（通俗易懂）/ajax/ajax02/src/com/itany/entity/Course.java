package com.itany.entity;

import java.io.Serializable;

public class Course implements Serializable {
	private Integer courseId;
	private String courseName;
	private Integer period;
	private Integer itemId;
	private String details;

	public Course() {
		super();
	}

	public Course(Integer courseId, String courseName, Integer period,
			Integer itemId, String details) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.period = period;
		this.itemId = itemId;
		this.details = details;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public Integer getPeriod() {
		return period;
	}

	public void setPeriod(Integer period) {
		this.period = period;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

}
