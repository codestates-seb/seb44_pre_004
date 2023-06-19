package fourtuna.stackoverflowclone.question.service;

import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.dto.QuestionDto;
import fourtuna.stackoverflowclone.question.dto.UpdateQuestion;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.QUESTION_NOT_FOUND;
import static fourtuna.stackoverflowclone.exception.ExceptionCode.UNMATCHED_WRITER;

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

    public QuestionDto getQuestion(Long questionId) {
        Question question = findQuestion(questionId);

        return QuestionDto.from(question);
    }

    // 해당 질문의 작성자인지 검증
    private static void validateWriter(Question question, Member member) {
        if (member.getMemberId() != question.getMember().getMemberId()) {
            throw new BusinessLogicException(UNMATCHED_WRITER);
        }
    }
}
