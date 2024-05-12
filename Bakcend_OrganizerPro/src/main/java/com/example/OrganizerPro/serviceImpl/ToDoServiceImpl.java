package com.example.OrganizerPro.serviceImpl;

import com.example.OrganizerPro.dto.ToDoDto;
import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.entity.ToDo;
import com.example.OrganizerPro.exceptions.CategoryNotFound;
import com.example.OrganizerPro.exceptions.ToDoNotFound;
import com.example.OrganizerPro.repository.CategoryRepo;
import com.example.OrganizerPro.repository.ToDoRepo;
import com.example.OrganizerPro.service.ToDoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
@Getter
@Setter
public class ToDoServiceImpl implements ToDoService {

    private ToDoRepo toDoRepo;
    private ModelMapper modelMapper;
    private CategoryRepo categoryRepo;

    @Override
    public void DeleteTodo(Long todoID) {
        toDoRepo.deleteById(todoID);
        System.out.println("Todo deleted Successfully");
    }

    @Override
    public ToDo addTodo(ToDoDto toDoDto) {
        Category category = categoryRepo.findById(toDoDto.getCategoryId()).orElseThrow(()->new CategoryNotFound("Category not found"));
        ToDo toDo = modelMapper.map(toDoDto,ToDo.class);
        toDo.setCategory(category);
        return toDoRepo.save(toDo);
    }

    @Override
    public ToDo updateTodo(Long id, ToDoDto toDoDto) {
        ToDo toupdate = toDoRepo.findById(id).orElseThrow(()->new ToDoNotFound("Todo not found with "+id));
        Category category = categoryRepo.findById(toDoDto.getCategoryId()).orElseThrow(()->new CategoryNotFound("Category with this id not found"));
        toupdate.setCategory(category);
        toupdate.setCompleted(toDoDto.getCompleted());
        toupdate.setDescription(toDoDto.getDescription());
        return  toDoRepo.save(toupdate);
    }


    @Override
    public ToDo getById(Long id) {
        return toDoRepo.findById(id).orElseThrow(()->new ToDoNotFound("Todo not found with "+id));
    }

    @Override
    public ToDo toggleCompleted(Long id) {
        ToDo todo = toDoRepo.findById(id).orElseThrow(()->new ToDoNotFound("Todo not found with "+ id));
        todo.setCompleted(!todo.getCompleted());
        return toDoRepo.save(todo);
    }


}
