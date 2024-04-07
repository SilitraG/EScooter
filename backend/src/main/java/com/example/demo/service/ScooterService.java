package com.example.demo.service;

import com.example.demo.model.Scooter;
import com.example.demo.repository.ScooterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ScooterService {
    private final ScooterRepository scooterRepository;

    @Autowired
    public ScooterService(ScooterRepository scooterRepository) {
        this.scooterRepository = scooterRepository;
    }

    public List<Scooter> getScooters(){
        return scooterRepository.findAll();
    }

    public Scooter loadScooterById(Long Id) throws Exception {
        return scooterRepository.findScooterById(Id)
                .orElseThrow(() -> new Exception("Scooter not found"));
    }
    public void deleteScooter(Long Id){
        boolean exists = scooterRepository.existsById(Id);
        if(!exists){
            throw new IllegalStateException("Scooter with id " + Id + " does not exists");
        }
        scooterRepository.deleteById(Id);
    }

    @Transactional
    public void updateScooter(Long Id, String provider, Boolean defection) {
        Scooter scooter = scooterRepository.findById(Id).
                orElseThrow(() -> new IllegalStateException("Scooter with id " + Id + " does not exists"));

        if(provider != null && !provider.isEmpty() && !Objects.equals(scooter.getProvider(), provider)){
            scooter.setProvider(provider);
        }

        if(defection != null  && !Objects.equals(scooter.getDefection(), defection)){
            scooter.setDefection(defection);
        }
    }

    public void addNewScooter(Scooter scooter) {
        scooterRepository.save(scooter);
    }
}
