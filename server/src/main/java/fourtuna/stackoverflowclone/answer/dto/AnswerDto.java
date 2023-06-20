package fourtuna.stackoverflowclone.answer.dto;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class AnswerDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        private String content;

    }
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Patch {
        private long answerId;
        private long questionId;
        @NotBlank
        private String content;

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class PostResponse {

        private Long questionId;
        private Long answerId;
        private String content;

        public static PostResponse from(Answer answer, Question question) {
            return PostResponse.builder()
                    .questionId(question.getQuestionId())
                    .answerId(answer.getAnswerId())
                    .content(answer.getContent()).build();
        }

    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class PatchResponse {
        private Long answerId;
        private String content;

        public static PatchResponse from(Answer answer) {
            return PatchResponse.builder()
                    .answerId(answer.getAnswerId())
                    .content(answer.getContent()).build();
        }

    }
}
