package com.example.OrganizerPro.exceptions;

public class CategoryNotFound extends RuntimeException {
    public CategoryNotFound(String message){
        super(message);
    }
}
