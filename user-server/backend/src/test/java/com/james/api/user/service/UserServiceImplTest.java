package com.james.api.user.service;

import com.james.api.common.component.Messenger;
import com.james.api.common.junit.Item;
import com.james.api.user.model.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
@Transactional
public class UserServiceImplTest {


    @Autowired
    private UserService service;

    @Test
    @DisplayName("회원수")
    void count() {
        Long totalUsers = service.count();
        assertThat(totalUsers).isEqualTo(20);
    }

    @Test
    @DisplayName("회원가입")
    void save() {
        UserDto t = new UserDto();
        Messenger m = service.save(t);
        assertThat(m.getMessage()).isEqualTo("SUCCESS");
    }

    @Test
    @DisplayName("회원삭제")
    void deleteById() {
        Long id = 0L;
        Messenger m = service.deleteById(id);
        assertThat(m.getMessage()).isEqualTo("SUCCESS");
    }

    @Test
    @DisplayName("회원정보수정")
    void modify() {
        UserDto t = new UserDto();
        Messenger m = service.modify(t);
        assertThat(m.getMessage()).isEqualTo("SUCCESS");
    }

    @Test
    @DisplayName("회원목록")
    void findAll() {
        System.out.println("회원목록 : " + service.findAll());
    }

    @Test
    @DisplayName("회원찾기")
    void findById() {
        Long id = 1L;
        System.out.println(id+"번 회원정보 : " + service.findById(id));
    }

    @Test
    void login() {
    }
}