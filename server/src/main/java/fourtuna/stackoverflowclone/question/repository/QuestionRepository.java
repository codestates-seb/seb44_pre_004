package fourtuna.stackoverflowclone.question.repository;

import fourtuna.stackoverflowclone.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
