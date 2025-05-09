package com.myzg.clubmanagementsystem.controller;

import com.myzg.clubmanagementsystem.pojo.Result;
import com.myzg.clubmanagementsystem.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ActivityController {
    @Autowired
    ActivityService activityService;
    @GetMapping("/activity")
    public Result activity(){
        HashMap<String,Object> map = new HashMap<>();
        return activityService.activity();
    }
    @PostMapping("/getActivity")
    public Result getActivity(int activityId){
        return activityService.getActivity(activityId);
    }
    @PostMapping("/addActivity")
    public Result addActivity(@RequestBody Map<String,Object> data){
        HashMap<String,Object>map=new HashMap<>();
        map.put("ActName",data.get("name"));
        map.put("ActType",data.get("type"));
        map.put("ActDate",data.get("date"));
        map.put("ActPlace",data.get("location"));
        map.put("Att",data.get("expectedParticipants"));
        map.put("ActInfo",data.get("description"));
        map.put("ClubId",data.get("organizerId"));
        return activityService.addActivity(map);
    }
    @PostMapping("/updateActivity")
    public Result updateActivity(@RequestBody Map<String,Object> data){
        HashMap<String,Object>map=new HashMap<>();
        map.put("ActId",data.get("activityId"));
        map.put("ActName",data.get("name"));
        map.put("ActType",data.get("type"));
        map.put("ActDate",data.get("date"));
        map.put("ActPlace",data.get("location"));
        map.put("Att",data.get("expectedParticipants"));
        map.put("ActInfo",data.get("description"));
        map.put("ClubId",data.get("organizerId"));
        return activityService.updateActivity(map);
    }
    @PostMapping("/deleteActivity")
    public Result deleteActivity(int activityId){
        return activityService.deleteActivity(activityId);
    }
}
