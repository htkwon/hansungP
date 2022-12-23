package com.example.hansung.Repository;

import com.example.hansung.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login,Integer> {

    Login findBySidAndPassword(Long sid, String password);

    Login findById(int id);
    Login findBySid(Long sid);

    //@Modifying
    @Query(value = "UPDATE Login l SET l.point = l.point + :point WHERE l.sid = :sid",nativeQuery = true)
    void updatePoint(@Param("sid") int sid,@Param("point") int point);

    Login findByName(String stuName);
}
