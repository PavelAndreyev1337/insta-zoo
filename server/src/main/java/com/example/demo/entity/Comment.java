package com.example.demo.entity;

import javax.persistence.PrePersist;
import java.time.LocalDateTime;

public class Comment {

    private Long id;
    private Post post;
    private String username;
    private Long userId;
    private String message;
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

}
