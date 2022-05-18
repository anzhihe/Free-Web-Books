package com.itany.dao.impl;

import java.util.List;

import com.itany.dao.TrainItemDao;
import com.itany.entity.TrainItem;
import com.itany.mapper.TrainItemMapper;
import com.itany.util.JdbcTemplate;
import com.itany.util.RowMapper;

public class TrainItemDaoImpl implements TrainItemDao {
		
	private JdbcTemplate<TrainItem> jt=new JdbcTemplate<TrainItem>();
	private RowMapper<TrainItem> rm=new TrainItemMapper();
	
	@Override
	public List<TrainItem> selectAll() {
		String sql="select * from trainItem";
		return jt.query(sql, rm);
	}

}
