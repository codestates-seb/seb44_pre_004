package fourtuna.stackoverflowclone.like.controller;

import fourtuna.stackoverflowclone.auth.JwtTokenizer;
import fourtuna.stackoverflowclone.like.dto.LikeDto;
import fourtuna.stackoverflowclone.like.service.LikeService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;


@RestController
@RequestMapping("/qna")
@Validated
@Slf4j
public class LikeController {
    private final LikeService likeService;
    private final JwtTokenizer jwtTokenizer;

    public LikeController(LikeService likeService, JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
        this.likeService = likeService;
    }

    @PostMapping("/answer/{answerId}/like")
    public ResponseEntity<?> createAnswerLike(@Positive @PathVariable("answerId") Long answerId,
                                              @RequestHeader("Authorization") String token) {
        String memberEmail = jwtTokenizer.getUsername(token);

        LikeDto.LikeAnswerResponse response = likeService.createAnswerLike(answerId, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PostMapping("/question/{questionId}/like")
    public ResponseEntity<?> createQuestionLike(@Positive @PathVariable("questionId") Long questionId,
                                                @RequestHeader("Authorization") String token) {
        String memberEmail = jwtTokenizer.getUsername(token);

        LikeDto.LikeQuestionResponse response = likeService.createQuestionLike(questionId, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/answer/{answerId}/like")
    public ResponseEntity<Void> deleteAnswerLike(@Positive @PathVariable("answerId") Long answerId,
                                                 @RequestHeader("Authorization") String token) {
        log.info("[LikeController] deleteAnswerLike called");
        String memberEmail = jwtTokenizer.getUsername(token);

        likeService.deleteAnswerLike(answerId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/question/{questionId}/like")
    public ResponseEntity<Void> deleteQuestionLike(@Positive @PathVariable("questionId") Long questionId,
                                                   @RequestHeader("Authorization") String token) {
        String memberEmail = jwtTokenizer.getUsername(token);

        likeService.deleteQuestionLike(questionId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}