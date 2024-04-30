package com.james.api.common.junit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ItemTest {

    @Test
    void print() {
        Item s = new Item();
        String s3 = s.print();
        System.out.println("-->"+s3);
        String s2 = "Hello";
        Assertions.assertEquals(s.print(), "Hello");
    }

    @Test
    void add() {
        Item s = new Item();
        int a = 1;
        int b = 1;
        Assertions.assertEquals(s.add(a,b), 2);
    }
}