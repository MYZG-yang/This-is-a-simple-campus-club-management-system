package com.myzg.clubmanagementsystem.service;

import com.myzg.clubmanagementsystem.pojo.Result;

import java.util.HashMap;

public interface FinanceService {
    Result finance();
    Result addFinance(HashMap<String,Object> map);
    Result deleteFinance(int financeId);
    Result updateFinance(HashMap<String,Object>map);
    Result getFinance(int financeId);
}
