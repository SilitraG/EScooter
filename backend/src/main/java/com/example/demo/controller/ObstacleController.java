package com.example.demo.controller;

import com.example.demo.model.Obstacle;
import com.example.demo.service.ObstacleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/obstacle")
public class ObstacleController {
    private final ObstacleService obstacleService;

    @Autowired
    public ObstacleController(ObstacleService obstacleService) {
        this.obstacleService = obstacleService;
    }

    @GetMapping
    public List<Obstacle> getObstacles(){
        return obstacleService.getObstacles();
    }

    @PostMapping("/add")
    public void addNewObstacle(@RequestBody Obstacle obstacle){
        obstacleService.addNewObstacle(obstacle);
    }

    @DeleteMapping("/{obstacleId}")
    public void deleteObstacle(@PathVariable("obstacleId") Long obstacleId){
        obstacleService.deleteObstacle(obstacleId);
    }
    @PutMapping("/{obstacleId}")
    public void updateObstacle(@PathVariable("obstacleId") Long obstacleId,
                               @RequestParam(required = false) Double lat,
                               @RequestParam(required = false) Double lng,
                               @RequestParam(required = false) Integer severity,
                               @RequestParam(required = false) String description){
        obstacleService.updateObstacle(obstacleId, lat, lng, severity, description);

    }
}
