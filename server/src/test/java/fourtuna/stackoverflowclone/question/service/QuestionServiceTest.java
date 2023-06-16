package fourtuna.stackoverflowclone.question.service;

import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.repository.MemberRepository;
import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;
    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private QuestionService questionService;


    @Test
    @DisplayName("질문 생성 성공")
    void createQuestion_SUCCESS() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com").build();

        Question question = Question.builder()
                .questionId(1L)
                .title("새로작성한글")
                .content("새로작성한 글입니다.")
                .member(member).build();

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.of(member));

        given(questionRepository.save(any()))
                .willReturn(question);

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        CreateQuestion.Request request = new CreateQuestion.Request("두번째새로작성한글", "두번째 새로작성한 글입니다.");

        // when
        CreateQuestion.Response response = questionService.createQuestion(request, "test2@test2.com");

        // then
        verify(questionRepository, times(1)).save(captor.capture());
        assertThat(captor.getValue().getTitle()).isEqualTo(request.getTitle());
        assertThat(captor.getValue().getContent()).isEqualTo(request.getBody());
        assertThat(response.getTitle()).isEqualTo(question.getTitle());
        assertThat(response.getBody()).isEqualTo(question.getContent());
    }

    @Test
    @DisplayName("질문 생성 실패 - 멤버가 존재하지 않는 경우")
    void createQuestion_FAIL_MemberNotFound() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com").build();

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.empty());

        CreateQuestion.Request request = new CreateQuestion.Request("두번째새로작성한글", "두번쨰 새로작성한 글입니다.");


        // when
        RuntimeException e = assertThrows(RuntimeException.class,
                () -> questionService.createQuestion(request, "test2@test2.com"));

        // then
        assertThat(e.getMessage()).isEqualTo("존재하지 않는 사용자입니다.");
    }

    @Test
    @DisplayName("질문 삭제 성공")
    void deleteQuestion_SUCCESS() {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com").build();

        Question question = Question.builder()
                .questionId(1L)
                .title("새로작성한글")
                .content("새로작성한 글입니다.")
                .member(member).build();

        given(questionRepository.findById(anyLong()))
                .willReturn(Optional.ofNullable(question));

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.ofNullable(member));

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        ArgumentCaptor<Long> captorLong = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> captorString = ArgumentCaptor.forClass(String.class);

        // when
        questionService.deleteQuestion(2L, "test2@test2.com");

        // then
        verify(questionRepository, times(1)).findById(captorLong.capture());
        verify(memberRepository, times(1)).findByEmail(captorString.capture());
        verify(questionRepository, times(1)).delete(captor.capture());
        assertThat(captorLong.getValue()).isEqualTo(2L);
        assertThat(captorString.getValue()).isEqualTo("test2@test2.com");
        assertThat(captor.getValue().getQuestionId()).isEqualTo(1L);
        assertThat(captor.getValue().getMember().getMemberId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("질문 삭제 실패 - 질문이 존재하지 않을 때")
    void deleteQuestion_FAIL_NotFoundQuestion() {
        // given
        given(questionRepository.findById(anyLong()))
                .willReturn(Optional.empty());

        // when
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> questionService.deleteQuestion(2L, "test2@test2.com"));

        // then
        assertThat(exception.getMessage()).isEqualTo("존재하지 않는 질문입니다.");
    }

    @Test
    @DisplayName("질문 삭제 실패 - 멤버가 존재하지 않을 때")
    void deleteQuestion_FAIL_NotFoundMember() {
        Question question = Question.builder()
                .questionId(1L)
                .title("새로작성한글")
                .content("새로작성한 글입니다.")
                .member(new Member()).build();

        // given
        given(questionRepository.findById(anyLong()))
                .willReturn(Optional.of(question));

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.empty());

        // when
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> questionService.deleteQuestion(2L, "test2@test2.com"));

        // then
        assertThat(exception.getMessage()).isEqualTo("존재하지 않는 사용자입니다.");
    }

    @Test
    @DisplayName("질문 삭제 실패 - 삭제 요청한 멤버와 질문 작성자가 다른 경우")
    void deleteQuestion_FAIL_UnMatchedMember() {
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com").build();

        Member member2 = Member.builder()
                .memberId(2L)
                .email("test@test.com").build();

        Question question = Question.builder()
                .questionId(1L)
                .title("새로작성한글")
                .content("새로작성한 글입니다.")
                .member(member2).build();

        // given
        given(questionRepository.findById(anyLong()))
                .willReturn(Optional.of(question));

        given(memberRepository.findByEmail(anyString()))
                .willReturn(Optional.of(member));

        // when
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> questionService.deleteQuestion(2L, "test2@test2.com"));

        // then
        assertThat(exception.getMessage()).isEqualTo("해당 질문의 작성자가 아닙니다.");
    }
}