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
    private String content;

    public static CommentDto from(Comment comment) {
        return CommentDto.builder()
                .content(comment.getContent()).build();
    }
}
