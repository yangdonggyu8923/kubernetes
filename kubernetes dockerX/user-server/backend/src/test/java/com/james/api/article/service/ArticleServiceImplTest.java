//package com.james.api.article.service;
//
//
//import com.james.api.article.model.Article;
//import com.james.api.article.model.ArticleDto;
//import com.james.api.article.repository.ArticleRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.BDDMockito;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.Arrays;
//import java.util.List;
//
//@SpringBootTest
//@ExtendWith(MockitoExtension.class)
//@TestPropertySource(locations = "classpath:junit-platform.yml")
//public class ArticleServiceImplTest {
//    private static Article testArticle;
//    private ArticleService service;
//    @Mock
//    private ArticleRepository repository;
//    @BeforeEach
//    void setup() {
//        this.service = new ArticleServiceImpl(repository);
//    }
//
////    @BeforeEach
////    void init() {
////        testArticle = Article.of("테스트 제목", "테스트 내용");
////    }
//
//    @Test
//    public void 게시글_제목_검색() throws Exception {
//        // Given 주어지는 조건이
//        repository.save(testArticle);
//
//        // When
//        Article article = repository.findById(1L).get();
//
//        // Then
//        assertThat(article.getTitle())
//                .isEqualTo("테스트 제목");
//    }
//
//    @Test
//    public void 게시글_전체_검색() throws Exception {
//        List<Article> articles = getList();
//        BDDMockito.given(repository.findAll()).willReturn(articles);
//        List<ArticleDto> list = service.findAll();
//        assertThat(list.size())
//                .isEqualTo(3);
//    }
//
//    private List<Article> getList() {
//        return Arrays.asList(
//                Article.builder().id(1L).title("유관순").content("유관순은 3.1운동의 주역이다").build(),
//                Article.builder().id(2L).title("김구").content("임시정부 주역이다.").build(),
//                Article.builder().id(3L).title("윤봉길").content("독립운동가이다.").build()
//        );
//    }
//}
