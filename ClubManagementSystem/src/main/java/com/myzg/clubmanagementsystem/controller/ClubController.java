package com.myzg.clubmanagementsystem.controller;

import com.myzg.clubmanagementsystem.pojo.Result;
import com.myzg.clubmanagementsystem.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ClubController {
    @Autowired
    ClubService clubService;
    @GetMapping("/club")
    public Result clubQ(Integer clubId, String clubName, String clubType, String originator, String estaDate){
        HashMap<String,Object> map=new HashMap<>();
        map.put("clubId",clubId);
        map.put("clubName",clubName);
        map.put("clubType",clubType);
        map.put("originator",originator);
        map.put("estaDate",estaDate);
        return clubService.clubQ(map);
    }
    @PostMapping("/addClub")
    public Result addClub(@RequestBody Map<String,Object> data){
        HashMap<String,Object> map=new HashMap<>();
        map.put("clubName",data.get("clubName"));
        map.put("clubType",data.get("clubType"));
        map.put("originator",data.get("originator"));
        map.put("estaDate",data.get("estaDate"));
        map.put("introduction",data.get("introduction"));
        map.put("status",data.get("status"));
        return clubService.addClub(map);
    }
    @PostMapping("/deleteClub")
    public Result deleteClub(Integer clubId){
        return clubService.deleteClub(clubId);
    }
    @PostMapping("/updateClub")
    public Result updateClub(@RequestBody Map<String,Object> data){
        HashMap<String,Object> map=new HashMap<>();
        map.put("clubId",data.get("clubId"));
        map.put("clubName",data.get("clubName"));
        map.put("clubType",data.get("clubType"));
        map.put("originator",data.get("originator"));
        map.put("estaDate",data.get("estaDate"));
        map.put("introduction",data.get("introduction"));
        map.put("status",data.get("status"));
        return clubService.updateClub(map);
    }
    @PostMapping("/getClub")
    public Result getCLub(int clubId){
        return clubService.getClub(clubId);
    }
}
