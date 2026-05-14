package com.albertodumonttdev.devspecai.utils;

import com.albertodumonttdev.devspecai.dto.SpecRequestDTO;
import com.albertodumonttdev.devspecai.enums.ProfessionalLevel;

public class PromptUtil {

    /**
     * Builds a formatted prompt string to guide the AI assistant in generating a project specification.
     * <p>
     * The prompt is based on three user-provided inputs: technologies, professional level, and career objective.
     * It instructs the assistant to generate a plain-text specification with explicit "\\n" line breaks
     * and ignores irrelevant, sensitive, or malicious input.
     * </p>
     *
     * @param request The DTO containing user inputs such as technologies, professional level, and career objective.
     * @return A properly formatted string prompt to be used in a call to the AI assistant (e.g., Cohere).
     */
    public static String buildPrompt(SpecRequestDTO request) {

        String translatedLevel = translateLevelToPortuguese(request.getProfessionalLevel());

        return String.format("""
            Você é um assistente que cria projetos para desenvolvedores com base em três informações: tecnologias a aplicar, nível profissional e objetivo profissional.

            Gere uma especificação de projeto no seguinte formato **em texto plano**, utilizando **\\n** para representar quebras de linha entre os blocos.

            **IMPORTANTE:** Toda a especificação, incluindo rótulos e conteúdo, deve ser escrita no seguinte idioma: %s

            **IMPORTANTE:** Se qualquer uma das informações fornecidas for irrelevante, sensível, ofensiva, mal-intencionada ou fora do escopo das três variáveis esperadas (tecnologias, nível profissional e objetivo profissional), então:
            - **Não gere nenhuma especificação**;
            - **Não produza nenhuma saída ou justificativa**;
            - **Retorne apenas a seguinte mensagem no idioma %s**: "Entrada inválida. Não foi possível gerar a especificação de projeto com base nos dados fornecidos."

            Formato desejado:

            Com base nas tecnologias indicadas, no seu nível profissional atual e no seu objetivo de conquistar uma vaga como %s, o projeto ideal foi estruturado para refletir os conhecimentos exigidos e te preparar com uma experiência prática relevante...\\n

            Nome do projeto: [nome criativo e relevante]\\n
            Descrição: [curta descrição do sistema e do contexto]\\n
            Tecnologias: %s\\n
            Objetivos técnicos:\\n
            - [tarefa 1]\\n
            - [tarefa 2]\\n
            - [tarefa 3]\\n
            - [tarefa 4]\\n
            - [tarefa 5]\\n

            Use as seguintes informações para gerar a especificação:

            - Tecnologias: %s
            - Nível profissional: %s
            - Objetivo profissional: %s

            A resposta deve ser apenas o conteúdo do projeto com **quebras de linha explícitas via \\n**, sem explicações adicionais, sem código markdown e sem HTML.
            """,
                request.getLanguage(),
                request.getLanguage(),
                request.getCareerObjective(),
                request.getTechnologies(),
                request.getTechnologies(),
                translatedLevel,
                request.getCareerObjective()
        );
    }

    /**
     * Translates a given ProfessionalLevel enum value to its corresponding Portuguese label.
     *
     * @param level the ProfessionalLevel enum value to translate
     * @return the Portuguese representation of the professional level, e.g. "Júnior", "Pleno", or "Sênior"
     */
    public static String translateLevelToPortuguese(ProfessionalLevel level) {
        return switch (level) {
            case JUNIOR -> "Júnior";
            case MID -> "Pleno";
            case SENIOR -> "Sênior";
        };
    }
}
