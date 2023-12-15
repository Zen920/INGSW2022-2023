package ratatouille23.security;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final JwtAuthEntryPoint authEntryPoint;

	@Autowired
	public SecurityConfig(JwtAuthEntryPoint authEntryPoint) {
		this.authEntryPoint = authEntryPoint;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors()
				.and()
				.csrf().disable()
				.exceptionHandling()
				.authenticationEntryPoint(authEntryPoint)
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				//.securityMatcher("/api/**")
				.authorizeRequests()
				.requestMatchers("/api/admin/**").hasRole("ADMIN")
				.requestMatchers("/api/health").permitAll()
				.requestMatchers("/api/auth/login", "/api/auth/validate", "/api/auth/refreshtoken", "/api/auth/signout", "/api/auth/employee-data").permitAll()
				.requestMatchers("/api/employee/waiter/**").hasRole("WAITER")
				.requestMatchers("/api/employee/cook/**").hasRole("COOK")
				.requestMatchers("/api/auth/register", "/api/roles").hasRole("SUPERVISOR")
				.requestMatchers("/api/transaction/**").permitAll()
				.requestMatchers("/api/auth/changepassword").authenticated()
				.anyRequest().authenticated()
				.and().formLogin().failureHandler(authenticationFailureHandler());

		//.requestMatchers("/api/auth/refreshtoken").authenticated()

		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	/*@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}*/

	// @Bean
	// CorsConfigurationSource corsConfigurationSource() {
	// 	CorsConfiguration configuration = new CorsConfiguration();
	// 	configuration.setAllowCredentials(true);
	// 	configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
	// 	configuration.setAllowedMethods(List.of("*"));
	// 	configuration.setAllowedHeaders(List.of("*"));
	// 	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	// 	source.registerCorsConfiguration("/**", configuration);
	// 	return source;
	// }

	// @Bean
	// CorsConfigurationSource corsConfigurationSource() {
	// 	CorsConfiguration configuration = new CorsConfiguration();
	// 	configuration.setAllowedOrigins(Arrays.asList("http://ratato-frontend:80", "http://localhost:80", "http://localhost:3000", "http://ratato-frontend:3000"));
	// 	configuration.setAllowedMethods(Arrays.asList("*"));
	// 	configuration.setAllowedHeaders(Arrays.asList("*"));
	// 	configuration.setAllowCredentials(true);
	// 	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	// 	source.registerCorsConfiguration("/**", configuration);
	// 	return source;
	// }

	@Bean
	public RoleHierarchy roleHierarchy() {
		RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
		String hierarchy = "ROLE_ADMIN > ROLE_SUPERVISOR\n ROLE_SUPERVISOR > ROLE_WAITER\n ROLE_SUPERVISOR > ROLE_COOK";
		roleHierarchy.setHierarchy(hierarchy);
		return roleHierarchy;
	}

	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler() {
		return new RestAuthenticationFailureHandler();
	}

	@Bean
	public DefaultWebSecurityExpressionHandler webSecurityExpressionHandler() {
		DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
		expressionHandler.setRoleHierarchy(roleHierarchy());
		return expressionHandler;
	}

	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}
}

