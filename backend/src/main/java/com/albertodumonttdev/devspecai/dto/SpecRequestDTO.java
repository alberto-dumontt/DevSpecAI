package com.albertodumonttdev.devspecai.dto;

import com.albertodumonttdev.devspecai.enums.ProfessionalLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SpecRequestDTO {

    @NotBlank(message = "Technologies cannot be blank")
    private String technologies;

    @NotNull(message = "Professional level is required")
    private ProfessionalLevel professionalLevel;

    @NotBlank(message = "Career objective cannot be blank")
    private String careerObjective;

    @NotBlank(message = "Language cannot be blank")
    private String language;
}
