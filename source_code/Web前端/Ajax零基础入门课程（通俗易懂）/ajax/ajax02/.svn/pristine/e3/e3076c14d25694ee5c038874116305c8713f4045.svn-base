package com.itany.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.itany.entity.TrainItem;
import com.itany.util.RowMapper;

public class TrainItemMapper implements RowMapper<TrainItem> {

	@Override
	public TrainItem mapRow(ResultSet rs) throws SQLException {
		return new TrainItem(rs.getInt("itemId"), rs.getString("itemName"));
	}

}
