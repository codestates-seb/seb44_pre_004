package fourtuna.stackoverflowclone.member.entity;

import fourtuna.stackoverflowclone.audit.Auditable;
import lombok.*;

import javax.persistence.*;

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

    @Column(nullable = false, unique = true, updatable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;

    @Column(name = "imageUrl")
    private String image;
    @Column
    private String title;
    @Column
    private String aboutMe;
}
