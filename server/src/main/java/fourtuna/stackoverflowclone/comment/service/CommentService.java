package fourtuna.stackoverflowclone.comment.service;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import fourtuna.stackoverflowclone.comment.dto.CreateComment;
import fourtuna.stackoverflowclone.comment.entity.Comment;
import fourtuna.stackoverflowclone.comment.repository.CommentRepository;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.COMMENT_NOT_FOUND;
import static fourtuna.stackoverflowclone.exception.ExceptionCode.UNMATCHED_WRITER;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;

    public Comment findComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(COMMENT_NOT_FOUND));
    }

    public CreateComment.Response createCommentForQuestion(CreateComment.Request request,
                                                           Long questionId,
                                                           String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = questionService.findQuestion(questionId);

        Comment comment = Comment.builder()
                .member(member)
                .question(question)
                .content(request.getContent()).build();

        return CreateComment.Response.from(commentRepository.save(comment));
    }

    public CreateComment.Response createCommentForAnswer(CreateComment.Request request,
                                                         Long answerId,
                                                         String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Answer answer = answerService.findAnswer(answerId);

        Comment comment = Comment.builder()
                .member(member)
                .answer(answer)
                .content(request.getContent()).build();

        return CreateComment.Response.from(commentRepository.save(comment));
    }

    private static void validateWriter(Comment comment, Member member) {
        if (member.getMemberId() != comment.getMember().getMemberId()) {
            throw new BusinessLogicException(UNMATCHED_WRITER);
        }
    }
}