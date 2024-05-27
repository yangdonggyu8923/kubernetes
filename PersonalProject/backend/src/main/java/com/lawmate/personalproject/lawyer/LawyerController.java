package com.lawmate.personalproject.lawyer;
import com.lawmate.personalproject.common.component.PageRequestVo;
import com.lawmate.personalproject.lawyer.model.Lawyer;
import com.lawmate.personalproject.lawyer.model.LawyerDto;
import com.lawmate.personalproject.lawyer.service.LawyerServiceImpl;
import com.lawmate.personalproject.user.model.UserDto;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping("api/lawyers")
@Slf4j
public class LawyerController {

    private final LawyerServiceImpl service;



    @GetMapping("/list")
    public ResponseEntity<List<LawyerDto>> findAll() {
        log.info(service.findAll().toString());
        return ResponseEntity.ok(service.findAll());
    }
    @PostMapping("/save")
    public ResponseEntity<List<Lawyer>> saveLawyers(@RequestBody List<Lawyer> lawyers) throws IOException {
        return ResponseEntity.ok(service.save(lawyers));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count(PageRequestVo vo){
        return ResponseEntity.ok(service.count());
    }
}
