package com.example.OrganizerPro.dto;

import com.example.OrganizerPro.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ToDoDto {
    private String description;
    private Boolean completed;
    private Long categoryId;
}
