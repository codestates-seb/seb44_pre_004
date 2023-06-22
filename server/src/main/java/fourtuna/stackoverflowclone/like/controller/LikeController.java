package fourtuna.stackoverflowclone.like.controller;

import fourtuna.stackoverflowclone.like.dto.LikeDto;
import fourtuna.stackoverflowclone.like.service.LikeService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;


@RestController
@RequestMapping("/qna")
@Validated
@Slf4j
public class LikeController {
    private final LikeService likeService;
    public LikeController(LikeService likeService) {

        this.likeService = likeService;
    }

    @PostMapping("/answer/{answerId}/like")
    public ResponseEntity<SingleResponseDto<LikeDto.LikeAnswerResponse>> createAnswerLike(@Positive @PathVariable("answerId") Long answerId,
                                                           @Valid @RequestBody LikeDto.LikeAnswerResponse request/*,
                                                           @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        LikeDto.LikeAnswerResponse response = likeService.createAnswerLike(answerId, request, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }


    @PostMapping("/question/{questionId}/like")
    public ResponseEntity<SingleResponseDto<LikeDto.LikeQuestionResponse>> createQuestionLike(@Positive @PathVariable("questionId") Long questionId,
                                                                   @Valid @RequestBody LikeDto.LikeQuestionResponse request/*,
                                     @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        LikeDto.LikeQuestionResponse response = likeService.createQuestionLike(questionId, request, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/like/{likeId}")
    public ResponseEntity<Void> deleteLike(@Positive @PathVariable("likeId") Long likeId/*, @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        likeService.deleteLike(likeId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}