package fourtuna.stackoverflowclone.answer.repository;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
