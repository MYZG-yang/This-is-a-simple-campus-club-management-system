package com.myzg.clubmanagementsystem.controller;


import com.myzg.clubmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
   @Autowired
    UserService userService;
    @PostMapping("/login")
    public Result Login(@RequestBody Map<String,Object> data) {
        HashMap<String,Object> map=new HashMap<String,Object>();
        map.put("password",data.get("password"));
        map.put("studentId",data.get("studentId"));
        return userService.login(map);
    }
    @GetMapping("/user")
    public Result User(){
        return userService.user();
    }
    @PostMapping("/getUser")
    public Result getUser(int studentId){
        return  userService.getUser(studentId);
    }
    @PostMapping("/addUser")
    public Result addUser(@RequestBody Map<String,Object>map){
        HashMap<String,Object>user=new HashMap<>();
        user.put("userName",map.get("name"));
        user.put("studentId",map.get("studentId"));
        user.put("accDate",map.get("joinDate"));
        user.put("role",map.get("role"));
        user.put("conInfo",map.get("contact"));
        user.put("clubId",map.get("clubId"));
        user.put("password",map.get("password"));
        return  userService.addUser(user);
    }
    @PostMapping("/deleteUser")
    public Result deleteUser(int studentId){
        return  userService.deleteUser(studentId);
    }
    @PostMapping("/updateUser")
    public Result updateUser(@RequestBody Map<String,Object>map){
        HashMap<String,Object>user=new HashMap<>();
        user.put("userName",map.get("name"));
        user.put("studentId",map.get("studentId"));
        user.put("accDate",map.get("joinDate"));
        user.put("role",map.get("role"));
        user.put("conInfo",map.get("contact"));
        user.put("clubId",map.get("clubId"));
        user.put("password",map.get("password"));
        return  userService.updateUser(user);
    }
}
