package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/get_users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @DeleteMapping(path = "/delete_user/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }
    @PutMapping(path = "/update_user/{userId}")
    public void updateUser(@PathVariable("userId") Long userId,
                           @RequestParam(required = false) String name,
                           @RequestParam(required = false) String email){
        userService.updateUser(userId, name, email);
    }

    @GetMapping("/admin_only")
    public ResponseEntity<String> adminOnly()
    {
        return ResponseEntity.ok("Hello from admin only url");
    }
}
