package com.myzg.clubmanagementsystem.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface FinanceDao {
    List<HashMap<String,Object>>finance();
    int addFinance(HashMap<String,Object>map);
    int deleteFinance(int FinanceId);
    int updateFinance(HashMap<String,Object>map);
    List<HashMap<String,Object>> getFinance(int financeId);
}
