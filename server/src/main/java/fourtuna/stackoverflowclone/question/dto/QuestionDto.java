package fourtuna.stackoverflowclone.question.dto;

import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class QuestionDto {
    private Long questionId;
    private String title;
    private String content;
    private int answerCount;
    private int likeCount;
    private String writerName;
    private String writerImageUrl;
    private String createdAt;
    private String updatedAt;

    public static QuestionDto from(Question question) {
        return QuestionDto.builder()
                .questionId(question.getQuestionId())
                .title(question.getTitle())
                .content(question.getContent())
                .answerCount(question.getAnswers().size())
                .writerName(question.getMember().getName())
                .writerImageUrl(question.getMember().getImage())
                .createdAt(question.getCreatedAt().toString())
                .updatedAt(question.getUpdatedAt().toString()).build();
    }


    //like 기능 추가
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Like {
        @NotNull
        private Long questionId;
    }
}
