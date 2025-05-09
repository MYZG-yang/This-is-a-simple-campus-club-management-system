package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.dao.FinanceDao;
import com.myzg.clubmanagementsystem.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class FinanceServiceImpl implements FinanceService{
    @Autowired
    FinanceDao financeDao;
    public Result finance(){
        Result result=new Result("success","null");
        result.setData(financeDao.finance());
        return result;
    }
    public Result getFinance(int financeId){
        Result result=new Result("success","null");
        result.setData(financeDao.getFinance(financeId).get(0));
        return result;
    }
    public Result addFinance(HashMap<String,Object> map){
        Result result=new Result("success","null");
        result.setData(financeDao.addFinance(map));
        return result;
    }
    public Result deleteFinance(int financeId){
        Result result=new Result("success","null");
        result.setData(financeDao.deleteFinance(financeId));
        return result;
    }
    public Result updateFinance(HashMap<String,Object> map){
        Result result=new Result("success","null");
        result.setData(financeDao.updateFinance(map));
        return result;
    }
}
