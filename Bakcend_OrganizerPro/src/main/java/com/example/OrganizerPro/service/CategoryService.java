package com.example.OrganizerPro.service;


import com.example.OrganizerPro.entity.Category;
import com.example.OrganizerPro.dto.CategoryDto;
import com.example.OrganizerPro.entity.ToDo;

import java.util.*;

public interface CategoryService {
    List<ToDo>  getAllTodos(Long categoryId);

    String deleteCategory(Long id);

    Category createCategory(CategoryDto category);
}
