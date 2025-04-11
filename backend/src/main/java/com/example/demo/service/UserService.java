package com.example.demo.service;

import  com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String username){
        return userRepository.findUserByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void deleteUser(Long userId){
        boolean exists = userRepository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("User with id " + userId + " does not exists");
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId, String name, String email) {
        User user = userRepository.findById(userId).
                orElseThrow(() -> new IllegalStateException("User with id " + userId + " does not exists"));

        if(name != null && !name.isEmpty() && !Objects.equals(user.getName(), name)){
            user.setName(name);
        }

        if(email != null && !email.isEmpty() && !Objects.equals(user.getEmail(), email)){
            Optional<User> userOptional = userRepository.findUserByEmail(email);
            if(userOptional.isPresent()){
                throw new IllegalStateException("Email already taken");
            }
            user.setEmail(email);
        }
    }
}
