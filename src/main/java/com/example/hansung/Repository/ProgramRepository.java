package com.example.hansung.Repository;


import com.example.hansung.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program,Long> {


    @Query(value="SELECT * FROM program ORDER BY id DESC",nativeQuery = true)
    List<Program> findAll();


    //조회수 증가
    @Modifying
    @Query(value = "UPDATE program p SET p.hit = p.hit + 1 WHERE p.id = :id",nativeQuery = true)
    void updateHit(@Param("id") Long id);

    //신청자 증가
    @Modifying
    @Query(value = "UPDATE program p SET p.counter = p.counter + 1 WHERE p.id = :id",nativeQuery = true)
    void updateCounter(@Param("id") Long id);

    @Query(value="SELECT * FROM program WHERE onoff='on'",nativeQuery = true)
    List<Program> findByOn();

    @Query(value = "SELECT * FROM program WHERE onoff='off'",nativeQuery = true)
    List<Program> findByOff();
}
