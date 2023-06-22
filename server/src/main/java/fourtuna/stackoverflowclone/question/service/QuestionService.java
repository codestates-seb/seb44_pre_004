package fourtuna.stackoverflowclone.question.service;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.dto.*;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public CreateQuestion.Response createQuestion(CreateQuestion.Request request, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);

        Question question = Question.builder()
                .title(request.getTitle())
                .content(request.getBody())
                .member(member).build();

        return CreateQuestion.Response.from(questionRepository.save(question));
    }

    @Transactional
    public void deleteQuestion(Long questionId, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = findQuestion(questionId);

        validateWriter(question, member);

        questionRepository.delete(question);
    }

    public Question findQuestion(Long questionId){
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(QUESTION_NOT_FOUND));
    }

    @Transactional
    public UpdateQuestion.Response updateQuestion(UpdateQuestion.Request request, Long questionId, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = findQuestion(questionId);

        validateWriter(question, member);

        Optional.ofNullable(request.getTitle())
                .ifPresent(title -> question.setTitle(title));
        Optional.ofNullable(request.getBody())
                .ifPresent(content -> question.setContent(content));

        return UpdateQuestion.Response.from(question);
    }

    public QuestionDetailDto getQuestion(Long questionId) {
        Question question = findQuestion(questionId);

        return QuestionDetailDto.from(question);
    }

    public GetQuestions.Response getQuestions(final Pageable pageable) {
        Page<Question> questions = questionRepository.findAllByOrderByCreatedAtDesc(pageable);
        Page<QuestionDto> questionDtos = questions.map(question -> QuestionDto.from(question));

        long totalQuestionCount = questionRepository.count();

        return GetQuestions.Response.from(questionDtos, totalQuestionCount);
    }

    // 해당 질문의 작성자인지 검증
    private static void validateWriter(Question question, Member member) {
        if (member.getMemberId() != question.getMember().getMemberId()) {
            throw new BusinessLogicException(UNMATCHED_WRITER);
        }
    }
}
