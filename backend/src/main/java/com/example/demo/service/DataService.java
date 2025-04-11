package com.example.demo.service;

import com.example.demo.model.Data;
import com.example.demo.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    private final DataRepository dataRepository;

    @Autowired
    public DataService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<Data> getData() {
        return dataRepository.findAll();
    }

    public void addNewData(Data data) {
        dataRepository.save(data);
    }

    public void deleteData(){
        dataRepository.deleteAll();
    }
}
