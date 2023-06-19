package fourtuna.stackoverflowclone.answer.service;

import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.answer.repository.AnswerRepository;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.exception.ExceptionCode;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.spel.ast.OpAnd;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.CANNOT_READ_QUESTION;
import static fourtuna.stackoverflowclone.exception.ExceptionCode.UNMATCHED_WRITER;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerRepository answerRepository;


    public AnswerDto.PostResponse createAnswer(Long questionId, AnswerDto.Post post, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = questionService.findQuestion(questionId);

        Answer answer = Answer.builder()
                .question(question)
                .content(post.getContent())
                .member(member)
                .build();

        Answer savedAnswer = answerRepository.save(answer);

        return AnswerDto.PostResponse.from(savedAnswer, question);
    }

    /** 답변 수정시 고려사항
     * 답변을 작성한 회원인가?
     * 질문에 대한 답변인가?
     */


    @Transactional
    public AnswerDto.PatchResponse updateAnswer(Long answerId, AnswerDto.Patch patch, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Answer answer = findAnswer(answerId);

        validateWriter(answer, member);

        Optional.ofNullable(patch.getContent())
                .ifPresent(content -> answer.setContent(content));

        return AnswerDto.PatchResponse.from(answer);
    }

    @Transactional
    public Answer findAnswer(Long answerId) {
        Answer findAnswer = answerRepository.findById(answerId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findAnswer;
    }


    //확인해야될 사항 1. 답변 삭제시, 답변을 등록한 회원이 맞는가?
    @Transactional
    public void deleteAnswer(Long answerId, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Answer answer = findAnswer(answerId);

        validateWriter(answer, member);
        answerRepository.delete(answer);
    }

    private static void validateWriter(Answer answer, Member member) {
        if (member.getMemberId() != answer.getMember().getMemberId()) {
            throw new BusinessLogicException(UNMATCHED_WRITER);
        }
    }
}
