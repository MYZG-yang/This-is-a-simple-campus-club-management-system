package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;

public interface UserService {
    Result login(HashMap<String,Object> map);
    Result user();
    Result getUser(int studentId);
    Result addUser(HashMap<String,Object> map);
    Result deleteUser(int studentId);
    Result updateUser(HashMap<String,Object> map);
}
