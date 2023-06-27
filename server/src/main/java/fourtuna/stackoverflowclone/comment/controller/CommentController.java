package fourtuna.stackoverflowclone.comment.controller;

import fourtuna.stackoverflowclone.auth.JwtTokenizer;
import fourtuna.stackoverflowclone.comment.dto.CreateComment;
import fourtuna.stackoverflowclone.comment.dto.UpdateComment;
import fourtuna.stackoverflowclone.comment.service.CommentService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/question/{questionId}/comment")
    public ResponseEntity<?> createCommentForQuestion(@RequestBody @Valid CreateComment.Request request,
                                                      @PathVariable Long questionId,
                                                      @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        CreateComment.Response response = commentService.createCommentForQuestion(request, questionId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PostMapping("/answer/{answerId}/comment")
    public ResponseEntity<?> createCommentForAnswer(@RequestBody @Valid CreateComment.Request request,
                                                    @PathVariable Long answerId,
                                                    @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        CreateComment.Response response = commentService.createCommentForAnswer(request, answerId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PatchMapping("/comment/{commentId}")
    public ResponseEntity<?> updateComment(@RequestBody @Valid UpdateComment.Request request,
                                           @PathVariable Long commentId,
                                           @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        UpdateComment.Response response = commentService.updateComment(request, commentId, memberEmail);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId,
                                           @RequestHeader("Authorization") String token) {

        String memberEmail = jwtTokenizer.getUsername(token);
        commentService.deleteComment(commentId, memberEmail);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
