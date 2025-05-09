package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.dao.ClubDao;
import com.myzg.clubmanagementsystem.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
@Service

public class ClubServiceImpl implements ClubService{
    @Autowired
    ClubDao clubDao;
    public Result clubQ(HashMap<String,Object>map){
        Result result=new Result("success",null);
        result.setData(clubDao.clubQ(map));
        return result;
    }
    public Result addClub(HashMap<String,Object>map){
        Result result=new Result("fail",null);
        if(clubDao.addClub(map)>=0)
            result.setFlag("success");
        return result;
    }
    public Result deleteClub(int clubId){
        Result result=new Result("fail",null);
        if(clubDao.deleteClub(clubId)>0)
            result.setFlag("success");
        return result;
    }
    public Result updateClub(HashMap<String,Object>map){
        Result result=new Result("fail",null);
        if(clubDao.updateClub(map)>0)
            result.setFlag("success");
        return result;
    }
    public Result getClub(int clubId){
        Result result=new Result("success",null);
        result.setData(clubDao.getClub(clubId).get(0));
        return result;
    }
}
