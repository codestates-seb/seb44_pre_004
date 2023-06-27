package fourtuna.stackoverflowclone.question.controller;

import fourtuna.stackoverflowclone.auth.JwtTokenizer;
import fourtuna.stackoverflowclone.question.dto.*;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/qna/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody @Valid CreateQuestion.Request request,
                                            @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        CreateQuestion.Response response = questionService.createQuestion(request, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId,
                                            @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        questionService.deleteQuestion(questionId, memberEmail);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{questionId}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long questionId,
                                            @RequestBody @Valid UpdateQuestion.Request request,
                                            @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        UpdateQuestion.Response response = questionService.updateQuestion(request, questionId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestion(@PathVariable Long questionId,
                                         @RequestHeader(value = "Authorization", required = false) String token) {

        log.info("[QuestionController] getQuestion called");
        log.info("token = {}", token);

        String memberEmail = null;
        if (jwtTokenizer.validateToken(token)) {
            memberEmail = jwtTokenizer.getUsername(token);
        }
        log.info("memberEmail = {}", memberEmail);

        QuestionDetailDto response = questionService.getQuestion(questionId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping
    public ResponseEntity<?> getQuestions(final Pageable pageable) {

        GetQuestions.Response response = questionService.getQuestions(pageable);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

}