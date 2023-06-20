package fourtuna.stackoverflowclone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

//    @Bean
//    public UserDetailsManager userDetailsService() {
//        return new InMemoryUserDetailsManager();
//    }
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .headers().frameOptions().sameOrigin()
            .and()
            .csrf().disable();

    return http.build();
}

    @Bean
    public PasswordEncoder passwordEncoder()  {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
