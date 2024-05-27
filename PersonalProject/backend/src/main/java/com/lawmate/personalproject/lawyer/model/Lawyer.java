package com.lawmate.personalproject.lawyer.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "lawyers")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString(exclude = {"id"})

public class Lawyer {

    @Id
    @Column(name = "lawyer_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String subject;


}
