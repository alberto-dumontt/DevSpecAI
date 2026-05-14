package com.albertodumonttdev.devspecai.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Language {

    @JsonProperty("pt-br")
    PT_BR("Português"),

    @JsonProperty("en")
    EN("English"),

    @JsonProperty("es")
    ES("Español");

    private final String displayName;

    Language(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
