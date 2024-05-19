package com.cg.farmirang.diary.feature.diary.dto.response;

import java.util.ArrayList;

import com.cg.farmirang.diary.feature.diary.dto.CalendarDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MakeCalendarResponse {
	Integer curMonth;
	ArrayList<ArrayList<CalendarDto>> result;
}
