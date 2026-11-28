// 전체 구성도(/map/)에 얹는 꼬리표: 그 자리를 누가 맡는지와 무엇으로 붙는지.
// 구성도에 새 문장을 쓰지 않는다는 약속은 여기서도 같다. 꼬리표의 낱말과 그 아래에 보이는 문장은 올라간 글에 이미 있는 것만 쓴다.
// 꼬리표마다 근거 글(from)과 그 글의 문장(quote)을 적어 두고, 빌드할 때 그 글의 본문에 문장과 낱말이 그대로 있는지 본다. 없으면 빌드를 멈춘다.
// 글에 적히지 않은 자리(전화 교환기 · 음성합성 · 도구 · 웹챗 화면)에는 붙이지 않는다. 모델 줄은 상자 이름이 이미 말하고 있어 붙이지 않는다.
import type { Atlas } from './atlas';

type Entry = { id: string; body?: string; data: { title: string } };
type Source = { words: string[]; from: string; quote: string };

// 상자에 붙는 꼬리표. 자리는 줄 번호와 상자 번호로 가리키고, 엉뚱한 상자에 붙지 않게 공통 구성도의 이름도 같이 적는다.
const NODE_TAGS: ({ row: number; node: number; label: string; tag: string } & Source)[] = [
  {
    row: 0,
    node: 1,
    label: '음성인식',
    tag: '다른 팀',
    words: ['다른 팀'],
    from: 'outside-the-engine',
    quote: '엔진과 그 서버는 다른 팀이 맡아요.',
  },
];

// 줄 이름 옆에 붙는 꼬리표.
const ROW_TAGS: ({ row: number; k: string; tag: string } & Source)[] = [
  {
    row: 1,
    k: '봇 서버',
    tag: '우리 쪽 코드',
    words: ['우리 쪽 코드'],
    from: 'outside-the-engine',
    quote: '턴 처리부터 대화 기록까지는 우리 콜 엔진이에요.',
  },
];

// 한 줄의 이웃한 두 상자 사이에 놓는 이름표(무엇으로 붙는지).
const LINKS: ({ row: number; left: number; labels: [string, string]; label: string } & Source)[] = [
  {
    row: 0,
    left: 0,
    labels: ['전화 교환기', '음성인식'],
    label: '커넥터 · gRPC 스트림',
    words: ['커넥터', 'gRPC 스트림'],
    from: 'outside-the-engine',
    quote: '통화마다 엔진 서버로 스트림을 따로 열어요.',
  },
];

export type AtlasBounds = {
  nodes: Record<string, { tag: string }>;
  rows: Record<number, { tag: string }>;
  // at = 이름표가 놓일 자리(줄 너비에서의 비율) · left = 왼쪽 상자의 번호 · of = 그 줄의 상자 수
  links: { row: number; left: number; of: number; at: number; label: string }[];
  notes: { slug: string; short: string; lines: { tag: string; quote: string }[] }[];
};

function stop(message: string): never {
  throw new Error(`[전체 구성도 · 꼬리표] ${message}`);
}

export function buildBounds(posts: Entry[], atlas: Atlas): AtlasBounds {
  const bodyOf = new Map<string, string>();
  const titleOf = new Map<string, string>();
  for (const post of posts) {
    // 굵은 글씨 표시를 걷어 내고 견준다(낱말이 굵은 글씨 안팎에 걸쳐 있어도 찾게).
    bodyOf.set(post.id, (post.body ?? '').replace(/\r/g, '').replace(/\*\*/g, ''));
    titleOf.set(post.id, post.data.title);
  }

  const notes: AtlasBounds['notes'] = [];
  function backed(what: string, shown: string, source: Source) {
    const body = bodyOf.get(source.from);
    if (body === undefined) stop(`${what}: 근거 글 ${source.from}이 올라간 글에 없음`);
    if (!body.includes(source.quote)) stop(`${what}: 근거 문장이 ${source.from}의 본문에 없음 — ${source.quote}`);
    for (const word of source.words) {
      if (!shown.includes(word)) stop(`${what}: 확인할 낱말 "${word}"이 꼬리표에 없음`);
      if (!body.includes(word)) stop(`${what}: 낱말 "${word}"이 ${source.from}의 본문에 없음`);
    }
    let note = notes.find((one) => one.slug === source.from);
    if (!note) {
      note = { slug: source.from, short: (titleOf.get(source.from) ?? '').split(' — ')[0], lines: [] };
      notes.push(note);
    }
    note.lines.push({ tag: shown, quote: source.quote });
  }

  const nodes: AtlasBounds['nodes'] = {};
  for (const one of NODE_TAGS) {
    const node = atlas.rows[one.row]?.nodes[one.node];
    if (!node || node.label !== one.label) stop(`${one.tag}: ${one.row}번 줄 ${one.node}번 상자가 "${one.label}"이 아님`);
    backed(`${one.label}의 꼬리표`, one.tag, one);
    nodes[node.id] = { tag: one.tag };
  }

  const rows: AtlasBounds['rows'] = {};
  for (const one of ROW_TAGS) {
    if (atlas.rows[one.row]?.k !== one.k) stop(`${one.tag}: ${one.row}번 줄이 "${one.k}"이 아님`);
    backed(`${one.k} 줄의 꼬리표`, one.tag, one);
    rows[one.row] = { tag: one.tag };
  }

  const links: AtlasBounds['links'] = [];
  for (const one of LINKS) {
    const set = atlas.rows[one.row]?.nodes ?? [];
    if (set[one.left]?.label !== one.labels[0] || set[one.left + 1]?.label !== one.labels[1]) {
      stop(`${one.label}: ${one.row}번 줄의 ${one.left}번과 그 옆 상자가 "${one.labels.join('" · "')}"이 아님`);
    }
    backed(`${one.labels.join('와 ')} 사이의 이름표`, one.label, one);
    links.push({ row: one.row, left: one.left, of: set.length, at: (one.left + 1) / set.length, label: one.label });
  }

  return { nodes, rows, links, notes };
}
