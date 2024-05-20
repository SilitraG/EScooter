package com.example.demo.model;

import jakarta.persistence.*;


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
    private Integer severity;
    private String description;

    public Obstacle() {
    }

    public Obstacle(Long id, Double lat, Double lng, Integer severity, String description) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.severity = severity;
        this.description = description;
    }

    public Obstacle(Double lat, Double lng, Integer severity, String description) {
        this.lat = lat;
        this.lng = lng;
        this.severity = severity;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public Double getLat() {
        return lat;
    }

    public Double getLng() {
        return lng;
    }

    public Integer getSeverity() {
        return severity;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public void setSeverity(Integer severity) {
        this.severity = severity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Obstacle{" +
                "id=" + id +
                ", lat=" + lat +
                ", lng=" + lng +
                ", severity=" + severity +
                ", description='" + description + '\'' +
                '}';
    }
}
