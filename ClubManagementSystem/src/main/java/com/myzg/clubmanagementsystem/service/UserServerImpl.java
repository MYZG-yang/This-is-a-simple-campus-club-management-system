package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;
import java.util.List;

@Service
public class UserServerImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Override
    public Result login(HashMap<String,Object> map) {
        Result result = new Result("fail", null);
        HashMap<String,Object> user = userDao.login(map);
        System.out.println(user);
        if(user!= null&&!user.isEmpty()) {
            result.setFlag("success");
            result.setData(user);
        }
        return result;
    }
    public Result user(){
        Result result=new Result("success",null);
        List<HashMap<String,Object>> list=userDao.user();
        result.setData(list);
        return result;
    }
    public Result getUser(int studentId){
        Result result=new Result("success",null);
        result.setData(userDao.getUser(studentId).get(0));
        return result;
    }
    public Result deleteUser(int studentId){
        Result result=new Result("success",null);
        result.setData(userDao.deleteUser(studentId));
        return result;
    }
    public Result addUser(HashMap<String,Object>map){
        Result result=new Result("success",null);
        result.setData(userDao.addUser(map));
        return result;
    }
    public Result updateUser(HashMap<String,Object>map){
        Result result=new Result("success",null);
        result.setData(userDao.updateUser(map));
        return result;
    }
}
