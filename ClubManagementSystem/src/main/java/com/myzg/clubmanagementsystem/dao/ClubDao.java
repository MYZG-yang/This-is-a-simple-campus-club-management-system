package com.myzg.clubmanagementsystem.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface ClubDao {
    List<HashMap<String,Object>> clubQ(HashMap<String,Object>map);
    int addClub(HashMap<String,Object>map);
    int deleteClub(int clubId);
    int updateClub(HashMap<String,Object>map);
    List<HashMap<String,Object>> getClub(int clubId);
}
