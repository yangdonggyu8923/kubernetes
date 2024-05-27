package com.lawmate.personalproject.lawyer.service;

import com.lawmate.personalproject.lawyer.model.Lawyer;
import com.lawmate.personalproject.lawyer.model.LawyerDto;
import com.lawmate.personalproject.lawyer.repository.LawyerRepository;
import com.lawmate.personalproject.user.model.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
@Slf4j
public class LawyerServiceImpl implements LawyerService {
    private final LawyerRepository repository;

    public List<LawyerDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }
    @Override
    public List<Lawyer> save(List<Lawyer> lawyers) throws IOException {
        List<Lawyer> ls = new ArrayList<>();
        for (int page = 1; page <= 10; page++) {
            Document doc = Jsoup.connect("https://www.koreanbar.or.kr/pages/search/search1.asp?sido1=&gun1=&dong1=&special1_1=&special1=1&searchtype=mname&searchstr=&page=" + page).timeout(10 * 1000).get();
            Elements elems = doc.select("div.board_listW");
            Iterator<Element> name = elems.iterator();
            Iterator<Element> subject = elems.select("td.subject").iterator();

            while (name.hasNext() && subject.hasNext()) {
                String nameS = name.next().selectFirst("a").text();
                String subjectS = subject.next().text();
                String subjectSS = subjectS.replaceAll("\\(.*?\\)", "");

                Lawyer lawyer = Lawyer.builder()
                        .name(nameS)
                        .subject(subjectSS)
                        .build();
                ls.add(lawyer);

                System.out.println("이름: " + nameS);
                System.out.println("전문 분야: " + subjectSS);
                System.out.println("----------");
            }

            repository.saveAll(ls);
        }
        return ls;
    }

    @Override
    public Long count() {
        return repository.count();
    }
}
