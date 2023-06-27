package fourtuna.stackoverflowclone.like.service;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.answer.repository.AnswerRepository;
import fourtuna.stackoverflowclone.answer.service.AnswerService;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.exception.ExceptionCode;
import fourtuna.stackoverflowclone.like.dto.LikeDto;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.like.repository.LikeRepository;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.WRITER_IS_LIKER;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final AnswerRepository answerRepository;
    private final LikeRepository likeRepository;
    private final MemberService memberService;
    private final AnswerService answerService;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;


    @Transactional
    public LikeDto.LikeAnswerResponse createAnswerLike(Long answerId, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        if (answer.getMember().getMemberId() == member.getMemberId()) {
            throw new BusinessLogicException(WRITER_IS_LIKER);
        }

        Like existingLike = likeRepository.findByAnswerAnswerIdAndMemberEmail(answerId, member.getEmail());
        if (existingLike != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }

        Like like = Like.builder()
                .answer(answer)
                .member(member)
                .build();

        Like savedLike = likeRepository.save(like);

        return LikeDto.LikeAnswerResponse.from(savedLike);
    }


    @Transactional
    public LikeDto.LikeQuestionResponse createQuestionLike(Long questionId, String memberEmail) {

        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        if (question.getMember().getMemberId() == member.getMemberId()) {
            throw new BusinessLogicException(WRITER_IS_LIKER);
        }

        Like existingLike = likeRepository.findByQuestionQuestionIdAndMemberEmail(questionId, member.getEmail());
        if (existingLike != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }

        Like like = Like.builder()
                .question(question)
                .member(member)
                .build();

        Like savedLike = likeRepository.save(like);

        return LikeDto.LikeQuestionResponse.from(savedLike);
    }


    @Transactional
    public void deleteAnswerLike(Long answerId, String memberEmail) {
//        Member member = memberService.findMember(memberId);
//        Like like = findAnswerLike(likeId);
//        validateLiker(like, member);

        Like existingLike = likeRepository.findByAnswerAnswerIdAndMemberEmail(answerId, memberEmail);
        if (existingLike == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LIKED);
        }

        likeRepository.delete(existingLike);
    }

    @Transactional
    public void deleteQuestionLike(Long questionId, String memberEmail) {
//        Member member = memberService.findMemberByEmail(memberId);
//        Like like = findQuestionLike(likeId);
//        validateLiker(like, member);

        Like existingLike = likeRepository.findByQuestionQuestionIdAndMemberEmail(questionId, memberEmail);
        if (existingLike == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LIKED);
        }

        likeRepository.delete(existingLike);
    }



//    private static void validateLiker(Like like, Member member) {
//        if(member.getMemberId() != like.getMember().getMemberId()) {
//            throw new BusinessLogicException(UNMATCHED_LIKER);
//        }
//    }

//    private static void validateLiker(Answer answer, Member member) {
//
//        if(member.getMemberId() != Like.getMember().getMemberId()) {
//            throw new BusinessLogicException(UNMATCHED_LIKER);
//        }
//    }


    @Transactional
    public Like findAnswerLike(Long likeId) {
        Like findLike = likeRepository.findById(likeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));

        return findLike;
    }

    @Transactional
    public Like findQuestionLike(Long likeId) {
        Like findLike = likeRepository.findById(likeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));

        return findLike;
    }

//    @Transactional
//    public void deleteLike(Long likeId, String memberEmail) {
//    Member member = memberService.findMemberByEmail(memberEmail);
//    Like like = findLike(likeId);
////    Like like = likeRepository.findById(likeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));
//
//    validateLiker(like, member);
//    likeRepository.delete(like);
//    }

//    @Transactional
//    public Like findLike(Long likeId) {
//        Like findLike = likeRepository.findById(likeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));
//        return findLike;
//    }
}
