package com.example.OrganizerPro.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ToDoNotFound.class)
    public  ResponseEntity<ErrorDetails> handelToDoNotFoundException(ToDoNotFound toDoNotFound,WebRequest webRequest){
            ErrorDetails errorDetails  = new ErrorDetails(
                    LocalDateTime.now(),
                    toDoNotFound.getMessage(),
                    webRequest.getDescription(false)

            );
            return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoryNotFound.class)
    public ResponseEntity<ErrorDetails> handelCategoryNotFoundException(CategoryNotFound categoryNotFound , WebRequest webRequest){
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                categoryNotFound.getMessage(),
                webRequest.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ToDoApiException.class)
    public ResponseEntity<ErrorDetails> handelToDoApiExceptions(ToDoApiException toDoApiException, WebRequest webRequest){
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                toDoApiException.getMessage(),
                webRequest.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails,HttpStatus.BAD_REQUEST);
    }
}
