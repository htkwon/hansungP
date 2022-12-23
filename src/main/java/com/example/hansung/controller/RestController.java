package com.example.hansung.controller;


import com.example.hansung.entity.LPMapping;
import com.example.hansung.entity.Login;
import com.example.hansung.entity.Program;
import com.example.hansung.service.ApplyService;
import com.example.hansung.service.LoginService;
import com.example.hansung.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.sym.error;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin
public class RestController {

    @Autowired
    private LoginService loginService;
    @Autowired
    private ProgramService programService;
    @Autowired
    private ApplyService applyService;



    ///////////////////////////////////////login 관련(+user)
    //로그인 인증 요청
    @PostMapping("/login")
    public Login create(@RequestBody Login login){
        Login entity1 = loginService.create(login);
        return entity1;

    }

    //로그인 후 해당 유저 제공
    @GetMapping("login/show/{id}")
    public Login show(@PathVariable int id){
        Login login = loginService.show(id);

        return login;
    }
    //////////////////////////////////////////

    //////////////////////////////////program 관련

    //프로그램 전체 제공
    @GetMapping("/program")
    public List<Program> allShow(){
        List<Program> p = programService.allShow();
        return p;

    }

    @GetMapping("/program/{id}")
    public Program showId(@PathVariable Long id){
        Program pro = programService.showId(id);
        return pro;

    }

    ///////////////////////////////////////////


    //신청 (id인 프로그램과 sid(해당 학생) 매핑)
    @PostMapping("/program/apply/{id}/{sid}")
    public LPMapping apply(@PathVariable Long id, @PathVariable int sid){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date now = new Date();
        String now_dt = format.format(now);

        Program program = programService.showId(id);
        Login login = loginService.show(sid);

        String progName = program.getName();
        int proPoint = program.getPoint();


        LPMapping n = new LPMapping(null,now_dt,login,program,true,"standby",progName,proPoint);

        LPMapping lp = applyService.apply(n);

        return lp;
    }

    //프로그램 id 와 sid로 LPMapping 테이블 가져오기
    @GetMapping("/program/user/{id}/{sid}")
    public LPMapping programUser(@PathVariable Long id, @PathVariable int sid){
        Program program = programService.showId(id);
        Login login = loginService.show(sid);
        LPMapping lp = applyService.search(program,login);
        return lp;
    }


    //학생 sid로 LPmapping에서 신청한 프로그램들 찾기
    @GetMapping("/program/apply/list/{sid}")
    public List<LPMapping> applyProgram(@PathVariable int sid){
        Login login = loginService.show(sid);
        List<LPMapping> lp = applyService.showSid(login);

        return lp;

    }

    //LPMapping 의 id로 삭제하게 (신청취소 기능)
    @GetMapping("/apply/delete/{id}")
    public void applyDelete(@PathVariable Long id){
        applyService.delete(id);
    }



    //학생 sid 와 프로그램 id로 삭제하기
    @GetMapping("/mypage/stand/cancel/{id}/{sid}")
    public void standCancel(@PathVariable Long id, @PathVariable int sid){
        Program p = programService.showId(id);
        Login l = loginService.show(sid);
        applyService.deleteLP(p,l);
    }


    //stand인 상태 가져오기 (Super Page)
    @GetMapping("/super/getStandby")
    public List<LPMapping> getStandby(){
        List<LPMapping> lp = applyService.getStandby();
        return lp;

    }

    //progress 상태 가져오기  (Super Page)
    @GetMapping("/super/getProgress")
    public List<LPMapping> getProgress(){
        List<LPMapping> lp = applyService.getProgress();
        return lp;

    }



    //stand인 상태 승인 허락
    @GetMapping("/permission/{id}")
    public void permissionProg(@PathVariable Long id){
        applyService.permission(id);
    }

    //프로그램 진행 종료(완료)
    @GetMapping("/finish/{id}")
    public void finishProg(@PathVariable Long id){
        applyService.finishProg(id);
    }

    //프로그램을 다 완료한 학생 이름으로 포인트 올리기
    @GetMapping("/finish/point/{stuName}/{point}")
    public void pointUp(@PathVariable String stuName, @PathVariable int point){
        loginService.pointUp(stuName,point);
    }

    //online인 프로그램 가져오기
    @GetMapping("/program/on")
    public List<Program> programOn(){
        List<Program> p = programService.getOn();
        return p;
    }

    //offline인 프로그램 가져오기
    @GetMapping("/program/off")
    public List<Program> programOff(){
        List<Program> p = programService.getOff();
        return p;
    }

    //조회수 증가
    @GetMapping("/hit/{id}")
    public void hitUp(@PathVariable Long id){
        programService.upHit(id);
    }

    //현재 신청자 수 증가
    @GetMapping("/counter/{id}")
    public void counterUp(@PathVariable Long id){
        programService.upCounter(id);
    }






}
