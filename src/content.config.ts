import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories } from './data/site';

// 글 한 편 = src/content/posts 아래 마크다운 파일 하나. 파일 이름이 주소(/posts/<파일 이름>/)가 된다.
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    category: z.enum(categories),
    // 덧붙는 분류(하나까지). 글이 다른 주제의 줄거리에도 들어갈 때만 적는다.
    // 글 탭에서는 두 분류 모두에서 나오고 편수에도 들어간다. 프로필 "주요 업무"에는 대표 분류(category)의 묶음에 한 번만 보인다.
    also: z.enum(categories).optional(),
    role: z.string().optional(),
    // 날짜가 같은 글의 순서(작은 수가 위).
    order: z.number().default(0),
    // 프로필 "주요 업무"에 제목을 보일 대표 글(긴 글)에만 true. 글 탭에는 이 값과 상관없이 모두 나온다.
    featured: z.boolean().default(false),
    // 글의 종류. 분류(category)는 주제이고 이것은 형식이다. 지금은 트러블슈팅 기록에만 적는다.
    // 프로필의 "트러블슈팅 기록" 칸, 글 탭의 종류 줄과 꼬리표가 이 값을 쓴다.
    kind: z.enum(['troubleshooting']).optional(),
    // draft: true 인 글은 공개 빌드에 들어가지 않는다.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
