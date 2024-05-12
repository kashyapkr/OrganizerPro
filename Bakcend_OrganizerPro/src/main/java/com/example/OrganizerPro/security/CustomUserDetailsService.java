package com.example.OrganizerPro.security;

import com.example.OrganizerPro.entity.User;
import com.example.OrganizerPro.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username not found"));

        return new org.springframework.security.core.userdetails.User(
                username,
                user.getPassword(),
                Collections.emptyList()
        );
    }
}
