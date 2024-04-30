package com.james.api.common.component;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Messenger {   // Vo가 붙으면 컴포넌트, 없으면 엔티티
    private String message;
    private int status;
    private String accessToken;
    private String refreshToken;
    private Long id;
}
