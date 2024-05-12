package com.example.OrganizerPro.serviceImpl;

import com.example.OrganizerPro.dto.LoginDto;
import com.example.OrganizerPro.dto.UserDto;
import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.entity.User;
import com.example.OrganizerPro.exceptions.ToDoApiException;
import com.example.OrganizerPro.repository.CategoryRepo;
import com.example.OrganizerPro.repository.UserRepo;
import com.example.OrganizerPro.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private CategoryRepo categoryRepo;
    @Override
    public List<Category> getAllCategories() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User Not found"));
        return user.getCategoryList();
    }

    @Override
    public String register(UserDto userDto) {
        if(userRepo.existsByUsername(userDto.getUsername())){
            throw new ToDoApiException(HttpStatus.BAD_REQUEST,"Username already exists");
        }
        User user = new User();
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepo.save(user);
        Category category = new Category();
        category.setUser(user);
        category.setName("Tasks");
        categoryRepo.save(category);
        return "Successfully registered";
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "Logged in Successfully";
    }


}
