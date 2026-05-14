export interface ISubsequenceMatch {
  ok: boolean;
  idxs: number[];
}

export function subsequenceMatch(
  haystack: string,
  needle: string,
): ISubsequenceMatch {
  if (!needle) return { ok: true, idxs: [] };
  let hi = 0;
  const idxs: number[] = [];
  for (let ni = 0; ni < needle.length; ni++) {
    const ch = needle[ni];
    while (hi < haystack.length && haystack[hi] !== ch) hi++;
    if (hi >= haystack.length) return { ok: false, idxs: [] };
    idxs.push(hi);
    hi++;
  }
  return { ok: true, idxs };
}

export interface IPickerItem {
  slug: string;
  title: string;
  sub: string;
  meta: string;
  haystack: string;
  tags: string[];
  featured: boolean;
}

export function filterItems(
  items: IPickerItem[],
  rawQuery: string,
): IPickerItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return items.slice();
  const scored: { item: IPickerItem; score: number }[] = [];
  for (const item of items) {
    const m = subsequenceMatch(item.haystack, query);
    if (!m.ok) continue;
    const span = m.idxs[m.idxs.length - 1] - m.idxs[0];
    const titleLc = item.title.toLowerCase();
    const titleStart = titleLc.indexOf(query);
    const titleBonus = titleStart === 0 ? -1000 : titleStart > -1 ? -200 : 0;
    scored.push({ item, score: span + titleBonus });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.map((s) => s.item);
}

export interface IHighlightPart {
  text: string;
  match: boolean;
}

export function highlightParts(
  text: string,
  query: string,
): IHighlightPart[] {
  if (!query) return [{ text, match: false }];
  const lc = text.toLowerCase();
  const m = subsequenceMatch(lc, query.toLowerCase());
  if (!m.ok) return [{ text, match: false }];
  const set = new Set(m.idxs);
  const parts: IHighlightPart[] = [];
  let buf = "";
  let bufMatch = false;
  for (let i = 0; i < text.length; i++) {
    const isMatch = set.has(i);
    if (i === 0) {
      buf = text[i];
      bufMatch = isMatch;
      continue;
    }
    if (isMatch === bufMatch) {
      buf += text[i];
    } else {
      parts.push({ text: buf, match: bufMatch });
      buf = text[i];
      bufMatch = isMatch;
    }
  }
  if (buf) parts.push({ text: buf, match: bufMatch });
  return parts;
}
