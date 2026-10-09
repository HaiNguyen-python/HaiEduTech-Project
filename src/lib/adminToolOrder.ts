export type ToolOrder = Record<string, string[]>;

export function normalizeToolOrder(saved: unknown, defaults: ToolOrder): ToolOrder {
  const candidate = saved && typeof saved === "object" ? saved as ToolOrder : {};
  const allowed = new Set(Object.values(defaults).flat());
  const seen = new Set<string>();
  const result: ToolOrder = {};
  for (const group of Object.keys(defaults)) {
    result[group] = (Array.isArray(candidate[group]) ? candidate[group] : []).filter(id => {
      if (!allowed.has(id) || seen.has(id)) return false;
      seen.add(id); return true;
    });
  }
  for (const [group, ids] of Object.entries(defaults)) {
    for (const id of ids) if (!seen.has(id)) { result[group].push(id); seen.add(id); }
  }
  return result;
}

export function moveTool(order: ToolOrder, active: string, over: string): ToolOrder {
  if (active === over) return order;
  const source = Object.keys(order).find(group => order[group].includes(active));
  const target = Object.keys(order).find(group => order[group].includes(over));
  if (!source || !target) return order;
  const next = Object.fromEntries(Object.entries(order).map(([group, ids]) => [group, [...ids]]));
  const index = next[target].indexOf(over);
  next[source] = next[source].filter(id => id !== active);
  next[target].splice(Math.min(index, next[target].length), 0, active);
  return next;
}