package com.albertodumonttdev.devspecai.utils;

import com.albertodumonttdev.devspecai.dto.SpecRequestDTO;
import com.albertodumonttdev.devspecai.enums.Language;
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

        Language language = request.getLanguage();
        String translatedLevel = translateLevelToPortuguese(request.getProfessionalLevel());

        return String.format("""
            Você é um assistente que cria projetos para desenvolvedores com base em três informações: tecnologias a aplicar, nível profissional e objetivo profissional.

            Gere uma especificação de projeto no seguinte formato **em texto plano**, utilizando **\\n** para representar quebras de linha entre os blocos.

            **IMPORTANTE:** Se qualquer uma das informações fornecidas for irrelevante, sensível, ofensiva, mal-intencionada ou fora do escopo das três variáveis esperadas (tecnologias, nível profissional e objetivo profissional), então:
            - **Não gere nenhuma especificação**;
            - **Não produza nenhuma saída ou justificativa**;
            - **Retorne apenas a seguinte mensagem no idioma %s**: "Entrada inválida. Não foi possível gerar a especificação de projeto com base nos dados fornecidos."

            Formato desejado:

            %s\\n

            %s: [nome criativo e relevante]\\n
            %s: [curta descrição do sistema e do contexto]\\n
            %s: %s\\n
            %s:\\n
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
                language.getDisplayName(),
                language.formatIntroSentence(request.getCareerObjective()),
                language.getProjectNameLabel(),
                language.getDescriptionLabel(),
                language.getTechnologiesLabel(),
                request.getTechnologies(),
                language.getTechnicalObjectivesLabel(),
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
