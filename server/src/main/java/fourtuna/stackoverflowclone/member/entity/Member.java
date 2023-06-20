package fourtuna.stackoverflowclone.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;
    private String email;

    @Column(name = "username")
    private String name;
    private String password;

    @Column(name = "imageUri")
    private String image;
    private String title;
    private String aboutMe;

}
