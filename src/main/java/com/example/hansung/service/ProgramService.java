package com.example.hansung.service;


import com.example.hansung.Repository.LoginRepository;
import com.example.hansung.Repository.ProgramRepository;
import com.example.hansung.entity.Program;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository programRepository;
    @Autowired
    private LoginRepository loginRepository;


    //프로그램 전체 entity 반환
    public List<Program> allShow() {
        return programRepository.findAll();
    }

    //프로그램 아이디로 해당 프로그램 찾기
    public Program showId(Long id) {
        Program entity = programRepository.findById(id).orElse(null);
        return entity;
    }

    //online인 프로그램 가져오기
    public List<Program> getOn() {
        List<Program> p = programRepository.findByOn();
        return p;
    }

    //offline인 프로그램 가져오기
    public List<Program> getOff() {
        List<Program> p = programRepository.findByOff();
        return p;
    }

    //조회수 증가
    @Transactional
    public void upHit(Long id){
        programRepository.updateHit(id);
    }

    //현재 신청자 수 증가
    @Transactional
    public void upCounter(Long id){
        programRepository.updateCounter(id);
    }


}
