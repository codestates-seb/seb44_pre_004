package fourtuna.stackoverflowclone.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
public class Member {
    @Id
    private long memberId;
    private String email;
    private String name;
    private String password;
    private String image;
    private String title;
    private String aboutMe;

}
