package com.cg.farmirang.diary.feature.diary.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.farmirang.diary.feature.diary.service.DiaryService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/diary")
@Tag(name = "diary", description = "일지 API")
public class DiaryController {

	private final DiaryService diaryService;
}
