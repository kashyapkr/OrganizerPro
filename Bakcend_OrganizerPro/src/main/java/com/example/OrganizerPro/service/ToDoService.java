package com.example.OrganizerPro.service;

import com.example.OrganizerPro.dto.ToDoDto;
import com.example.OrganizerPro.entity.ToDo;
import java.util.*;

public interface ToDoService {

    void DeleteTodo(Long todoID);

    ToDo addTodo(ToDoDto toDoDto);

    ToDo updateTodo(Long id, ToDoDto toDoDto );

    ToDo getById(Long id);

    ToDo toggleCompleted(Long id);


}
