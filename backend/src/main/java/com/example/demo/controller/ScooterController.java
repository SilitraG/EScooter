package com.example.demo.controller;

import com.example.demo.model.Scooter;
import com.example.demo.service.ScooterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/scooter")
public class ScooterController {
    private final ScooterService scooterService;

    @Autowired
    public ScooterController(ScooterService scooterService) {
        this.scooterService = scooterService;
    }

    @GetMapping
    public List<Scooter> getScooters(){
        return scooterService.getScooters();
    }

    @PostMapping("/add")
    public void addNewScooter(@RequestBody Scooter scooter){
        scooterService.addNewScooter(scooter);
    }

    @DeleteMapping("/{scooterId}")
    public void deleteScooter(@PathVariable("scooterId") Long scooterId){
        scooterService.deleteScooter(scooterId);
    }
    @PutMapping("/{scooterId}")
    public void updateScooter(@PathVariable("scooterId") Long scooterId,
                                @RequestParam(required = false) String provider,
                                 @RequestParam(required = false) Boolean defection){
        scooterService.updateScooter(scooterId, provider, defection);

    }
}
