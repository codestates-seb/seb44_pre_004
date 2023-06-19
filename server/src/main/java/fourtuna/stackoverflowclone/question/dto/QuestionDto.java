package fourtuna.stackoverflowclone.question.dto;


import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.comment.dto.CommentDto;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private List<CommentDto> comments;
    private List<AnswerDto> answers;

    public static QuestionDto from(Question question) {
        List<AnswerDto> answers = question.getAnswers().stream()
                .map(answer -> AnswerDto.from(answer))
                .collect(Collectors.toList());

        List<CommentDto> comments = question.getComments().stream()
                .map(comment -> CommentDto.from(comment))
                .collect(Collectors.toList());

        return QuestionDto.builder()
                .title(question.getTitle())
                .content(question.getContent())
                .answerCount(question.getAnswers().size())
                .writerName(question.getMember().getName())
                .writerImageUrl(question.getMember().getImage())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .comments(comments)
                .answers(answers).build();
    }
}
