package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;

public interface ClubService {
    Result clubQ(HashMap<String,Object>map);
    Result addClub(HashMap<String,Object>map);
    Result deleteClub(int clubId);
    Result updateClub(HashMap<String,Object>map);
    Result getClub(int clubId);
}
