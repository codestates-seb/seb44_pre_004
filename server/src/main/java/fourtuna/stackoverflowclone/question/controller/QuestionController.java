package fourtuna.stackoverflowclone.question.controller;

import fourtuna.stackoverflowclone.question.dto.*;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/qna/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // 응답데이터에 성공응답 실패응답 어떻게 처리할 것인지 예외는 어떤 형식으로 반환할 것인지
    @PostMapping
    public ResponseEntity<?> createQuestion(
            @RequestBody @Valid CreateQuestion.Request request/*,
            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        CreateQuestion.Response response = questionService.createQuestion(request, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId/*,
                                            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        questionService.deleteQuestion(questionId, memberEmail);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{questionId}")
    public ResponseEntity<?> updateQuestion(
            @PathVariable Long questionId,
            @RequestBody @Valid UpdateQuestion.Request request/*,
            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        UpdateQuestion.Response response = questionService.updateQuestion(request, questionId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestion(@PathVariable Long questionId/*,
            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();


        QuestionDetailDto response = questionService.getQuestion(questionId);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping
    public ResponseEntity<?> getQuestions(final Pageable pageable) {

        GetQuestions.Response response = questionService.getQuestions(pageable);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

}