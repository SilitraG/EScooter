package com.example.demo.controller;

import com.example.demo.model.AuthenticationResponse;
import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("*")
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/api/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request)
    {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/api/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request)
    {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
