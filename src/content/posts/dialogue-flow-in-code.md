---
title: 흐름은 코드가, 답변은 모델이
summary: 지시문만으로 대화 흐름을 맡기던 구조를, 단계 전환과 도구 호출은 코드가 하고 모델은 의도 판단과 답변만 하는 구조로 전환해 응답 지연 43% 단축
date: 2026-11-17
order: 2
category: RAG와 에이전트
---

<div class="flow__steps">
  <div class="step"><span class="step__label">전</span><p>지시문만으로 대화 흐름을 맡김</p></div>
  <span class="arrow" aria-hidden="true"></span>
  <div class="step"><span class="step__label">후</span><p>단계 전환과 도구 호출은 코드가, 모델은 의도 판단과 답변만</p></div>
  <span class="arrow" aria-hidden="true"></span>
  <div class="step step--result"><span class="step__label">결과</span><dl class="metrics"><div><dt>시나리오 통과</dt><dd>28/30 <span class="to">→</span> 30/30</dd></div><div><dt>턴 지연 중앙값</dt><dd>2,745ms <span class="to">→</span> 1,565ms</dd></div></dl></div>
</div>

## 문제

- 지시문만으로 대화 흐름을 맡기니 시나리오 30개 중 28개만 통과
- 매 턴 모델을 거쳐 느림. 자유롭게 말한 질문의 응답 5.1초 가운데 3.4초가 모델

## 고른 것과 버린 것

- 단계 전환과 실제 도구 호출(문자 발송 · 접수)을 코드의 상태로 이관. 모델은 "지금 무슨 말인가"와 "어떻게 답할까"만 담당
- 정해진 안내는 모델을 거치지 않고 바로 출력
- 음성 합성을 조각 단위로 흘려보내는 방식은 구현해서 측정해 보니 이득이 0.1~0.3초뿐이라 비활성화

## 측정값

- 시나리오 통과 28/30 → 30/30(전체를 다시 돌려 확인)
- 턴 지연 중앙값 2,745ms → 1,565ms(−43%) · 모델을 거치지 않는 턴 1개 → 8개
- 자유 발화 응답 5.1초 → 3.9초
- 평가는 가짜 도구를 붙인 실행기로 돌려 실제 문자 발송이나 접수가 일어나지 않게 함. 실제 전화를 자동으로 거는 점검은 6/6 통과
