package com.example.OrganizerPro.controller;

import com.example.OrganizerPro.dto.LoginDto;
import com.example.OrganizerPro.dto.UserDto;
import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.service.CategoryService;
import com.example.OrganizerPro.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private UserService userService;
    private CategoryService categoryService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userDto){
        return new ResponseEntity<>(userService.register(userDto), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(userService.getAllCategories());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(userService.login(loginDto));
    }
}
