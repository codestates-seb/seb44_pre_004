package fourtuna.stackoverflowclone.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.nio.channels.MulticastChannel;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MemberPatchDto {
    private long memberId;
    private String name;
    private String title;
    private String aboutMe;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
