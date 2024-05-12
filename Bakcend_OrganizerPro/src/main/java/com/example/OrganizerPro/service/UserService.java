package com.example.OrganizerPro.service;

import com.example.OrganizerPro.dto.LoginDto;
import com.example.OrganizerPro.dto.UserDto;
import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.entity.User;

import java.util.*;

public interface UserService {
    List<Category> getAllCategories();
    String register(UserDto userDto);
    String login(LoginDto loginDto);


}
