package com.example.demo.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            User florin = new User(
                    "Florin",
                    "florin@yahoo.com",
                    LocalDate.of(1998, Month.SEPTEMBER, 23)
            );
            User raluca = new User(
                    "Raluca",
                    "raluca@gmail.com",
                    LocalDate.of(2002, Month.JULY, 3)
            );

            repository.saveAll(
                    List.of(florin, raluca)
            );
        };
    }
}
