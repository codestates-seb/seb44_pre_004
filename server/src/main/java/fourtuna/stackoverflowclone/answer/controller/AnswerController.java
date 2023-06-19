package fourtuna.stackoverflowclone.answer.controller;


import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/qna")
@Validated
@Slf4j
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping("/question/{question-id}/answer")
    public ResponseEntity postAnswer(@Positive @PathVariable("question-id") Long questionId,
                                     @Valid @RequestBody AnswerDto.Post request/*,
                                     @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";


        AnswerDto.PostResponse response = answerService.createAnswer(questionId, request, memberEmail);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/answer/{answer-id}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch request/*,
                                     @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        AnswerDto.PatchResponse response = answerService.updateAnswer(answerId, request, memberEmail);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/answer/{answer-id}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answer-id") long answerId/*,
            @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        answerService.deleteAnswer(answerId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
