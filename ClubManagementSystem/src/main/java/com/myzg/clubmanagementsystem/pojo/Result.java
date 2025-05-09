package com.myzg.clubmanagementsystem.pojo;

public class Result {
    String flag;
    Object data;

    public Result(String flag, Object data) {
        this.flag = flag;
        this.data = data;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
