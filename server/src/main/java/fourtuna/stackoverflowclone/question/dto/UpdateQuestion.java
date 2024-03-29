package fourtuna.stackoverflowclone.question.dto;


import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.*;

public class UpdateQuestion {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Request {
        private String title;
        private String content;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
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
