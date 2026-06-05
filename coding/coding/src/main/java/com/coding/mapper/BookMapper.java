package com.coding.mapper;

import com.coding.dto.BookDto;
import com.coding.model.Book;
import jakarta.validation.Valid;

public class BookMapper {
    public static Book mapDtoToEntity(@Valid int id, BookDto dto) {
        Book book=new Book();
        book.setTitle(dto.title());
        book.setSummary(dto.summary());
        return book;
    }
}
