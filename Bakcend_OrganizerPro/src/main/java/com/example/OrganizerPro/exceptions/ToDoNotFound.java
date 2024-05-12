package com.example.OrganizerPro.exceptions;


public class ToDoNotFound extends RuntimeException{
    public ToDoNotFound(String message){
        super(message);
    }
}
