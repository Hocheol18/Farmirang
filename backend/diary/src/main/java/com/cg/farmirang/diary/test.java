package com.cg.farmirang.diary;

import java.util.Calendar;

public class test {
	public static void main(String[] args) {
		// 설정할 연도와 월
		int year = 2024;
		int month = 4; // 5월 (Java에서 월은 0부터 시작하므로 5월은 4로 설정)

		// Calendar 인스턴스 생성
		Calendar calendar = Calendar.getInstance();

		// 지정된 연도와 월로 설정 (월은 -1 해야 해당 월이 됨)
		calendar.set(year, month - 1, 1);

		int[][] monthDays = new int[6][7]; // 7x6 배열
		int startDay = calendar.get(Calendar.DAY_OF_WEEK); // 해당 월의 첫째 날의 요일
		int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH); // 해당 월의 일수

		int day = 1;
		boolean startFilling = false;

		// 배열에 날짜 채우기
		for (int i = 0; i < 6; i++) {
			for (int j = 0; j < 7; j++) {
				if (j == startDay - 1 && !startFilling) {
					startFilling = true; // 첫 요일부터 날짜 시작
				}
				if (startFilling && day <= daysInMonth) {
					monthDays[i][j] = day++;
				} else {
					monthDays[i][j] = 0; // 나머지는 0으로 설정
				}
			}
			if (day > daysInMonth) {
				break; // 모든 날짜가 채워지면 종료
			}
		}

		// 달력 출력
		for (int i = 0; i < 6; i++) {
			for (int j = 0; j < 7; j++) {
				if (monthDays[i][j] != 0) {
					System.out.printf("%2d ", monthDays[i][j]);
				} else {
					System.out.print("   "); // 날짜가 없는 칸은 공백으로 출력
				}
			}
			System.out.println();
		}
	}
}
