package com.james.api.article.service;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.article.repository.ArticleRepository;
import com.james.api.board.repository.BoardRepository;
import com.james.api.common.component.Messenger;
import com.james.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository repository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;


    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder()
                .message(repository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }
    @Transactional
    @Override
    public Messenger modify(ArticleDto articleDto) {
        repository.save(dtoToEntity(articleDto, boardRepository, userRepository));
        return Messenger.builder()
                .message("SUCCESS")
                .build();
    }


    @Override
    public List<ArticleDto> findAll() {
        return repository.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        return repository.findById(id).stream().map(i -> entityToDto(i)).findAny();
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
    public List<ArticleDto> getArticleByBoardId(Long boardId) {
        return repository.getArticleByBoardId(boardId)
                .stream().map(i -> entityToDto(i))
                .toList();
    }

    @Transactional
    @Override
    public Messenger save(ArticleDto dto) {
        Article article = repository.save(dtoToEntity(dto, boardRepository, userRepository));
        return Messenger.builder()
                .id(dto.getBoard())
                .message(article instanceof Article ? "SUCCESS" : "FAILURE")
                .build();
    }

}

