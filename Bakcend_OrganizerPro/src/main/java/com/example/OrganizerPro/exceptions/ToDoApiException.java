package com.example.OrganizerPro.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class ToDoApiException extends  RuntimeException{
    private HttpStatus status;
    private String message;
}
