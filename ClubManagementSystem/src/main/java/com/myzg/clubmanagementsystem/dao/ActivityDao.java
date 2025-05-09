package com.myzg.clubmanagementsystem.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface ActivityDao {
    List<HashMap<String,Object>> activity();
    List<HashMap<String,Object>> getActivity(int activityId);
    int addActivity(HashMap<String,Object> map);
    int deleteActivity(int activityId);
    int updateActivity(HashMap<String,Object> map);
}
