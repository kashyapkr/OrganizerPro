package com.example.OrganizerPro.serviceImpl;

import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.dto.CategoryDto;
import com.example.OrganizerPro.entity.ToDo;
import com.example.OrganizerPro.entity.User;
import com.example.OrganizerPro.exceptions.CategoryNotFound;
import com.example.OrganizerPro.repository.CategoryRepo;
import com.example.OrganizerPro.repository.UserRepo;
import com.example.OrganizerPro.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepo categoryRepo;
    private UserRepo userRepo;

    private String getUserName(){
        try{
            return SecurityContextHolder.getContext().getAuthentication().getName();
        }
        catch (Exception e){
            System.out.println(e);
            throw new UsernameNotFoundException("User not found");
        }
    }
    private User getAuthUser() {
        String username = getUserName();
        return userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username not found"));
    }
    @Override
    public List<ToDo> getAllTodos(Long categoryId) {
        Category category = categoryRepo.findById(categoryId).orElseThrow(()->new CategoryNotFound("Category not found with "+ categoryId));
        List<ToDo> todos = new ArrayList<>(category.getTodos());
        todos.sort(Comparator.comparing(ToDo::getCreatedAt).reversed());
        return todos;
    }

    @Override
    public String deleteCategory(Long id) {
        Category category = categoryRepo.findById(id).orElseThrow(()->new CategoryNotFound("Category not found with "+ id));
        categoryRepo.deleteById(id);
        return "Successfully Deleted";
    }

    @Override
    public Category createCategory(CategoryDto category) {
        Category category1 = new Category();
        category1.setName(category.getCategoryName());
        category1.setUser(getAuthUser());
        return categoryRepo.save(category1);
    }


}
