package fourtuna.stackoverflowclone.question.service;

import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.repository.MemberRepository;
import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public CreateQuestion.Response createQuestion(CreateQuestion.Request request, String memberEmail) {
        // memberEmail 검증
        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

        Question question = Question.builder()
                .title(request.getTitle())
                .content(request.getBody())
                .member(member).build();

        return CreateQuestion.Response.from(questionRepository.save(question));
    }

    @Transactional
    public void deleteQuestion(Long questionId, String memberEmail) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 질문입니다."));

        Member member = memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

        // 해당 질문의 작성자인지 검증
        if (member.getMemberId() != question.getMember().getMemberId()) {
            throw new RuntimeException("해당 질문의 작성자가 아닙니다.");
        }

        questionRepository.delete(question);
    }
}
