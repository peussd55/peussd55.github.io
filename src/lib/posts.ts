import { getCollection } from 'astro:content';
import { site } from '../data/site';

// 개발 서버와 SHOW_DRAFTS=1 빌드에서는 draft 글도 보인다. 공개 빌드에서는 빠진다.
export const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

export async function getPosts() {
  const all = await getCollection('posts');
  return all
    .filter((post) => showDrafts || !post.data.draft)
    .sort(
      (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.order - b.data.order,
    );
}

// 글이 속한 분류들: 대표 분류와, 있으면 덧붙는 분류.
export function catsOf(post: { data: { category: string; also?: string } }) {
  const { category, also } = post.data;
  return also && also !== category ? [category, also] : [category];
}

// 글 목록 화면과 메뉴의 "글"을 내놓을지.
export function isListVisible(count: number) {
  return showDrafts ? count > 0 : count >= site.minPostsForList;
}

export function formatDate(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}
