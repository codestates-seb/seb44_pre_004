package fourtuna.stackoverflowclone.comment.dto;


import fourtuna.stackoverflowclone.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class CommentDto {
    private Long commentId;
    private String content;
    private String createdAt;
    private String writerName;

    public static CommentDto from(Comment comment) {
        return CommentDto.builder()
                .writerName(comment.getMember().getName())
                .createdAt(comment.getCreatedAt().toString())
                .content(comment.getContent()).build();
    }
}
