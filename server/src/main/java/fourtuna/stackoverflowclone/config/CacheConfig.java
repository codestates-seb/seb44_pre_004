package fourtuna.stackoverflowclone.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@RequiredArgsConstructor
public class CacheConfig {
    @Value("${spring.redis.cache.host}")
    private String cacheHost;

    @Value("${spring.redis.cache.port}")
    private int cachePort;

    @Bean
    public CacheManager redisCacheManager(@Qualifier("redisCacheConnectionFactory") RedisConnectionFactory redisCacheConnectionFactory) {
        RedisCacheConfiguration conf = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(
                        new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(
                        new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisCacheConnectionFactory)
                .cacheDefaults(conf)
                .build();
    }

    @Bean
    public RedisConnectionFactory redisCacheConnectionFactory() {
        return new LettuceConnectionFactory(new RedisStandaloneConfiguration(cacheHost, cachePort));
    }
}
