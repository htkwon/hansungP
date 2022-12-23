package com.example.hansung.service;


import com.example.hansung.Repository.LoginRepository;
import com.example.hansung.Repository.ProgramRepository;
import com.example.hansung.entity.Login;
import com.example.hansung.entity.Program;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;


    //로그인 검사
    public Login create(Login login) {
        Login log = loginRepository.findBySidAndPassword(login.getSid(),login.getPassword());
        return log;
    }
    //id로 들어온 user entity 반환
    public Login show(int id) {

        return loginRepository.findById(id);
    }

    //포인트 증가
    public void pointUp(String stuName, int point) {
        //loginRepository.updatePoint(sid,point);
        Login l = loginRepository.findByName(stuName);
        int p = l.getPoint();
        l.setPoint(p+point);
        loginRepository.save(l);
    }
}
