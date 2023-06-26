package fourtuna.stackoverflowclone.auth.controller;

import fourtuna.stackoverflowclone.auth.JwtTokenizer;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.net.MalformedURLException;

@Slf4j
@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class JwtController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> regenerateAccessToken(HttpServletResponse response,
                                                   @RequestHeader("Refresh") String refreshToken) {
        log.info("[JwtController] regenerateAccessToken called");
        jwtTokenizer.validateToken(refreshToken);
        String memberEmail = jwtTokenizer.getUsername(refreshToken);
        Member member = memberService.findMemberByEmail(memberEmail);
        String accessToken = jwtTokenizer.delegateAccessToken(member);

        response.setHeader("Authorization", accessToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/images/{imageFileName}")
    public Resource showImage(@PathVariable String imageFileName) throws MalformedURLException {
        return new UrlResource("file:" + System.getProperty("user.dir") + imageFileName);
    }
}
