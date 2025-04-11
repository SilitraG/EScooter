package com.example.demo.service;

import com.example.demo.model.Obstacle;
import com.example.demo.repository.ObstacleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<Obstacle> getMergedObstacles() {
        List<Obstacle> allObstacles = obstacleRepository.findAll();
        List<Obstacle> mergedObstacles = new ArrayList<>();

        while (!allObstacles.isEmpty()) {
            Obstacle reference = allObstacles.get(0);
            int totalAppearances = reference.getAppearances();

            List<Obstacle> cluster = new ArrayList<>();
            cluster.add(reference);

            for (int i = 1; i < allObstacles.size(); i++) {
                Obstacle candidate = allObstacles.get(i);
                if (Math.abs(candidate.getLat() - reference.getLat()) <= 0.00003 &&
                        Math.abs(candidate.getLng() - reference.getLng()) <= 0.00003) {

                    totalAppearances += candidate.getAppearances();
                    cluster.add(candidate);
                }
            }

            reference.setAppearances(totalAppearances);

            allObstacles.removeAll(cluster);

            for (Obstacle obs : cluster) {
                if (!obs.getId().equals(reference.getId())) {
                    obstacleRepository.delete(obs);
                }
            }
            obstacleRepository.save(reference);

            mergedObstacles.add(reference);
        }

        return mergedObstacles;
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

    public void deleteObstacles(){
        obstacleRepository.deleteAll();
    }

    @Transactional
    public void updateObstacle(Long Id, Double lat, Double lng, Integer appearances) {
        Obstacle obstacle = obstacleRepository.findById(Id).
                orElseThrow(() -> new IllegalStateException("Scooter with id " + Id + " does not exists"));

        if(lat != null && !lat.isNaN() && !Objects.equals(obstacle.getLat(), lat)){
            obstacle.setLat(lat);
        }

        if(lng != null && !lng.isNaN() && !Objects.equals(obstacle.getLng(), lng)){
            obstacle.setLng(lng);
        }

        if(appearances != null && appearances != 0 && !Objects.equals(obstacle.getAppearances(), appearances)){
            obstacle.setAppearances(appearances);
        }
    }

    public void addNewObstacle(Obstacle obstacle) {
        obstacleRepository.save(obstacle);
    }
}
