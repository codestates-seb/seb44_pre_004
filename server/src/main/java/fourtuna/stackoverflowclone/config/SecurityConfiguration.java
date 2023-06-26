package fourtuna.stackoverflowclone.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import fourtuna.stackoverflowclone.audit.filter.JwtVerificationFilter;
import fourtuna.stackoverflowclone.auth.CustomAuthorityUtils;
import fourtuna.stackoverflowclone.auth.JwtAuthenticationFilter;
import fourtuna.stackoverflowclone.auth.JwtTokenizer;
import fourtuna.stackoverflowclone.auth.handler.MemberAuthenticationFailureHandler;
import fourtuna.stackoverflowclone.auth.handler.MemberAuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import org.springframework.http.HttpMethod;


@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .antMatchers(HttpMethod.POST, "/token").permitAll()
                                .antMatchers(HttpMethod.POST, "/*/user/**").permitAll()
                                .antMatchers(HttpMethod.GET, "/*/user/**").permitAll()
                                .antMatchers(HttpMethod.POST, "/*/qna/**").authenticated()
                                .antMatchers(HttpMethod.GET, "/*/qna/**").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/**").authenticated()
                                .antMatchers(HttpMethod.DELETE, "/**").authenticated()

                        //user role에 따른 권한부여X
                        //.antMatchers(HttpMethod.PATCH, "/*/user/**").hasRole("USER")

                        //.antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.GET, "/*/user/**").hasAnyRole("USER", "ADMIN")


                        //.anyRequest().permitAll()
                        //.anyRequest().authenticated()

                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("OPTIONS", "GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Access-Control-Allow-Headers", "Refresh"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, new ObjectMapper());

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
