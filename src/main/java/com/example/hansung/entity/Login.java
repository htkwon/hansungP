package com.example.hansung.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private Long sid; //학생 학번

    private String password; //비밀번호

    private String name ;  //이름

    private String department ; //학생 학과

    private int point; //학생 누적 포인트



}
