package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "data")
public class Data {
    @Id
    @SequenceGenerator(
            name = "data_sequence",
            sequenceName = "data_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "data_sequence"
    )

    private Long id;
    private Double beta;
    private Double gamma;
    private Integer x;
    private Integer y;
    private Integer z;

    public Data() {
    }

    public Data(Long id, Double beta, Double gamma, Integer x, Integer y, Integer z, LocalDateTime impactTime) {
        this.id = id;
        this.beta = beta;
        this.gamma = gamma;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public Data(Double beta, Double gamma, Integer x, Integer y, Integer z, LocalDateTime impactTime) {
        this.beta = beta;
        this.gamma = gamma;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override
    public String toString() {
        return "Data{" +
                "id=" + id +
                ", beta=" + beta +
                ", gamma=" + gamma +
                ", x=" + x +
                ", y=" + y +
                ", z=" + z +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBeta() {
        return beta;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }

    public Double getGamma() {
        return gamma;
    }

    public void setGamma(Double gamma) {
        this.gamma = gamma;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Integer getZ() {
        return z;
    }

    public void setZ(Integer z) {
        this.z = z;
    }
}
