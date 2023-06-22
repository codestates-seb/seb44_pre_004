package fourtuna.stackoverflowclone.like.service;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.answer.repository.AnswerRepository;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.exception.ExceptionCode;
import fourtuna.stackoverflowclone.like.dto.LikeDto;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.like.repository.LikeRepository;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.question.entity.Question;
import fourtuna.stackoverflowclone.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.namespace.QName;

import static fourtuna.stackoverflowclone.exception.ExceptionCode.*;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final AnswerRepository answerRepository;
    private final LikeRepository likeRepository;
    private final MemberService memberService;

    private final QuestionRepository questionRepository;


    @Transactional
    public LikeDto.LikeAnswerResponse createAnswerLike(Long answerId, LikeDto.LikeAnswerResponse post, String memberEmail) {
        Member member = memberService.findMemberByEmail(memberEmail);
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

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
    public LikeDto.LikeQuestionResponse createQuestionLike(Long questionId, LikeDto.LikeQuestionResponse post, String memberEmail) {

        Member member = memberService.findMemberByEmail(memberEmail);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

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
    public void deleteLike(Long likeId, String memberEmail) {
    Member member = memberService.findMemberByEmail(memberEmail);
    Like like = findLike(likeId);
//    Like like = likeRepository.findById(likeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));

    validateLiker(like, member);
    likeRepository.delete(like);
    }

    private static void validateLiker(Like Like, Member member) {
        if(member.getMemberId() != Like.getMember().getMemberId()) {
            throw new BusinessLogicException(UNMATCHED_LIKER);
        }
    }

    @Transactional
    public Like findLike(Long likeId) {
        Like findLike = likeRepository.findById(likeId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_LIKED));
        return findLike;
    }
}
