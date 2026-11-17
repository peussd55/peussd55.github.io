---
# 초안 — 지금까지 공개했던 사례 문장을 글 모양으로 옮겨 둔 것이다. 다시 쓰기 전까지 draft 로 둔다.
title: 음성 상담봇의 검색 품질을 평가셋으로 재고 고치기
summary: 고객센터 음성 상담봇 시범 구축에서 색인에 쓰지 않은 질문으로 검색 정확도를 따로 측정, 정답 1위 비율을 58%에서 70%로 개선
date: 2026-11-17
category: 검색 · RAG
role: 단독 전담(고객 회의 · 설계 · 평가 · 결과 보고)
draft: true
---

## 2주, 질문 206건

자주 묻는 질문 206건으로 답하는 음성 상담봇을 2주 안에 시범 구축해야 했다. 색인을 만든 질문으로 시험하면 점수가 높게 나온다. 실제 고객의 말은 그 질문과 다르다. 음성인식이 제품 이름을 자주 틀리게 받아 적었다.

## 색인에 쓰지 않은 질문으로 재기

색인 재료와 겹치지 않는 질문 묶음을 따로 두고, 고칠 때마다 그 묶음으로 쟀다.

색인은 "질문 변형 + 답변 조각"으로 구성했다. 질문 변형을 매번 다시 생성하는 방식은 버렸다. 다시 만들 때마다 결과가 ±25문항씩 흔들려, 고친 효과와 잡음을 구분할 수 없었다.

<figure class="fig">
  <div class="fig__canvas">
    <div class="dia">
      <div class="node" style="grid-area: 1 / 1">자주 묻는 질문 206건</div>
      <span class="edge" style="grid-area: 1 / 2" aria-hidden="true"></span>
      <div class="node" style="grid-area: 1 / 3">색인<small>(질문 변형 + 답변 조각)</small></div>
      <span class="ev" style="grid-area: 2 / 3" aria-hidden="true"></span>
      <div class="node" style="grid-area: 3 / 1">색인에 쓰지 않은 질문 묶음</div>
      <span class="edge" style="grid-area: 3 / 2" aria-hidden="true"></span>
      <div class="node" style="grid-area: 3 / 3">검색</div>
      <span class="edge" style="grid-area: 3 / 4" aria-hidden="true"></span>
      <div class="node node--out" style="grid-area: 3 / 5"><span><span class="nw">정답 1위</span> · <span class="nw">3위 안</span></span></div>
    </div>
  </div>
  <figcaption>그림 1. 색인 재료와 평가 질문 묶음을 겹치지 않게 나눈다</figcaption>
</figure>

## 음성인식이 틀리게 받아 적은 제품 이름

틀리게 인식된 제품 이름은 자모 단위 편집 거리로 보정했다. 기준값 0.75에서는 엉뚱한 제품으로 바뀌는 경우가 나와 0.82로 정했다.

버전이 모호한 질문은 모델에 맡기지 않고 코드로 판정했다.

```text
# 자리 채움 — 실제 글에서는 평가 실행 기록이 들어간다
top1   0.584 -> 0.698
top3   0.762 -> 0.886
```

## 잰 값

| 지표 | 전 | 후 |
| :-- | --: | --: |
| 정답 1위 | 58.4% | **69.8%** |
| 3위 안 | 76.2% | **88.6%** |
| 틀리게 인식된 제품 이름의 회복 | 13건 | **63건** |
| 버전이 모호해 틀리던 질문 | 32건 | **3건** |

종합 정답률(자주 묻는 질문 일치 + 모델 판정 · 404문항): 글자 입력 83.4 · 음성인식을 거친 조건 70.5.

## 남은 것

음성인식을 거친 조건의 70.5는 목표였던 80에 못 미쳤다. "음성인식을 거친 조건"은 실제 통화가 아니라 음성인식을 통과시킨 시뮬레이션이다. 평가 묶음이 셋이라 숫자를 서로 섞어 읽으면 안 된다.
