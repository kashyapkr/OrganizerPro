package com.example.OrganizerPro.exceptions;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {
    private LocalDateTime localDateTime;
    private String message;
    private String description;
}
