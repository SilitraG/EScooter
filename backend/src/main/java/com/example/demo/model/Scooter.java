package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name="scooter")
public class Scooter {
    @Id
    @SequenceGenerator(
            name = "scooter_sequence",
            sequenceName = "scooter_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "scooter_sequence"
    )
    private Long id;
    private String provider;
    private Boolean defection;

    public Scooter() {
    }

    public Scooter(Long id, String provider, Boolean defection) {
        this.id = id;
        this.provider = provider;
        this.defection = defection;
    }

    public Scooter(String provider, Boolean defection) {
        this.provider = provider;
        this.defection = defection;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Boolean getDefection() {
        return defection;
    }

    public void setDefection(Boolean defection) {
        this.defection = defection;
    }

    @Override
    public String toString() {
        return "Scooter{" +
                "id=" + id +
                ", provider='" + provider + '\'' +
                ", defection=" + defection +
                '}';
    }
}
