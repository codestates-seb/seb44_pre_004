package fourtuna.stackoverflowclone.comment.dto;

import fourtuna.stackoverflowclone.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UpdateComment {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Request {
        private String content;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response{
        private Long commentId;
        private String content;

        public static Response from(Comment comment) {
            return Response.builder()
                    .commentId(comment.getCommentId())
                    .content(comment.getContent()).build();
        }
    }
}
