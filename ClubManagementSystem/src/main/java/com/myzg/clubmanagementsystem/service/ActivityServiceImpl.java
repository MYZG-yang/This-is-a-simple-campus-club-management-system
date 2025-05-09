package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.dao.ActivityDao;
import com.myzg.clubmanagementsystem.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ActivityServiceImpl implements ActivityService{
    @Autowired
    ActivityDao activityDao;
    public Result activity(){
        Result result=new Result("success",null);
        result.setData(activityDao.activity());
        return result;
    }
    public Result addActivity(HashMap<String,Object>map){
        Result result=new Result("success",null);
        result.setData(activityDao.addActivity(map));
        return result;
    }
    public Result deleteActivity(int activityId){
        Result result=new Result("success",null);
        result.setData(activityDao.deleteActivity(activityId));
        return result;
    }
    public Result updateActivity(HashMap<String,Object>map){
        Result result=new Result("success",null);
        result.setData(activityDao.updateActivity(map));
        return result;
    }
    public Result getActivity(int activityId){
        Result result=new Result("success",null);
        result.setData(activityDao.getActivity(activityId).get(0));
        return result;
    }
}
