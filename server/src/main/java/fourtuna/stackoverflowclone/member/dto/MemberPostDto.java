package fourtuna.stackoverflowclone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Builder
@AllArgsConstructor
@Getter
public class MemberPostDto {
    //유효성검증 필요
    private String email;
    private String name;
    private String password;
    @Nullable
    private String image;

    @Nullable
    private String title;

    @Nullable
    private String aboutMe;
}
