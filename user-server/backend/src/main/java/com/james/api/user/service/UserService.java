package com.james.api.user.service;
import com.james.api.common.component.Messenger;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;
import com.james.api.user.model.User;
import com.james.api.user.model.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {

    // query
    List<?> findUsersByName(String name);
    List<?> findUsersByJob(String job);
    Optional<User> findUserByUsername(String username);
    Messenger modify(UserDto dto);
    Messenger login(UserDto param);
    Boolean existsByUsername(String username);
    Boolean logout(String accessToken);

    default User dtoToEntity(UserDto dto) {
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .job(dto.getJob())
                .build();
    }
    default UserDto entityToDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .phone(user.getPhone())
                .job(user.getJob())
                .regDate(user.getRegDate().toString())
                .modDate(user.getModDate().toString())
                .build();
    }
}
