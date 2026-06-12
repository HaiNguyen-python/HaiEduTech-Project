/**
 * @file SubqueryDiagram.tsx
 * @description Subquery visual using HTML cards (no tiny SVG text).
 *              Step badges + colored code blocks for instant readability.
 */

const SubqueryDiagram = () => (
  <figure className="not-prose my-8 rounded-2xl border-2 border-border bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 p-5 shadow-md">
    <h4 className="text-base font-extrabold text-foreground mb-4 flex items-center gap-2">
      🔍 Subquery - câu truy vấn lồng nhau
    </h4>

    <div className="space-y-3">
      {/* Inner query - runs first */}
      <div className="relative rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-extrabold shadow">1</span>
          <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">INNER QUERY · chạy TRƯỚC</span>
        </div>
        <div className="rounded-lg bg-card border border-emerald-200 dark:border-emerald-800 p-3 font-mono text-sm text-foreground leading-relaxed">
          <span className="text-violet-600 dark:text-violet-400 font-bold">SELECT</span> user_id <span className="text-violet-600 dark:text-violet-400 font-bold">FROM</span> orders<br />
          <span className="text-violet-600 dark:text-violet-400 font-bold">WHERE</span> total &gt; 1000
        </div>
        <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
          → Trả về danh sách <span className="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 font-mono">user_id</span>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-1 h-4 bg-orange-400 rounded" />
          <div className="text-2xl">⬇️</div>
          <div className="text-xs font-bold text-muted-foreground">kết quả truyền vào</div>
        </div>
      </div>

      {/* Outer query - runs after */}
      <div className="relative rounded-xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/40 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-extrabold shadow">2</span>
          <span className="text-sm font-extrabold text-orange-700 dark:text-orange-300">OUTER QUERY · chạy SAU</span>
        </div>
        <div className="rounded-lg bg-card border border-orange-200 dark:border-orange-800 p-3 font-mono text-sm text-foreground leading-relaxed">
          <span className="text-violet-600 dark:text-violet-400 font-bold">SELECT</span> name <span className="text-violet-600 dark:text-violet-400 font-bold">FROM</span> users<br />
          <span className="text-violet-600 dark:text-violet-400 font-bold">WHERE</span> id <span className="text-violet-600 dark:text-violet-400 font-bold">IN</span> (<span className="text-emerald-600 dark:text-emerald-400">↑ kết quả Inner</span>)
        </div>
      </div>
    </div>

    <figcaption className="text-sm text-center text-foreground mt-4 font-medium">
      🟢 Inner query chạy trước → 🟠 Outer query dùng kết quả để lọc dữ liệu cuối cùng
    </figcaption>
  </figure>
);

export default SubqueryDiagram;
