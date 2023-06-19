package fourtuna.stackoverflowclone.comment.controller;

import fourtuna.stackoverflowclone.comment.dto.CreateComment;
import fourtuna.stackoverflowclone.comment.dto.UpdateComment;
import fourtuna.stackoverflowclone.comment.service.CommentService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/question/{questionId}/comment")
    public ResponseEntity<?> createCommentForQuestion(@RequestBody @Valid CreateComment.Request request,
                                                      @PathVariable Long questionId/*,
                                                      @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        CreateComment.Response response = commentService.createCommentForQuestion(request, questionId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PostMapping("/answer/{answerId}/comment")
    public ResponseEntity<?> createCommentForAnswer(@RequestBody @Valid CreateComment.Request request,
                                                    @PathVariable Long answerId/*,
                                                      @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        CreateComment.Response response = commentService.createCommentForAnswer(request, answerId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PatchMapping("/comment/{commentId}")
    public ResponseEntity<?> updateComment(@RequestBody @Valid UpdateComment.Request request,
                                           @PathVariable Long commentId/*,
                                           @RequestHeader("Authorization") String token*/) {

        // 토큰에서 유저정보 꺼내기
        // ex) String memberEmail  = tokenProvider.getAuthentication(token).getEmail();

        String memberEmail = "test@test.com";

        UpdateComment.Response response = commentService.updateComment(request, commentId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }
}
