package com.itany.entity;

import java.io.Serializable;

public class TrainItem implements Serializable {

	private static final long serialVersionUID = -3184498524342195960L;

	private Integer itemId;
	private String itemName;

	public TrainItem() {
		super();
	}

	public TrainItem(Integer itemId, String itemName) {
		super();
		this.itemId = itemId;
		this.itemName = itemName;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

}
