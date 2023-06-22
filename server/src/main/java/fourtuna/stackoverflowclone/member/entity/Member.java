package fourtuna.stackoverflowclone.member.entity;

import fourtuna.stackoverflowclone.audit.Auditable;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long memberId;

    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;
    private String image;
    private String title;
    private String aboutMe;

//    @Builder.Default
//    @OneToMany(mappedBy = "member")
//    private Set<Like> likes = new HashSet<>();
}
