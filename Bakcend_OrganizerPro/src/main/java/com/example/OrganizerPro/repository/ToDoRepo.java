package com.example.OrganizerPro.repository;

import com.example.OrganizerPro.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepo extends JpaRepository<ToDo,Long> {
}
