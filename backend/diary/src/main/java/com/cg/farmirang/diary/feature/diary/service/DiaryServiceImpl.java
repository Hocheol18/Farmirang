package com.cg.farmirang.diary.feature.diary.service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cg.farmirang.diary.feature.diary.dto.CalendarDto;
import com.cg.farmirang.diary.feature.diary.dto.request.CreateDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.request.ModifyDiaryMRequest;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryAResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryMResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.GetDiaryTotalResponse;
import com.cg.farmirang.diary.feature.diary.dto.response.MakeCalendarResponse;
import com.cg.farmirang.diary.feature.diary.entity.Diary;
import com.cg.farmirang.diary.feature.diary.entity.DiaryAuto;
import com.cg.farmirang.diary.feature.diary.entity.DiaryManual;
import com.cg.farmirang.diary.feature.diary.entity.DiaryTotal;
import com.cg.farmirang.diary.feature.diary.repository.DiaryAutoRepository;
import com.cg.farmirang.diary.feature.diary.repository.DiaryManualRepository;
import com.cg.farmirang.diary.feature.diary.repository.DiaryRepository;
import com.cg.farmirang.diary.feature.diary.repository.DiaryTotalRepository;
import com.cg.farmirang.diary.global.common.code.ErrorCode;
import com.cg.farmirang.diary.global.common.service.S3UploadService;
import com.cg.farmirang.diary.global.exception.BusinessExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class DiaryServiceImpl implements DiaryService {

	private final S3UploadService s3UploadService;
	private final DiaryManualRepository diaryManualRepository;
	private final DiaryTotalRepository diaryTotalRepository;
	private final DiaryAutoRepository diaryAutoRepository;
	private final DiaryRepository diaryRepository;

	@Override
	public Boolean insertDiaryManual(Long diaryMId, MultipartFile file, CreateDiaryMRequest request) {
		String imagePath;
		if(file != null) imagePath = s3UploadService.saveFile(file);
		else imagePath = null;
		DiaryManual diaryManual = DiaryManual.builder()
			.content(request.getContent())
			.photo(imagePath)
			.build();
		diaryManualRepository.save(diaryManual);
		return true;
	}

	@Override
	public Boolean updateDiaryManual(Long diaryMId, MultipartFile file,
		ModifyDiaryMRequest request) {
		String imagePath;
		if(file != null) imagePath = s3UploadService.saveFile(file);
		else imagePath = null;

		DiaryManual diaryManual = diaryManualRepository.findById(diaryMId).orElseThrow(() -> new BusinessExceptionHandler(
			"해당 일지를 찾을 수 없습니다.", ErrorCode.NOT_FOUND_ERROR));

		diaryManual.setContent(request.getContent());
		diaryManual.setPhoto(imagePath);
		diaryManualRepository.save(diaryManual);

		return true;
	}

	@Override
	public GetDiaryMResponse selectDiaryManual(Long diaryMId) {
		DiaryManual diaryManual = diaryManualRepository.findById(diaryMId).orElseThrow(() -> new BusinessExceptionHandler(
			"해당 일지를 찾을 수 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		return GetDiaryMResponse.builder()
			.content(diaryManual.getContent())
			.photo(diaryManual.getPhoto())
			.build();
	}

	@Override
	public Boolean deleteDiaryManual(Long diaryMId) {
		diaryManualRepository.deleteById(diaryMId);
		return true;
	}

	@Override
	public GetDiaryTotalResponse selectDiaryTotal(Long diaryTId) {
		DiaryTotal diaryTotal = diaryTotalRepository.findById(diaryTId).orElseThrow(() -> new BusinessExceptionHandler(
			"해당 일지를 찾을 수 없습니다.", ErrorCode.NOT_FOUND_ERROR));
		return GetDiaryTotalResponse.builder()
			.weather(diaryTotal.getWeather())
			.weatherIcon(diaryTotal.getWeatherIcon())
			.temperature(diaryTotal.getTemperature())
			.humidity(diaryTotal.getHumidity())
			.fieldHumidity(diaryTotal.getFieldHumidity())
			.build();
	}

	@Override
	public GetDiaryAResponse selectDiaryAuto(Long diaryAId) {
		return null;
	}

	@Override
	public MakeCalendarResponse makeCalendar(Long fieldID, Integer year, Integer month) {
		LocalDate start = LocalDate.of(year, month, 1);
		LocalDate end = start.with(TemporalAdjusters.lastDayOfMonth());
		List<Diary> diaries = diaryRepository.findByFieldIdAndDiaryAtBetween(fieldID, start, end);
		Map<Integer, Diary> diaryMap = new HashMap<>();

		for (Diary diary : diaries) {
			diaryMap.put(diary.getDiaryAt().getDayOfMonth(), diary);
		}

		Calendar calendar = Calendar.getInstance();
		calendar.set(year, month - 1, 1);
		ArrayList<ArrayList<CalendarDto>> monthDays = new ArrayList<>();
		int startDay = calendar.get(Calendar.DAY_OF_WEEK);
		int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

		int day = 1;
		boolean startFilling = false;
		for (int i = 0; i < 6; i++) {
			ArrayList<CalendarDto> week = new ArrayList<>(7);
			for (int j = 0; j < 7; j++) {
				if (j == startDay - 1 && !startFilling) {
					startFilling = true; // 첫 요일부터 날짜 시작
				}
				if (startFilling && day <= daysInMonth) {
					CalendarDto calendarDto = new CalendarDto();
					if(diaryMap.containsKey(day)){
						calendarDto.setWeather(diaryMap.get(day).getDiaryTotal().getWeather());
						calendarDto.setWeatherIcon(diaryMap.get(day).getDiaryTotal().getWeather());
						calendarDto.setDiaryAutoId(diaryMap.get(day).getDiaryAuto().getId());
						calendarDto.setDiaryManualId(diaryMap.get(day).getDiaryManual().getId());
						calendarDto.setDiaryTotalId(diaryMap.get(day).getDiaryTotal().getId());
					}
					calendarDto.setDay(day++);
					week.add(calendarDto);
				} else {
					week.add(null);
				}
			}
			monthDays.add(week);
			if (day > daysInMonth) {
				break; // 모든 날짜가 채워지면 종료
			}
		}

		return MakeCalendarResponse.builder().result(monthDays).build();
	}
}
