package com.james.api.common.lambda;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamOf {

    @Test
    public void testSave(){
        int arr[] = { 1, 2, 3, 4, 5 };
        System.out.println("--Array.Stream(arr)--");
        IntStream intStream = Arrays.stream(arr);
        intStream.forEach(str -> System.out.print(str + " "));
        System.out.println("\n--Stream.of(arr)--");
        Stream<int[]> stream = Stream.of(arr);
        stream.forEach(str -> System.out.print(str + " "));
    }
    @Test
    public void testDifferent(){
        int arr[] = { 1, 2, 3, 4, 5 };
        System.out.println("\n--Array.Stream(arr)--");
        IntStream intStream = Arrays.stream(arr);
        intStream.forEach(str -> System.out.print(str + " "));
        System.out.println("\n--Stream.of(arr)--");
        Stream<int[]> stream = Stream.of(arr);
        IntStream intStreamNew = stream.flatMapToInt(Arrays::stream);
        intStreamNew.forEach(str -> System.out.print(str + " "));
    }

}


