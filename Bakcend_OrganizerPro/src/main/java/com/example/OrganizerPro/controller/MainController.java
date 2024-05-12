package com.example.OrganizerPro.controller;

import com.example.OrganizerPro.dto.ToDoDto;
import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.dto.CategoryDto;
import com.example.OrganizerPro.entity.ToDo;
import com.example.OrganizerPro.serviceImpl.CategoryServiceImpl;
import com.example.OrganizerPro.serviceImpl.ToDoServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/organizer")
public class MainController {

    private ToDoServiceImpl toDoService;
    private CategoryServiceImpl categoryService;

    @PostMapping  //✅
    public ResponseEntity<ToDo> addTodo(@RequestBody ToDoDto toDoDto){
        return new ResponseEntity<>(toDoService.addTodo(toDoDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")  //✅
    public ResponseEntity<String> deleteTodo(@PathVariable Long id){
        toDoService.DeleteTodo(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable Long id, @RequestBody ToDoDto toDoDto){
        return ResponseEntity.ok(toDoService.updateTodo(id,toDoDto));
    }

    @GetMapping("/{id}")  //✅
    public ResponseEntity<ToDo> getTodoById(@PathVariable Long id){
        return ResponseEntity.ok(toDoService.getById(id));
    }

    @PatchMapping("/{id}")  //✅
    public ResponseEntity<ToDo> toggleCompleted(@PathVariable Long id){
        return ResponseEntity.ok(toDoService.toggleCompleted(id));
    }

    @GetMapping("/todos/{id}")   //✅
    public ResponseEntity<List<ToDo>> getAllTodos(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.getAllTodos(id));
    }

    @PostMapping("/createCategory")  //✅
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto category){
         return new ResponseEntity<>(categoryService.createCategory(category),HttpStatus.CREATED);
    }

    @DeleteMapping("/category/{id}") //✅
    public ResponseEntity<String> deleteCategory(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }


}
