package fourtuna.stackoverflowclone.member.service;

import fourtuna.stackoverflowclone.auth.CustomAuthorityUtils;
import fourtuna.stackoverflowclone.exception.BusinessLogicException;
import fourtuna.stackoverflowclone.exception.ExceptionCode;
import fourtuna.stackoverflowclone.member.dto.MemberPatchDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import fourtuna.stackoverflowclone.config.SecurityConfiguration;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final SecurityConfiguration securityConfiguration;

    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         SecurityConfiguration securityConfiguration,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.securityConfiguration = securityConfiguration;
        this.authorityUtils = authorityUtils;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(MemberPatchDto member) {//(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        log.info("[MemberService] updateMember called1");
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getTitle())
                .ifPresent(title -> findMember.setTitle(title));
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(aboutMe -> findMember.setAboutMe(aboutMe));

        return memberRepository.save(findMember);
    }

    public Member write(Member member, MultipartFile file) throws IOException {
        log.info("[MemberService] write called");
        if (Objects.isNull(file)) {
            return member;
        }
        String projectPath = System.getProperty("user.dir") + "/images"; // project path

        UUID uuid = UUID.randomUUID(); // 식별자

        String fileName = uuid + "_" + file.getOriginalFilename();

        File saveFile = new File(projectPath, fileName); // 파일 생성
        file.transferTo(saveFile);
        String image = "/user/images/" + fileName;

        member.setImage(image);
        memberRepository.save(member);

        return member;
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public Member createMember(Member member) {
        verifyExistsMember(member.getEmail());
        member.setPassword(securityConfiguration.passwordEncoder().encode(member.getPassword()));
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        member.setImage("/user/images/default.jpg");

        return memberRepository.save(member);
    }

    public void verifyExistsMember(String email) {
        boolean exsist = memberRepository.findByEmail(email).isPresent();
        if (exsist) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;

    }
}

