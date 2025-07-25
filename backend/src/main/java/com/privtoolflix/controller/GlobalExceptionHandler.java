package com.privtoolflix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import com.privtoolflix.dto.Response;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response<Object>> handleIllegalArgument(IllegalArgumentException ex) {
        Response<Object> response = new Response<>(false, ex.getMessage(), null);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response<Object>> handleGeneralException(Exception ex) {
        Response<Object> response = new Response<>(false, "Erro interno: " + ex.getMessage(), null);
        return ResponseEntity.status(500).body(response);
    }
}
