package com.myzg.clubmanagementsystem.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface UserDao {
    HashMap<String,Object> login(HashMap<String,Object> map);
    List<HashMap<String,Object>> user();
    List<HashMap<String,Object>> getUser(int studentId);
    int addUser(HashMap<String, Object>map);
    int deleteUser(int studentId);
    int updateUser(HashMap<String, Object>map);
    }
