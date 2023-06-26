package fourtuna.stackoverflowclone.answer.controller;


import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import fourtuna.stackoverflowclone.response.SingleResponseDto;


import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/qna")
@Validated
@Slf4j
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping("/question/{questionId}/answer")
    public ResponseEntity postAnswer(@Positive @PathVariable("questionId") Long questionId,
                                     @Valid @RequestBody AnswerDto.Post request/*,
                                     @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        AnswerDto.PostResponse response = answerService.createAnswer(questionId, request, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PatchMapping("/answer/{answerId}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answerId") Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch request/*,
                                     @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        AnswerDto.PatchResponse response = answerService.updateAnswer(answerId, request, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/answer/{answerId}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answerId") long answerId/*,
            @RequestHeader("Authorization") String token*/) {
        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        answerService.deleteAnswer(answerId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
