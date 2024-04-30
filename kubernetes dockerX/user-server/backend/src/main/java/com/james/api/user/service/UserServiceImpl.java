package com.james.api.user.service;

import com.james.api.common.component.security.JwtProvider;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.User;
import com.james.api.user.model.UserDto;
import com.james.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Log4j2
@Service // application context
@RequiredArgsConstructor // lombok
public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    private final JwtProvider jwtProvider;


    @Override // jdk
    public Messenger save(UserDto t) {
        entityToDto(repository.save(dtoToEntity(t)));
        return Messenger.builder().message("SUCCESS").build();
    }

    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder()
                .message(repository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }
    @Transactional
    @Override
    public Messenger modify(UserDto user) {
        repository.save(dtoToEntity(user));
        return Messenger.builder()
                .message("SUCCESS")
                .build();
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).stream().map(i->entityToDto(i)).findAny();
    }

    @Override
    public Long count() {
        return repository.count();
    }

    @Override
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public List<?> findUsersByName(String name) {
        return null;
    }

    @Override
    public List<?> findUsersByJob(String job) {
        return null;
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findByUsername(username);
    }


    // SRP에 따라 아이디 존재여부를 프론트에서 먼저 판단하고 넘어옴 (시큐리티)
    @Transactional
    @Override
    public Messenger login(UserDto param) {
        log.info("로그인 서비스로 들어온 파라미터 : " + param);
        User user = repository.findByUsername(param.getUsername()).get();
        String accessToken = jwtProvider.createToken(entityToDto(user));
        boolean flag = user.getPassword().equals(param.getPassword());
        repository.modifyTokenById(user.getId(), accessToken);

        // 토큰을 각 섹션(Header, Payload, Signature)으로 분할
        jwtProvider.printPayload(accessToken);

        return Messenger.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "NONE")
                .build();
    }



    @Override
    public Boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    @Transactional
    @Override
    public Boolean logout(String accessToken) {
        Long id = 1L;
        String deletedToken = "";
        repository.modifyTokenById(id, deletedToken);
        return repository.findById(id).get().getToken().equals(deletedToken);
    }


}
