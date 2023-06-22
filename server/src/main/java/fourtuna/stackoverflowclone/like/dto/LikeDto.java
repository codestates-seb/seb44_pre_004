package fourtuna.stackoverflowclone.like.dto;

import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class LikeDto {


    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class LikeAnswerResponse {
        private Long likeId;
        private Long answerId;
        private String email;

        public static LikeAnswerResponse from(Like like) {
            return new LikeAnswerResponse(like.getLikeId(), like.getAnswer().getAnswerId(), like.getMember().getEmail());
        }
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class LikeQuestionResponse {
        private Long likeId;
        private Long questionId;
        private String email;

        public static LikeQuestionResponse from(Like like) {
            return new LikeQuestionResponse(like.getLikeId(), like.getQuestion().getQuestionId(), like.getMember().getEmail());
        }
    }

}