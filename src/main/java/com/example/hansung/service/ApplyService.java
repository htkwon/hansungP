package com.example.hansung.service;


import com.example.hansung.Repository.ApplyRepository;
import com.example.hansung.Repository.LoginRepository;
import com.example.hansung.Repository.ProgramRepository;
import com.example.hansung.entity.LPMapping;
import com.example.hansung.entity.Login;
import com.example.hansung.entity.Program;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplyService {

    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private ProgramRepository programRepository;
    @Autowired
    private ApplyRepository applyRepository;


    public LPMapping apply(LPMapping n) {

        LPMapping l = applyRepository.save(n);
        return n;
    }

    public List<LPMapping> showSid(Login login){
        List<LPMapping> list = applyRepository.findByLogin(login);
        return list;
    }


    public LPMapping search(Program program, Login login) {
       LPMapping lp =  applyRepository.findByProgramAndLogin(program,login);
       return lp;

    }



    public void deleteLP(Program p, Login l) {
        LPMapping lp = applyRepository.findByProgramAndLogin(p,l);
        applyRepository.delete(lp);
    }

    public void delete(Long id) {
        applyRepository.deleteById(id);
    }

    //stand상태의 리스트 가져오기 (Super Page)
    public List<LPMapping> getStandby() {
        List<LPMapping> lp = applyRepository.findByStandby();
        return lp;
    }

    //stand인 프로그램 승인  (Super Page)
    public void permission(Long id) {
        LPMapping lp = applyRepository.findById(id).orElse(null);
        lp.setProgstate("progress");
        applyRepository.save(lp);
    }

    //progress상태의 리스트 가져오기   (Super Page)
    public List<LPMapping> getProgress() {
        List<LPMapping> lp = applyRepository.findByProgress();
        return lp ;
    }

    //program finish  (Super Page)
    public void finishProg(Long id) {
        LPMapping lp = applyRepository.findById(id).orElse(null);
        lp.setProgstate("end");
        applyRepository.save(lp);

    }
}
