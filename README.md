# peussd55.github.io

프로필과 글을 싣는 개인 사이트. Astro로 만든 정적 사이트이고, main에 올리면 GitHub Actions가 빌드해서 GitHub Pages에 배포한다.

## 실행

```
npm install
npm run dev      # 개발 서버 — draft 글도 보인다
npm run build    # 공개 빌드 → dist/
```

draft 글까지 넣어 빌드해 보려면 `SHOW_DRAFTS=1 npm run build`.

## 내용을 고치는 곳

- 프로필: `src/data/profile.ts`
- 글: `src/content/posts/<주소가 될 이름>.md` — 머리말에 `title` · `summary` · `date` · `category`를 적는다. `draft: true`면 공개 빌드에서 빠진다.
- 메뉴의 "글"은 공개된 글이 2편 이상일 때 나온다(`src/data/site.ts`의 `minPostsForList`).
- 화면 스타일: `src/styles/global.css`
