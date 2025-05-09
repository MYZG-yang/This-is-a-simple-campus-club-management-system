package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;

public interface ActivityService {
    Result activity();
    Result addActivity(HashMap<String,Object>map);
    Result deleteActivity(int activityId);
    Result updateActivity(HashMap<String,Object>map);
    Result getActivity(int activityId);

}
