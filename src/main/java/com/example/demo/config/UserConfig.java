package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
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
                    "florin",
                    "parola",
                    Role.ADMIN,
                    LocalDate.of(1998, Month.SEPTEMBER, 23)
            );
            User raluca = new User(
                    "Raluca",
                    "raluca@gmail.com",
                    "iulica",
                    "parola2",
                    Role.USER,
                    LocalDate.of(2002, Month.JULY, 3)
            );

            repository.saveAll(
                    List.of(florin, raluca)
            );
        };
    }
}
