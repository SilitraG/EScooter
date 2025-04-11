package com.example.demo.controller;

import com.example.demo.model.Data;
import com.example.demo.model.Obstacle;
import com.example.demo.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/data")
public class DataController {

    private final DataService dataService;

    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Data> getData() {
        return dataService.getData();
    }

    @PostMapping("/add")
    public void addNewData(@RequestBody Data data){
        dataService.addNewData(data);
    }

    @DeleteMapping("/delete")
    public void deleteData(){
        dataService.deleteData();
    }
}
