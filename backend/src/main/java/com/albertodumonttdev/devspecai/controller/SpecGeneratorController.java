package com.albertodumonttdev.devspecai.controller;

import com.albertodumonttdev.devspecai.dto.SpecRequestDTO;
import com.albertodumonttdev.devspecai.dto.SpecResponseDTO;
import com.albertodumonttdev.devspecai.service.SpecGeneratorService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/spec")
public class SpecGeneratorController {

    @Autowired
    private SpecGeneratorService service;

    @PostMapping
    public ResponseEntity<SpecResponseDTO> generateSpec(@Valid @RequestBody SpecRequestDTO request) {
        log.info("Spec generation requested: level={} technologies={}",
                request.getProfessionalLevel(),
                request.getTechnologies());

        SpecResponseDTO response = service.generateSpecification(request);

        log.debug("Spec generation completed successfully");
        return ResponseEntity.ok(response);
    }
}
