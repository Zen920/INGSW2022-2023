package ratatouille23.security;

import io.jsonwebtoken.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CookieValue;

import java.util.Date;


@Component
public class JwtTokenGenerator {
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenGenerator.class);
	@Value("${ratato.jwt.securityKey}")
	private String JWT_SECRET;
	@Value("${ratato.jwt.expiration}")
	private long expiration;

	@Value("${ratato.jwt.refreshExpiration}")
	private long refreshExpiration;

	private final String jwtCookie = "JwtCookie";
	public String generateToken(String username){
		return Jwts.builder()
				.setSubject(username)
				.setIssuer("Ratatouille")
				.setIssuedAt(new Date())
				.setExpiration( new Date(new Date().getTime() + expiration))
				.signWith(SignatureAlgorithm.HS512, JWT_SECRET)

				.compact();
	}

	public String generateRefreshToken(String username){
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration( new Date(new Date().getTime() + refreshExpiration))
				.signWith(SignatureAlgorithm.HS512, JWT_SECRET)
				.compact();
	}
	public String getJwtFromHttpOnlyCookie(@CookieValue(name = "accessToken") String cookieName, HttpServletRequest request){
		if(request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals(cookieName)) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	public String getUsernameFromToken (String token){
		Claims claims = Jwts.parser()
				.setSigningKey(JWT_SECRET)
				.parseClaimsJws(token)
				.getBody();
		return claims.getSubject();
	}

	public boolean validateToken (String token){
		try {
			Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JET token has expired {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}
}
