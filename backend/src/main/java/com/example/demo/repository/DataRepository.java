package com.example.demo.repository;

import com.example.demo.model.Data;
import com.example.demo.model.Obstacle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepository extends JpaRepository<Data, Long> {
}
