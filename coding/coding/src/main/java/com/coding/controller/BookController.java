package com.coding.controller;

import com.coding.dto.BookDto;
import com.coding.model.Book;
import com.coding.service.BookService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("/api/book/add")
    public void addBook(@Valid @PathVariable int authorid, @RequestBody BookDto dto){
        bookService.addBook(authorid,dto);
    }
}
