package fourtuna.stackoverflowclone.question.controller;

import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/qna/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // 응답데이터에 성공응답 실패응답 어떻게 처리할 것인지 예외는 어떤 형식으로 반환할 것인지
    @PostMapping
    public ResponseEntity<CreateQuestion.Response> createQuestion(
            @RequestBody @Valid CreateQuestion.Request request/*,
            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        CreateQuestion.Response response = questionService.createQuestion(request, memberEmail);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(
            @PathVariable Long questionId/*,
            @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";
        questionService.deleteQuestion(questionId, memberEmail);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
