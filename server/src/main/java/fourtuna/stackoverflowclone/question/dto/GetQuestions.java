package fourtuna.stackoverflowclone.question.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;


public class GetQuestions {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Page<QuestionDto> questions;
        private long totalQuestionCount;

        public static Response from(Page<QuestionDto> questions, long totalQuestionCount) {
            return Response.builder()
                    .questions(questions)
                    .totalQuestionCount(totalQuestionCount).build();
        }
    }
}
