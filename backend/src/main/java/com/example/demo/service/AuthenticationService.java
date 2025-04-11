package com.example.demo.service;

import com.example.demo.model.AuthenticationResponse;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request)
    {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setDob(request.getDob());

        Optional<User> userByEmailOptional = userRepository.findUserByEmail(user.getEmail());
        Optional<User> userByUsernameOptional = userRepository.findUserByUsername(user.getUsername());

        if(userByUsernameOptional.isPresent()){
            return new AuthenticationResponse("Username already taken");
        }

        if(userByEmailOptional.isPresent()){
            return new AuthenticationResponse("Email already taken");
        }

        user = userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid credentials", ex);
        }

        User user = userRepository.findUserByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}
