package com.james.api.article.service;


import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.board.model.Board;
import com.james.api.board.repository.BoardRepository;
import com.james.api.common.component.Messenger;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;
import com.james.api.user.model.User;
import com.james.api.user.repository.UserRepository;

import java.util.List;


public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {

    List<ArticleDto> getArticleByBoardId(Long id);
    Messenger save(ArticleDto dto);
    default Article dtoToEntity(ArticleDto dto, BoardRepository boardrepository, UserRepository userRepository){   //Dto를 Entity로 바꾸는 것

        return Article.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(userRepository.findById(dto.getBoard()).orElse(null))
                .board(boardrepository.findById(dto.getBoard()).orElse(null))
                .build();
    }

    default ArticleDto entityToDto(Article article){   // Entity를 Dto로 바꾸는 것
        return ArticleDto.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .writer(article.getWriter().getId())
                .board(article.getBoard().getId())
                .regDate(article.getRegDate().toString())
                .modDate(article.getModDate().toString())
                .build();
    }
}
