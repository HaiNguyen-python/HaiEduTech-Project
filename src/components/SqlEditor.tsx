import { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Play, Loader2, RotateCcw, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SqlEditorProps {
  initialCode?: string;
  expectedOutput?: string;
}

declare global {
  interface Window {
    _sqlJs?: any;
    _sqlDb?: any;
    initSQL?: any;
  }
}

const SAMPLE_DATA_SQL = `
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY, name TEXT, class TEXT, math_score REAL, english_score REAL, age INTEGER
);
INSERT OR IGNORE INTO students VALUES (1, 'Nguyen An', '10A1', 9.0, 7.5, 16);
INSERT OR IGNORE INTO students VALUES (2, 'Tran Binh', '10A1', 7.0, 8.0, 16);
INSERT OR IGNORE INTO students VALUES (3, 'Le Chi', '10A2', 8.5, 9.5, 17);
INSERT OR IGNORE INTO students VALUES (4, 'Pham Dung', '10A2', 6.5, 7.0, 16);
INSERT OR IGNORE INTO students VALUES (5, 'Hoang Em', '10A1', 9.5, 8.5, 17);
INSERT OR IGNORE INTO students VALUES (6, 'Vo Fiona', '10A3', 7.5, 9.0, 16);
INSERT OR IGNORE INTO students VALUES (7, 'Nguyen Gia', '10A3', 8.0, 6.5, 17);
INSERT OR IGNORE INTO students VALUES (8, 'Le Huong', '10A2', 5.5, 8.0, 16);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY, student_id INTEGER, product TEXT, quantity INTEGER, price REAL, order_date TEXT,
  FOREIGN KEY(student_id) REFERENCES students(id)
);
INSERT OR IGNORE INTO orders VALUES (1, 1, 'Textbook', 2, 150000, '2024-01-15');
INSERT OR IGNORE INTO orders VALUES (2, 2, 'Notebook', 5, 25000, '2024-01-16');
INSERT OR IGNORE INTO orders VALUES (3, 3, 'Pen Set', 1, 80000, '2024-02-01');
INSERT OR IGNORE INTO orders VALUES (4, 1, 'Calculator', 1, 350000, '2024-02-10');
INSERT OR IGNORE INTO orders VALUES (5, 5, 'Textbook', 3, 150000, '2024-02-15');
`;

const SqlEditor = ({ initialCode = "SELECT * FROM students;", expectedOutput }: SqlEditorProps) => {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [dbReady, setDbReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const dbRef = useRef<any>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput("");
  }, [initialCode]);

  // Load sql.js
  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        if (window._sqlDb) {
          dbRef.current = window._sqlDb;
          setDbReady(true);
          setLoading(false);
          return;
        }

        const initSqlJs = (await import("sql.js")).default;
        const SQL = await initSqlJs({
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });
        
        const db = new SQL.Database();
        // Load sample data
        db.run(SAMPLE_DATA_SQL);
        
        window._sqlDb = db;
        dbRef.current = db;
        setDbReady(true);
      } catch (e) {
        console.error("sql.js load error:", e);
        setOutput("Failed to load SQL runtime. Please refresh.");
      }
      setLoading(false);
    };

    loadSqlJs();
  }, []);

  const runSQL = useCallback(() => {
    if (!dbRef.current) return;
    setRunning(true);
    setOutput("");

    try {
      const results = dbRef.current.exec(code);
      if (results.length === 0) {
        setOutput("✅ Query executed successfully. (No rows returned)");
      } else {
        let out = "";
        for (const result of results) {
          // Header
          const colWidths = result.columns.map((col: string, i: number) => {
            const maxData = Math.max(...result.values.map((row: any[]) => String(row[i]).length));
            return Math.max(col.length, maxData, 4);
          });
          
          const header = result.columns.map((col: string, i: number) => col.padEnd(colWidths[i])).join(" | ");
          const separator = colWidths.map((w: number) => "-".repeat(w)).join("-+-");
          out += header + "\n" + separator + "\n";
          
          // Rows
          for (const row of result.values) {
            const rowStr = row.map((val: any, i: number) => String(val ?? "NULL").padEnd(colWidths[i])).join(" | ");
            out += rowStr + "\n";
          }
          out += `\n(${result.values.length} rows)\n`;
        }
        setOutput(out);
      }
    } catch (err: any) {
      setOutput(`❌ SQL Error:\n${err.message}`);
    }
    setRunning(false);
  }, [code]);

  const resetDB = useCallback(async () => {
    if (!dbRef.current) return;
    try {
      // Drop and recreate
      dbRef.current.run("DROP TABLE IF EXISTS orders;");
      dbRef.current.run("DROP TABLE IF EXISTS students;");
      dbRef.current.run(SAMPLE_DATA_SQL);
      setOutput("✅ Database reset to original state.");
    } catch (e: any) {
      setOutput(`❌ Error: ${e.message}`);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Editor */}
      <div className="rounded-xl overflow-hidden border border-border shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--card))] border-b border-border">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-muted-foreground font-mono">SQL Editor</span>
          </div>
          <button onClick={resetDB} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset DB
          </button>
        </div>
        <CodeMirror
          value={code}
          onChange={setCode}
          theme={vscodeDark}
          height="200px"
          basicSetup={{ lineNumbers: true }}
          className="text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={runSQL} disabled={running || !dbReady}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-[0.97] transition-all disabled:opacity-50">
          {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {running ? t("Đang chạy...", "Running...") : t("▶ Chạy SQL", "▶ Run SQL")}
        </button>
      </div>

      {/* Output */}
      <div className="rounded-xl overflow-hidden border border-border">
        <div className="px-4 py-2 bg-[hsl(var(--card))] border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">
            {loading ? "⏳ Loading SQL..." : "📊 Results"}
          </span>
        </div>
        <pre className="p-4 bg-[#1e1e1e] text-green-400 text-sm font-mono min-h-[80px] max-h-[240px] overflow-auto whitespace-pre-wrap">
          {loading
            ? t("Đang tải SQL runtime...", "Loading SQL runtime...")
            : output || t("Bấm 'Chạy SQL' để xem kết quả...", "Press 'Run SQL' to see results...")}
        </pre>
      </div>

      {/* Available tables info */}
      <div className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-4 py-2">
        📋 {t("Bảng có sẵn", "Available tables")}: <code className="text-primary">students</code> (id, name, class, math_score, english_score, age), <code className="text-primary">orders</code> (id, student_id, product, quantity, price, order_date)
      </div>
    </div>
  );
};

export default SqlEditor;
