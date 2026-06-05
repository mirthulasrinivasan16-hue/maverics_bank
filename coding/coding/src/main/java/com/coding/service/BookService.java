package com.coding.service;

import com.coding.dto.BookDto;
import com.coding.mapper.BookMapper;
import com.coding.model.Book;
import com.coding.repository.BookRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public void addBook(@Valid int id, BookDto dto) {
       Book book= BookMapper.mapDtoToEntity(id,dto);
       bookRepository.save(book);
    }
}
