package fourtuna.stackoverflowclone.member.service;

import fourtuna.stackoverflowclone.config.SecurityConfiguration;
import fourtuna.stackoverflowclone.member.dto.MemberResponseDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final SecurityConfiguration securityConfiguration;

    public MemberService(MemberRepository memberRepository, SecurityConfiguration securityConfiguration) {
        this.memberRepository = memberRepository;
        this.securityConfiguration = securityConfiguration;
    }

    public Member createMember(Member member){
        verifyExistsMember(member.getEmail());
        member.setPassword(securityConfiguration.passwordEncoder().encode(member.getPassword()));
        member.setImage("classpath:/static/images");
        return memberRepository.save(member);
    }

    //email 존재 -> "이미 등로된 이메일입"
    public void verifyExistsMember(String email) {
        boolean exsist = memberRepository.findByEmail(email).isPresent();
        if(exsist == true) new RuntimeException("이미 등록된 이메일입니다.");  //다른방법있으면
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));
    }
}
