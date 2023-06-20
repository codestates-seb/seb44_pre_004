package fourtuna.stackoverflowclone.member.repository;

import fourtuna.stackoverflowclone.member.entity.Member;
<<<<<<< HEAD

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
=======
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

>>>>>>> 8633a62902a370eb079806ad37de11817554cdf0
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}
