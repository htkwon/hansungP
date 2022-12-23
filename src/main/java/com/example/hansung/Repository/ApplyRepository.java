package com.example.hansung.Repository;

import com.example.hansung.entity.LPMapping;
import com.example.hansung.entity.Login;
import com.example.hansung.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<LPMapping,Long> {


    List<LPMapping> findByLogin(Login login);

    LPMapping findByProgramAndLogin(Program program, Login login);

    @Query(value="SELECT * FROM lpmapping WHERE progstate='standby'",nativeQuery = true)
    List<LPMapping> findByStandby();

    @Query(value="SELECT * FROM lpmapping WHERE progstate='progress'",nativeQuery = true)
    List<LPMapping> findByProgress();


}
