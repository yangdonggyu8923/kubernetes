package com.james.api.user.model;

import com.james.api.article.model.Article;
import com.james.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
@ToString(exclude = {"article", "id"})
@Transactional
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String job;
    private String token;

    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL)
    private List<Article> article;


}