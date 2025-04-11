package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name="obstacle")
public class Obstacle {
    @Id
    @SequenceGenerator(
            name = "obstacle_sequence",
            sequenceName = "obstacle_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "obstacle_sequence"
    )
    private Long id;
    private Double lat;
    private Double lng;
    private Integer appearances;

    public Obstacle() {
    }

    public Obstacle(Long id, Double lat, Double lng, Integer appearances, LocalDateTime impactTime) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.appearances = appearances;
    }

    public Obstacle(Double lat, Double lng, Integer appearances, LocalDateTime impactTime) {
        this.lat = lat;
        this.lng = lng;
        this.appearances = appearances;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Integer getAppearances() {
        return appearances;
    }

    public void setAppearances(Integer appearances) {
        this.appearances = appearances;
    }

    @Override
    public String toString() {
        return "Obstacle{" +
                "id=" + id +
                ", lat=" + lat +
                ", lng=" + lng +
                ", appearances=" + appearances +
                '}';
    }
}
