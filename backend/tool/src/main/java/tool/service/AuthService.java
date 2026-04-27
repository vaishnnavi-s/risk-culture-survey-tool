package tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import tool.dto.AuthRequest;
import tool.entity.User;
import tool.repository.UserRepository;
import tool.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(AuthRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        if (request.getPassword() == null) {
            throw new RuntimeException("Password cannot be null");
        }

        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("VIEWER");

        return userRepository.save(user);
    }
    // ✅ LOGIN
    public String login(AuthRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!encoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    // ✅ REFRESH TOKEN ⭐ (THIS FIXES YOUR ERROR)
    public String refreshToken(String token) {

        String email = jwtUtil.extractEmail(token);

        return jwtUtil.generateToken(email);
    }
}