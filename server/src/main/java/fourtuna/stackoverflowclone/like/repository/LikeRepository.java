package fourtuna.stackoverflowclone.like.repository;

import fourtuna.stackoverflowclone.like.entitiy.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByAnswerAnswerIdAndMemberEmail(Long answerId, String Email);
    Like findByQuestionQuestionIdAndMemberEmail(Long questionId, String Email);

}