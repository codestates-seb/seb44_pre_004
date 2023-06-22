package fourtuna.stackoverflowclone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Builder
@AllArgsConstructor
@Getter
public class MemberPostDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String password;
    @Nullable
    private String image;
    @Nullable
    private String title;
    @Nullable
    private String aboutMe;
}
