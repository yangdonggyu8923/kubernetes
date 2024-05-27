package com.lawmate.personalproject.common.security.model.service;
import com.lawmate.personalproject.common.component.Messenger;
import com.lawmate.personalproject.user.model.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    Messenger login(UserDto param);
    String createToken(UserDto user);
}