package com.james.api.board.model;

import com.james.api.article.model.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String content;
    private List<Article> article;
    private String regDate;
    private String modDate;
}
