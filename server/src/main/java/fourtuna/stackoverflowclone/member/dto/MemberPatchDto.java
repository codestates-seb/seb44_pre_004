package fourtuna.stackoverflowclone.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDto {
    private long memberId;
    private String name;
    private String image;
    private String title;
    private String aboutMe;
}
