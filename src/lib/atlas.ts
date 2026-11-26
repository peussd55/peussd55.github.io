// 전체 구성도(/map/)의 자료. 글에 든 위치 그림(.loc)에서 뽑는다.
// 구성도에 싣는 글자는 전부 글의 위치 그림에 이미 있는 것이다. 위치 그림이 든 글을 올리면 구성도에도 들어간다.
// 위치 그림의 꼴이 약속과 다르면 빌드를 멈춘다(틀린 구성도가 올라가지 않게).

// 위치 그림마다 캡션 맨 앞에 똑같이 두는 두 문장. 이 뒤에 붙은 문장(잰 조건)만 구성도에 따로 싣는다.
export const CAP_PATH = '위에서 아래로 한 번의 대화가 지나는 길을 단순하게 그린 것이에요.';
const CAP_BLUE = '파란 테두리가 이 글이 다룬 자리예요.';
const ROW_SIZES = '2,3,2,2,2';

type Entry = { id: string; body?: string; data: { title: string; category: string } };

export type AtlasNode = { id: string; label: string; small: string; count: number };
export type AtlasLine = { no: number; head: string; text: string; node: string };
export type AtlasPost = {
  slug: string;
  title: string;
  short: string;
  sub: string;
  category: string;
  extra: string;
  on: Record<string, { no: number; label: string; small: string }>;
  side: { no: number; items: { t: string; hit: boolean }[] } | null;
  did: AtlasLine[];
};
export type Atlas = {
  rows: { k: string; nodes: AtlasNode[] }[];
  side: { id: 'side'; title: string; items: string[]; count: number };
  posts: AtlasPost[];
};

function stop(message: string): never {
  throw new Error(`[전체 구성도] ${message}`);
}

function plain(text: string, where: string) {
  if (/[<>]/.test(text)) stop(`${where}: 위치 그림의 글자에 태그가 들어 있음 — ${text.slice(0, 40)}`);
  return text.replace(/&amp;/g, '&');
}

function mostUsed(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function parse(entry: Entry) {
  const slug = entry.id;
  const body = (entry.body ?? '').replace(/\r/g, '');
  const figures = body.match(/<figure class="fig">\n<div class="fig__canvas">\n<div class="loc"[\s\S]*?<\/figure>/g);
  if (!figures) return null;
  if (figures.length !== 1) stop(`${slug}: 위치 그림이 ${figures.length}개`);
  const figure = figures[0];

  const rows = [
    ...figure.matchAll(/<div class="loc__row"><span class="loc__k">(.*?)<\/span><div class="loc__set">(.*?)<\/div><\/div>/g),
  ].map((row, ri) => ({
    k: plain(row[1], slug),
    nodes: [
      ...row[2].matchAll(/<span class="loc__n( loc__n--on)?">(?:<b class="loc__no">(\d+)<\/b>)?(.*?)(?:<small>(.*?)<\/small>)?<\/span>/g),
    ].map((node, ni) => ({
      id: `r${ri}n${ni}`,
      on: Boolean(node[1]),
      no: node[2] ? Number(node[2]) : 0,
      label: plain(node[3], slug),
      small: plain(node[4] ?? '', slug),
    })),
  }));
  if (rows.map((row) => row.nodes.length).join() !== ROW_SIZES) stop(`${slug}: 줄과 상자의 수가 공통 구성도와 다름`);

  const sideMatch = figure.match(
    /<div class="loc__side( loc__side--on)?">(?:<b class="loc__no">(\d+)<\/b>)?<b>(.*?)<\/b>((?:<span(?: class="loc__hit")?>.*?<\/span>)+)<\/div>/,
  );
  if (!sideMatch) stop(`${slug}: 옆 상자를 찾지 못함`);
  const side = {
    on: Boolean(sideMatch[1]),
    no: sideMatch[2] ? Number(sideMatch[2]) : 0,
    title: plain(sideMatch[3], slug),
    items: [...sideMatch[4].matchAll(/<span( class="loc__hit")?>(.*?)<\/span>/g)].map((item) => ({
      t: plain(item[2], slug),
      hit: Boolean(item[1]),
    })),
  };

  const marks = rows.flatMap((row) => row.nodes).filter((node) => node.on).map((node) => ({ id: node.id, no: node.no }));
  if (side.on) marks.push({ id: 'side', no: side.no });
  const did = [...figure.matchAll(/<li><b class="loc__no">(\d+)<\/b><span><b>(.*?)<\/b> — (.*?)<\/span><\/li>/g)].map((line) => {
    const no = Number(line[1]);
    const at = marks.filter((mark) => mark.no === no);
    if (at.length !== 1) stop(`${slug}: ${no}번 줄의 자리가 ${at.length}개`);
    return { no, head: plain(line[2], slug), text: plain(line[3], slug), node: at[0].id };
  });
  if (marks.length !== did.length) stop(`${slug}: 강조한 자리 ${marks.length}곳 ≠ 아래 줄 ${did.length}개`);

  const caption = plain(figure.match(/<figcaption>(.*?)<\/figcaption>/)?.[1] ?? stop(`${slug}: 캡션이 없음`), slug);
  const common = `${CAP_PATH} ${CAP_BLUE}`;
  if (!caption.startsWith(common)) stop(`${slug}: 캡션의 앞 두 문장이 공통 문장과 다름`);

  const [short, ...rest] = entry.data.title.split(' — ');
  return {
    slug,
    title: entry.data.title,
    short,
    sub: rest.join(' — '),
    category: entry.data.category,
    extra: caption.slice(common.length).trim(),
    rows,
    side,
    did,
  };
}

// posts는 보일 순서대로(최신순) 넘긴다.
export function buildAtlas(posts: Entry[]): Atlas {
  const found = posts.map(parse).filter((post) => post !== null);
  if (found.length === 0) stop('위치 그림이 든 글이 없음');
  const first = found[0];
  for (const post of found) {
    if (post.rows.map((row) => row.k).join() !== first.rows.map((row) => row.k).join()) stop(`${post.slug}: 줄 이름이 다른 글과 다름`);
  }

  // 공통 문구 = 그 상자를 강조하지 않은 글들이 가장 많이 쓴 꼴
  const rows = first.rows.map((row, ri) => ({
    k: row.k,
    nodes: row.nodes.map((node, ni) => {
      const same = found.map((post) => post.rows[ri].nodes[ni]);
      const plainOnes = same.filter((one) => !one.on).map((one) => `${one.label}\u0001${one.small}`);
      if (plainOnes.length === 0) stop(`${node.id}: 모든 글이 강조한 상자라 공통 문구를 정할 수 없음`);
      const [label, small] = mostUsed(plainOnes).split('\u0001');
      return { id: node.id, label, small, count: same.filter((one) => one.on).length };
    }),
  }));
  const plainSides = found.filter((post) => !post.side.on).map((post) => post.side.items.map((item) => item.t).join('\u0001'));
  if (plainSides.length === 0) stop('모든 글이 옆 상자를 강조해 공통 문구를 정할 수 없음');

  return {
    rows,
    side: {
      id: 'side',
      title: first.side.title,
      items: mostUsed(plainSides).split('\u0001'),
      count: found.filter((post) => post.side.on).length,
    },
    posts: found.map((post) => ({
      slug: post.slug,
      title: post.title,
      short: post.short,
      sub: post.sub,
      category: post.category,
      extra: post.extra,
      on: Object.fromEntries(
        post.rows
          .flatMap((row) => row.nodes)
          .filter((node) => node.on)
          .map((node) => [node.id, { no: node.no, label: node.label, small: node.small }]),
      ),
      side: post.side.on ? { no: post.side.no, items: post.side.items } : null,
      did: post.did,
    })),
  };
}
