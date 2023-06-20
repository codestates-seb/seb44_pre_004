package fourtuna.stackoverflowclone.answer.dto;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.comment.dto.CommentDto;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AnswerDto {
    private String content;
    private int likeCount;
    private String writerName;
    private String writerImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<CommentDto> comments;

    public static AnswerDto from(Answer answer) {
        List<CommentDto> comments = answer.getComments().stream()
                .map(comment -> CommentDto.from(comment))
                .collect(Collectors.toList());

        return AnswerDto.builder()
                .content(answer.getContent())
                .writerName(answer.getMember().getName())
                .writerImageUrl(answer.getMember().getImage())
                .createdAt(answer.getCreatedAt())
                .updatedAt(answer.getUpdatedAt())
                .comments(comments).build();
    }

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
