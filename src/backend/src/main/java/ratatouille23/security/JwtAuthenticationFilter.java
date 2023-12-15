package ratatouille23.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ratatouille23.service.EmployeeService;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	// Check if there is a token in the header
	@Autowired
	private JwtTokenGenerator jwtTokenGenerator;
	@Autowired
	private EmployeeService EmployeeService;

	private final static String AUTH_HEADER = "Authorization";
	private final static String REFRESH_HEADER = "Refresh";


	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain)
			throws ServletException, IOException {
		String cookieAccessToken = jwtTokenGenerator.getJwtFromHttpOnlyCookie("accessToken", request);

		if (request.getRequestURL().toString().contains("auth/login") || request.getRequestURL().toString().contains("auth/refreshtoken"))
			cookieAccessToken = null;
		validateAndAuthorizaUser(cookieAccessToken, request);
		filterChain.doFilter(request, response);
	}

	public String getJwtFromHttpRequest(HttpServletRequest request, String header) {
		String bearerToken = request.getHeader(header);
		// Get the token with string.utils
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}


	public void allowRefreshToken(HttpServletRequest request, ExpiredJwtException ex) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				null, null, null
		);
		SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
		request.setAttribute("claims", ex.getClaims());
	}

	public void validateAndAuthorizaUser(String token, HttpServletRequest request) {
		if (StringUtils.hasText(token) && jwtTokenGenerator.validateToken(token)) { // Check if token is valid
			String username = jwtTokenGenerator.getUsernameFromToken(token);

			UserDetails userDetails
					= EmployeeService.loadUserByUsername(username);
			UsernamePasswordAuthenticationToken authenticationToken
					= new UsernamePasswordAuthenticationToken(userDetails,
					null,
					userDetails.getAuthorities());
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		}
	}
}
