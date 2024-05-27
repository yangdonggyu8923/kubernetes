package com.lawmate.personalproject.lawyer.service;

import com.lawmate.personalproject.lawyer.model.Lawyer;
import com.lawmate.personalproject.lawyer.model.LawyerDto;

import java.io.IOException;
import java.util.List;

public interface LawyerService {

    List<Lawyer> save(List<Lawyer> lawyers) throws IOException;

    Long count();

    default Lawyer dtoToEntity(LawyerDto dto) {
        return Lawyer.builder()
                .id(dto.getId())
                .name(dto.getName())
                .subject(dto.getName())
                .build();
    }
    default LawyerDto entityToDto(Lawyer lawyer){
        return LawyerDto.builder()
                .id(lawyer.getId())
                .name(lawyer.getName())
                .subject(lawyer.getSubject())
                .build();
    }
}
