package com.example.hansung.entity;


import com.example.hansung.Repository.ProgramRepository;
import com.example.hansung.controller.RestController;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LPMapping {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String applydate; //등록 날짜

    @ManyToOne
    @JoinColumn(name="login_id")
    private Login login; //login FK


    @ManyToOne
    @JoinColumn(name="program_id")
    private Program program; //program FK


    private Boolean apply ; //신청했는지 판단위한 필드


    private String progstate; //현재 사용자가 신청한 프로그램의 상태

    private String progname; //신청된 프로그램 이름

    private int progpoint; //신청된 프로그램 포인트


}
