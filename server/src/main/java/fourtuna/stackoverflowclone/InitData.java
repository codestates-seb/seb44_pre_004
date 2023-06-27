package fourtuna.stackoverflowclone;

import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import fourtuna.stackoverflowclone.comment.dto.CreateComment;
import fourtuna.stackoverflowclone.comment.service.CommentService;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.repository.MemberRepository;
import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class InitData {
    private final MemberRepository memberRepository;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final CommentService commentService;

    @PostConstruct
    public void start() {
        // 멤버등록
        Member member1 = Member.builder()
                .email("test@test.com")
                .password("test")
                .title("이명규소개")
                .name("이명규")
                .aboutMe("이명규입니다.")
                .build();

        Member member2 = Member.builder()
                .email("test1@test.com")
                .password("test")
                .title("안진수소개")
                .name("안진수")
                .aboutMe("안진수입니다.")
                .build();

        Member member3 = Member.builder()
                .email("test2@test.com")
                .password("test")
                .title("변상욱소개")
                .name("변상욱")
                .aboutMe("변상욱입니다.")
                .build();

        Member member4 = Member.builder()
                .email("test3@test.com")
                .password("test")
                .title("이지수소개")
                .name("이지수")
                .aboutMe("이지수입니다.")
                .build();

        Member member5 = Member.builder()
                .email("test4@test.com")
                .password("test")
                .title("호날두 소개")
                .name("호날두")
                .aboutMe("호날두입니다.")
                .build();

        member1 = memberRepository.save(member1);
        member2 = memberRepository.save(member2);
        member3 = memberRepository.save(member3);
        member4 = memberRepository.save(member4);
        member5 = memberRepository.save(member5);


        // 질문 생성
        CreateQuestion.Request request1 = new CreateQuestion.Request("제목1", "내용1");
        CreateQuestion.Request request2 = new CreateQuestion.Request("제목2", "내용2");
        CreateQuestion.Request request3 = new CreateQuestion.Request("제목3", "내용3");
        CreateQuestion.Request request4 = new CreateQuestion.Request("제목4", "내용4");
        CreateQuestion.Request request5 = new CreateQuestion.Request("제목5", "내용5");
        CreateQuestion.Request request6 = new CreateQuestion.Request("제목6", "내용6");
        CreateQuestion.Request request7 = new CreateQuestion.Request("다이어트는 힘들어", "고기를 간절히 먹고싶다.");
        CreateQuestion.Request request8 = new CreateQuestion.Request("공부", "공부싫어");
        CreateQuestion.Request request9 = new CreateQuestion.Request("백수란", "즐겁습니다.");
        CreateQuestion.Request request10 = new CreateQuestion.Request("제목이 없어 이제", "내용은 이겁니다.");


        Long questionId1 = questionService.createQuestion(request1, member1.getEmail()).getQuestionId();
        Long questionId2 = questionService.createQuestion(request2, member2.getEmail()).getQuestionId();
        Long questionId3 = questionService.createQuestion(request3, member2.getEmail()).getQuestionId();
        Long questionId4 = questionService.createQuestion(request4, member2.getEmail()).getQuestionId();
        Long questionId5 = questionService.createQuestion(request5, member3.getEmail()).getQuestionId();
        Long questionId6 = questionService.createQuestion(request6, member3.getEmail()).getQuestionId();
        Long questionId7 = questionService.createQuestion(request7, member4.getEmail()).getQuestionId();
        Long questionId8 = questionService.createQuestion(request8, member5.getEmail()).getQuestionId();
        Long questionId9 = questionService.createQuestion(request9, member5.getEmail()).getQuestionId();
        Long questionId10 = questionService.createQuestion(request10, member5.getEmail()).getQuestionId();


        // 답변 등록
        AnswerDto.Post answer0 = new AnswerDto.Post("답변1");
        AnswerDto.Post answer1 = new AnswerDto.Post("답변2");
        AnswerDto.Post answer2 = new AnswerDto.Post("답변3");
        AnswerDto.Post answer3 = new AnswerDto.Post("답변4");
        AnswerDto.Post answer4 = new AnswerDto.Post("답변5");
        AnswerDto.Post answer5 = new AnswerDto.Post("답변6");
        AnswerDto.Post answer6 = new AnswerDto.Post("답변7");
        AnswerDto.Post answer7 = new AnswerDto.Post("답변8");
        AnswerDto.Post answer8 = new AnswerDto.Post("답변9");
        AnswerDto.Post answer9 = new AnswerDto.Post("답변10");
        AnswerDto.Post answer10 = new AnswerDto.Post("답변11");
        AnswerDto.Post answer11 = new AnswerDto.Post("답변12");
        AnswerDto.Post answer12 = new AnswerDto.Post("답변13");
        AnswerDto.Post answer13 = new AnswerDto.Post("답변14");


        Long answerId1 = answerService.createAnswer(questionId1, answer0, member2.getEmail()).getAnswerId();
        Long answerId2 = answerService.createAnswer(questionId1, answer1, member3.getEmail()).getAnswerId();
        Long answerId3 = answerService.createAnswer(questionId2, answer2, member4.getEmail()).getAnswerId();
        Long answerId4 = answerService.createAnswer(questionId3, answer3, member5.getEmail()).getAnswerId();
        Long answerId5 = answerService.createAnswer(questionId4, answer4, member1.getEmail()).getAnswerId();
        Long answerId6 = answerService.createAnswer(questionId3, answer5, member1.getEmail()).getAnswerId();
        Long answerId7 = answerService.createAnswer(questionId1, answer6, member2.getEmail()).getAnswerId();
        Long answerId8 = answerService.createAnswer(questionId7, answer7, member1.getEmail()).getAnswerId();
        Long answerId9 = answerService.createAnswer(questionId8, answer8, member1.getEmail()).getAnswerId();
        Long answerId10 = answerService.createAnswer(questionId9, answer9, member1.getEmail()).getAnswerId();
        Long answerId11 = answerService.createAnswer(questionId2, answer10, member4.getEmail()).getAnswerId();
        Long answerId12 = answerService.createAnswer(questionId2, answer11, member3.getEmail()).getAnswerId();
        Long answerId13 = answerService.createAnswer(questionId4, answer12, member5.getEmail()).getAnswerId();
        Long answerId14 = answerService.createAnswer(questionId5, answer13, member1.getEmail()).getAnswerId();

        // 댓글 등록
        CreateComment.Request comment1 = new CreateComment.Request("댓글1");
        CreateComment.Request comment2 = new CreateComment.Request("댓글2");
        CreateComment.Request comment3 = new CreateComment.Request("댓글3");
        CreateComment.Request comment4 = new CreateComment.Request("댓글4");
        CreateComment.Request comment5 = new CreateComment.Request("댓글5");
        CreateComment.Request comment6 = new CreateComment.Request("댓글6");
        CreateComment.Request comment7 = new CreateComment.Request("댓글7");
        CreateComment.Request comment8 = new CreateComment.Request("댓글8");

        commentService.createCommentForQuestion(comment1, questionId1, member2.getEmail());
        commentService.createCommentForQuestion(comment2, questionId5, member5.getEmail());
        commentService.createCommentForQuestion(comment3, questionId2, member5.getEmail());
        commentService.createCommentForQuestion(comment4, questionId1, member4.getEmail());
        commentService.createCommentForAnswer(comment5, answerId10, member1.getEmail());
        commentService.createCommentForAnswer(comment6, answerId11, member2.getEmail());
        commentService.createCommentForAnswer(comment7, answerId7, member1.getEmail());
        commentService.createCommentForAnswer(comment8, answerId1, member3.getEmail());
    }
}
