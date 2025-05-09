package com.myzg.clubmanagementsystem.controller;

import com.myzg.clubmanagementsystem.pojo.Result;
import com.myzg.clubmanagementsystem.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class FinanceController {
    @Autowired
    FinanceService financeService;
    @GetMapping("/finance")
    public Result finance(){
        return financeService.finance();
    }
    @PostMapping("/getFinance")
    public Result getFinance(int financeId){
        return financeService.getFinance(financeId);
    }
    @PostMapping("/addFinance")
    public Result addFinance(@RequestBody Map<String,Object> data){
        HashMap<String,Object> map=new HashMap<>();
        map.put("financeSum",data.get("amount"));
        map.put("clubId",data.get("clubId"));
        map.put("financeInfo",data.get("description"));
        map.put("financeName",data.get("name"));
        map.put("recordDate",data.get("recordDate"));
        map.put("financeType",data.get("type"));
        return financeService.addFinance(map);
    }
    @PostMapping("/updateFinance")
    public Result updateFinance(@RequestBody Map<String,Object> data){
        HashMap<String,Object> map=new HashMap<>();
        map.put("financeId",data.get("financeId"));
        map.put("financeSum",data.get("amount"));
        map.put("clubId",data.get("clubId"));
        map.put("financeInfo",data.get("description"));
        map.put("financeName",data.get("name"));
        map.put("recordDate",data.get("recordDate"));
        map.put("financeType",data.get("type"));
        return financeService.updateFinance(map);
    }
    @PostMapping("/deleteFinance")
    public Result deleteFinance(int financeId){
        return financeService.deleteFinance(financeId);
    }
}
