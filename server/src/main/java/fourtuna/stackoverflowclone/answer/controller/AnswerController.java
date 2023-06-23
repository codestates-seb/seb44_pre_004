package fourtuna.stackoverflowclone.answer.controller;


import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import fourtuna.stackoverflowclone.auth.JwtTokenizer;
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
    private final JwtTokenizer jwtTokenizer;

    public AnswerController(AnswerService answerService, JwtTokenizer jwtTokenizer) {
        this.answerService = answerService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/question/{questionId}/answer")
    public ResponseEntity postAnswer(@Positive @PathVariable("questionId") Long questionId,
                                     @Valid @RequestBody AnswerDto.Post request,
                                     @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        AnswerDto.PostResponse response = answerService.createAnswer(questionId, request, memberEmail);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PatchMapping("/answer/{answerId}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answerId") Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch request,
                                      @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        AnswerDto.PatchResponse response = answerService.updateAnswer(answerId, request, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/answer/{answerId}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answerId") long answerId,
                                       @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        answerService.deleteAnswer(answerId, memberEmail);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
