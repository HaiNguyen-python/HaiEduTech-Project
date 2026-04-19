const SubqueryDiagram = () => (
  <figure className="not-prose my-6 rounded-xl border border-border bg-card p-4 shadow-sm">
    <svg viewBox="0 0 380 200" className="w-full h-auto" role="img" aria-label="Subquery flow diagram">
      {/* Outer query box */}
      <rect x="10" y="10" width="360" height="180" rx="10" fill="hsl(217 91% 60% / 0.06)" stroke="hsl(217 91% 60%)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="25" y="32" fontSize="12" fontWeight="700" fill="hsl(217 91% 50%)" fontFamily="monospace">
        OUTER QUERY
      </text>
      <text x="25" y="50" fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
        SELECT name FROM users
      </text>
      <text x="25" y="66" fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
        WHERE id IN (
      </text>

      {/* Inner query box */}
      <rect x="40" y="78" width="310" height="70" rx="8" fill="hsl(160 84% 39% / 0.1)" stroke="hsl(160 84% 39%)" strokeWidth="2" />
      <text x="55" y="98" fontSize="11" fontWeight="700" fill="hsl(160 84% 30%)" fontFamily="monospace">
        ① INNER QUERY (chạy trước)
      </text>
      <text x="55" y="116" fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
        SELECT user_id FROM orders
      </text>
      <text x="55" y="132" fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
        WHERE total &gt; 1000
      </text>

      <text x="25" y="168" fontSize="11" fill="hsl(var(--foreground))" fontFamily="monospace">
        ); ② OUTER dùng kết quả trên
      </text>

      {/* Arrow from inner up to IN */}
      <path d="M 350 90 Q 372 75 365 60" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(160 84% 39%)" />
        </marker>
      </defs>
    </svg>
    <figcaption className="text-xs text-center text-muted-foreground mt-2">
      Inner query (xanh lá) chạy trước → trả về danh sách id → Outer query (xanh dương) dùng làm điều kiện.
    </figcaption>
  </figure>
);

export default SubqueryDiagram;
