package com.albertodumonttdev.devspecai.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Language {

    @JsonProperty("pt-br")
    PT_BR(
            "Português",
            "Com base nas tecnologias indicadas, no seu nível profissional atual e no seu objetivo de conquistar uma vaga como %s, o projeto ideal foi estruturado para refletir os conhecimentos exigidos e te preparar com uma experiência prática relevante...",
            "Nome do projeto",
            "Descrição",
            "Tecnologias",
            "Objetivos técnicos"
    ),

    @JsonProperty("en")
    EN(
            "English",
            "Based on the indicated technologies, your current professional level, and your goal of landing a role as %s, the ideal project was structured to reflect the required knowledge and prepare you with relevant hands-on experience...",
            "Project name",
            "Description",
            "Technologies",
            "Technical objectives"
    ),

    @JsonProperty("es")
    ES(
            "Español",
            "Basado en las tecnologías indicadas, tu nivel profesional actual y tu objetivo de conseguir un puesto como %s, el proyecto ideal fue estructurado para reflejar los conocimientos requeridos y prepararte con experiencia práctica relevante...",
            "Nombre del proyecto",
            "Descripción",
            "Tecnologías",
            "Objetivos técnicos"
    );

    private final String displayName;
    private final String introSentence;
    private final String projectNameLabel;
    private final String descriptionLabel;
    private final String technologiesLabel;
    private final String technicalObjectivesLabel;

    Language(String displayName, String introSentence, String projectNameLabel,
             String descriptionLabel, String technologiesLabel, String technicalObjectivesLabel) {
        this.displayName = displayName;
        this.introSentence = introSentence;
        this.projectNameLabel = projectNameLabel;
        this.descriptionLabel = descriptionLabel;
        this.technologiesLabel = technologiesLabel;
        this.technicalObjectivesLabel = technicalObjectivesLabel;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String formatIntroSentence(String careerObjective) {
        return String.format(introSentence, careerObjective);
    }

    public String getProjectNameLabel() {
        return projectNameLabel;
    }

    public String getDescriptionLabel() {
        return descriptionLabel;
    }

    public String getTechnologiesLabel() {
        return technologiesLabel;
    }

    public String getTechnicalObjectivesLabel() {
        return technicalObjectivesLabel;
    }
}
