package fourtuna.stackoverflowclone.question.dto;

import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.comment.dto.CommentDto;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class QuestionDto {
    private String title;
    private String content;
    private int answerCount;
    private int likeCount;
    private String writerName;
    private String writerImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static QuestionDto from(Question question) {
        return QuestionDto.builder()
                .title(question.getTitle())
                .content(question.getContent())
                .answerCount(question.getAnswers().size())
                .writerName(question.getMember().getName())
                .writerImageUrl(question.getMember().getImage())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt()).build();
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
