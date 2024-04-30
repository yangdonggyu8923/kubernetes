package com.james.api.user.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class SubStringDemo {

    @Test
    public void 문자열_포함() throws Exception {

        String str = new StringBuilder()
                .append("d,e,f")
                .insert(0, "a,b,c,")
                .toString();


//        log.info("str : {}",str);
        System.out.print(str);


        String[] arr = str.split(",");
        assertThat(arr.length).isEqualTo(6);

    }

    @Test
    public void 주민번호로_성별_구분() throws Exception {
        String human1 = "970301-1";
        String human2 = "950101-2";
        String human3 = "020101-3";
        String human4 = "050101-4";
        //외국인
        String human5 = "730101-5";
        String human6 = "820101-6";
        String human7 = "120101-7";
        String human8 = "050101-8";
        String[] arr = {human1, human2, human3, human4, human5,human6,human7,human8};
        assertThat(getGender(human1)).isEqualTo("남자");

        int year = LocalDate.now().getYear();

        for (int i = 0; i < arr.length; i++) {
            int gender = Integer.parseInt(String.valueOf(arr[i].charAt(7)));
            int birth = Integer.parseInt(arr[i].substring(2, 6));
            int age = Integer.parseInt(arr[i].substring(0, 2));
            if (gender == 1 || gender == 3) {
                System.out.print(arr[i] + "의 성별은 남, ");
            } else if (gender == 2 || gender == 4) {
                System.out.print(arr[i] + "의 성별은 여, ");
            } else {
                System.out.print(arr[i] + "은 외국인, ");
            }

            if (age / 10 == 9) {
                age += 1900;
                System.out.println("나이는 " + (year - age));

            } else {
                age += 2000;
                System.out.println("나이는 " + (year - age));
            }

        }
    }

    private String getGender(String ssn) {
        return switch (ssn.charAt(7)) {
            case '1', '3', '5' -> "남자";
            case '2', '4', '6' -> "여자";
            default -> "Error";
        };
    }


    private void now() {
        LocalDate d = LocalDate.now();
        int year = d.getYear();
        assertThat(year).isEqualTo(2024);
        int month = d.getMonthValue();
        assertThat(month).isEqualTo(4);
        int day = d.getDayOfMonth();
        assertThat(day).isEqualTo(24);
    }

    @Test
    public void birthYear() {
        String ssn = "970301-1";
        int birthYear1 = Integer.parseInt(ssn.substring(0,2));
        var birthYear2 = switch (birthYear1/10) {
            case 0,1,2 -> birthYear1+2000;
            case 3,4,5,6,7,8,9 -> birthYear1+1900;
            default -> throw new IllegalStateException("Error");
        };
        assertThat(birthYear2).isEqualTo(1997);

        String ssn2 = "020101-4";
        int birthYear3 = Integer.parseInt(ssn2.substring(0,2));
        var birthYear4 = switch (birthYear3/10) {
            case 0,1,2 -> birthYear3+2000;
            case 3,4,5,6,7,8,9 -> birthYear3+ 1900;
            default -> throw new IllegalStateException("Error");
        };
        assertThat(birthYear4).isEqualTo(2002);
    }

    @Test
    public void getOldAge(){
        String ssn = "020101-4";
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();

        int birthYear = Integer.parseInt(ssn.substring(0,2));
        birthYear = switch (ssn.charAt(7)) {
            case '1','2','5','6' -> birthYear+1900;
            case '3','4','7','8' -> birthYear+2000;
            default -> birthYear+1800;
        };
        System.out.println(birthYear);
       int age = year-birthYear;
        System.out.println(age);
       assertThat(age).isEqualTo(22);

       int birthMonth = Integer.parseInt(ssn.substring(2,4));
       int birthDay = Integer.parseInt(ssn.substring(4,6));
       if(month > birthMonth){
           age--;
       }
       else if(month==birthMonth){
           if(day > birthDay || day == birthDay){
               age--;
           }
       }
        assertThat(age).isEqualTo(21);
    }

    @Test
    public void getAgeUsingLambda() {
        String ssn = "020101-4";
        int fullYear = Integer.parseInt(LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        Integer age = Stream.of(ssn)
                .map(i-> Integer.parseInt(i.substring(0,2)))
                .map(i-> switch (ssn.charAt(7)) {
                    case '1','2','5','6' -> i+1900;
                    case '3','4','7','8' -> i+2000;
                    default -> i+1800;})
                .map(i->i*10000)  // 20020000
                .map(i->i+Integer.parseInt(ssn.substring(2,6))) // 20020101
                .map(i->(fullYear-i)/10000) //22
                .findFirst()
                .get()
                ;
        System.out.println(age);
    }



}
