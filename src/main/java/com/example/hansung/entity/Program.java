package com.example.hansung.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; //프로그램 이름

    private String date; //프로그램 신청 날짜

    private String img; //프로그램 타이틀 이미지

    private String img2; //프로그램 세부사항 이미지

    private int point; //프로그램 포인트

    private String place;  //프로그램 장소

     private String imformation;  //프로그램 정보

    private String depart; //프로그램 등록 부서

    private int persons;  //프로그램 수용 인원수

   private String student;  //프로그램 대상자 -> 안씀

    private int counter; //현재 몇명

    private int hit; //프로그램 조회수

    private String onoff; //프로그램 onoff분류

    private String classify; //예술 문학 진로 공학 분류






}
