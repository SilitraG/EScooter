package com.example.demo.service;

import com.example.demo.model.Obstacle;
import com.example.demo.repository.ObstacleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ObstacleService {
    private final ObstacleRepository obstacleRepository;

    @Autowired
    public ObstacleService(ObstacleRepository obstacleRepository) {
        this.obstacleRepository = obstacleRepository;
    }

    public List<Obstacle> getObstacles(){
        return obstacleRepository.findAll();
    }

    public Obstacle loadObstacleById(Long Id) throws Exception {
        return obstacleRepository.findObstacleById(Id)
                .orElseThrow(() -> new Exception("Scooter not found"));
    }
    public void deleteObstacle(Long Id){
        boolean exists = obstacleRepository.existsById(Id);
        if(!exists){
            throw new IllegalStateException("Scooter with id " + Id + " does not exists");
        }
        obstacleRepository.deleteById(Id);
    }

    @Transactional
    public void updateObstacle(Long Id, Double lat, Double lng, Integer severity, String description) {
        Obstacle obstacle = obstacleRepository.findById(Id).
                orElseThrow(() -> new IllegalStateException("Scooter with id " + Id + " does not exists"));

        if(lat != null && !lat.isNaN() && !Objects.equals(obstacle.getLat(), lat)){
            obstacle.setLat(lat);
        }

        if(lng != null && !lng.isNaN() && !Objects.equals(obstacle.getLng(), lng)){
            obstacle.setLng(lng);
        }

        if(severity != null && severity != 0 && !Objects.equals(obstacle.getSeverity(), severity)){
            obstacle.setSeverity(severity);
        }

        if(description != null && !description.isEmpty() && !Objects.equals(obstacle.getDescription(), description)){
            obstacle.setDescription(description);
        }
    }

    public void addNewObstacle(Obstacle obstacle) {
        obstacleRepository.save(obstacle);
    }
}
