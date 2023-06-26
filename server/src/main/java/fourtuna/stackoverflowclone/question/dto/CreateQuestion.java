package fourtuna.stackoverflowclone.question.dto;


import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class CreateQuestion {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Request{
        @NotBlank // ""과 " " 모두 허용 x
        private String title;
        @NotBlank // ""과 " " 모두 허용 x
        private String content;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response{
        private Long questionId;
        private String title;
        private String content;

        public static Response from(Question question) {
            return Response.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent()).build();
        }
    }
}
