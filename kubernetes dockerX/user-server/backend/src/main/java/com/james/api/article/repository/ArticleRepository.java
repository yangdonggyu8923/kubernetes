package com.james.api.article.repository;
import com.james.api.article.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // jpql 디폴트방식
    @Query("select a from articles a where a.board.id = :board order by a.id desc")
    List<Article> getArticleByBoardId(@Param("board") Long board);

    //    Boolean existsByTitle(String title);
    // native 방식, 전달할 파람없이 단순히 정해진 무언가를 받아올때?
    @Query(value = "select * from articles a where a.board.id = :board",nativeQuery = true)
    List<Map<String,Object>> findQnaArticles();

    // jpsql return type dto
//    String articleDtoMapping = "new com.james.api.article.model.ArticleDto(" +
//            "a.id, a.title, a.content, a.writerId,a.boardId)";
//    @Query("select articleDtoMapping from articles a where a.board.id = :boardId")
//    List<ArticleDto> getArticleDTOByBoardId(@Param("boardId") Long boardId);

//    List<Article> findAllByOrderByArticles(Long id);


}
