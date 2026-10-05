/**
 * Shared runner + grader for the 150 Python Challenges.
 *
 * PY_HARNESS is executed once inside Pyodide. It defines `_hai_run`, which runs a
 * learner program in a fresh namespace with:
 *  - input() fed from a list of values (prompts echoed only in interactive runs),
 *  - an in-browser `turtle` module that records the drawing as SVG,
 *  - a step limit so an accidental infinite loop stops instead of freezing the page.
 * The same harness is read by scripts/python_challenges/build.py, so reference
 * answers are verified with exactly the rules students are graded with.
 */

export const PY_HARNESS = String.raw`
import builtins, io, sys, json, random, contextlib, traceback, math, types

class _HaiStop(Exception):
    pass

def _hai_make_turtle():
    st = {"segs": [], "circles": 0, "fills": [], "bg": "white"}

    class Turtle:
        def __init__(self, *a, **k):
            self.x = 0.0; self.y = 0.0; self.h = 0.0
            self.pen = True; self.col = "black"; self.fcol = "black"
            self.width = 2; self.filling = None
        def _move(self, nx, ny):
            if self.pen:
                st["segs"].append((self.x, self.y, nx, ny, self.col, self.width))
            if self.filling is not None:
                self.filling.append((nx, ny))
            self.x, self.y = nx, ny
        def forward(self, d):
            r = math.radians(self.h)
            self._move(self.x + d * math.cos(r), self.y + d * math.sin(r))
        fd = forward
        def backward(self, d):
            self.forward(-d)
        bk = back = backward
        def left(self, a=90):
            self.h = (self.h + a) % 360
        lt = left
        def right(self, a=90):
            self.h = (self.h - a) % 360
        rt = right
        def penup(self):
            self.pen = False
        pu = up = penup
        def pendown(self):
            self.pen = True
        pd = down = pendown
        def goto(self, x, y=None):
            if y is None:
                x, y = x
            self._move(float(x), float(y))
        setpos = setposition = goto
        def setx(self, x):
            self.goto(x, self.y)
        def sety(self, y):
            self.goto(self.x, y)
        def setheading(self, a):
            self.h = a % 360
        seth = setheading
        def heading(self):
            return self.h
        def position(self):
            return (self.x, self.y)
        pos = position
        def xcor(self):
            return self.x
        def ycor(self):
            return self.y
        def home(self):
            self.goto(0, 0); self.h = 0
        def circle(self, radius, extent=360, steps=None):
            st["circles"] += 1
            n = steps or 36
            n = max(3, int(n * abs(extent) / 360) or 3)
            step = 2 * math.pi * abs(radius) * abs(extent) / 360 / n
            turn = extent / n * (1 if radius >= 0 else -1)
            for _ in range(n):
                self.left(turn / 2)
                self.forward(step)
                self.left(turn / 2)
        def color(self, *a):
            if len(a) == 1:
                self.col = self.fcol = a[0]
            elif len(a) >= 2:
                self.col, self.fcol = a[0], a[1]
        def pencolor(self, c=None):
            if c is not None:
                self.col = c
            return self.col
        def fillcolor(self, c=None):
            if c is not None:
                self.fcol = c
            return self.fcol
        def pensize(self, w=None):
            if w is not None:
                self.width = w
        width = pensize
        def begin_fill(self):
            self.filling = [(self.x, self.y)]
        def end_fill(self):
            if self.filling and len(self.filling) > 2:
                st["fills"].append((self.filling, self.fcol))
            self.filling = None
        def __getattr__(self, name):
            return lambda *a, **k: None

    class Screen:
        def __init__(self, *a, **k):
            pass
        def bgcolor(self, c=None):
            if c:
                st["bg"] = c
        def __getattr__(self, name):
            return lambda *a, **k: None

    mod = types.ModuleType("turtle")
    mod.Turtle = Turtle
    mod.Pen = Turtle
    mod.RawTurtle = Turtle
    mod.Screen = Screen
    default = Turtle()
    def _delegate(name):
        return lambda *a, **k: getattr(default, name)(*a, **k)
    for name in ["forward","fd","backward","bk","back","left","lt","right","rt","penup","pu","up",
                 "pendown","pd","down","goto","setpos","setposition","setx","sety","setheading","seth",
                 "heading","position","pos","xcor","ycor","home","circle","color","pencolor","fillcolor",
                 "pensize","width","begin_fill","end_fill","speed","shape","hideturtle","ht",
                 "showturtle","st","write","stamp","dot","clear","reset"]:
        setattr(mod, name, _delegate(name))
    mod.bgcolor = lambda c=None: st.__setitem__("bg", c or st["bg"])
    for name in ["done","mainloop","exitonclick","title","setup","tracer","update","hideturtle"]:
        if not hasattr(mod, name):
            setattr(mod, name, lambda *a, **k: None)
    mod.__hai_state__ = st
    return mod

def _hai_svg(st):
    pts = []
    for s in st["segs"]:
        pts += [(s[0], s[1]), (s[2], s[3])]
    for poly, _c in st["fills"]:
        pts += poly
    if not pts:
        return ""
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    pad = 20
    minx, maxx, miny, maxy = min(xs) - pad, max(xs) + pad, min(ys) - pad, max(ys) + pad
    w = max(maxx - minx, 1); h = max(maxy - miny, 1)
    def tx(x): return round(x - minx, 1)
    def ty(y): return round(maxy - y, 1)
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %s %s" preserveAspectRatio="xMidYMid meet" style="background:%s">' % (round(w,1), round(h,1), st["bg"])]
    for poly, c in st["fills"]:
        out.append('<polygon points="%s" fill="%s" stroke="none"/>' % (" ".join("%s,%s" % (tx(x), ty(y)) for x, y in poly), c))
    for x1, y1, x2, y2, c, wd in st["segs"]:
        out.append('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s" stroke-linecap="round"/>' % (tx(x1), ty(y1), tx(x2), ty(y2), c, wd))
    out.append("</svg>")
    return "".join(out)

def _hai_run(code, stdin_json, echo, setup, seed):
    values = [str(v) for v in json.loads(stdin_json or "[]")]
    used = [0]
    out = io.StringIO()
    def _inp(prompt=""):
        if echo:
            out.write(str(prompt))
        if not values:
            raise EOFError("The program asked for more input than was given. Add another line to the input box.")
        v = values.pop(0)
        used[0] += 1
        if echo:
            out.write(v + "\n")
        return v
    tmod = _hai_make_turtle()
    sys.modules["turtle"] = tmod
    if isinstance(seed, (int, float)) and not isinstance(seed, bool) and seed >= 0:
        random.seed(seed)
    steps = [0]
    def _tracer(frame, event, arg):
        if event == "line":
            steps[0] += 1
            if steps[0] > 300000:
                raise _HaiStop("Your program ran for too long. Check for a loop that never ends.")
        return _tracer
    old_input = builtins.input
    builtins.input = _inp
    err = ""
    try:
        with contextlib.redirect_stdout(out):
            if setup:
                exec(compile(setup, "setup.py", "exec"), {"__name__": "__setup__"})
            g = {"__name__": "__main__"}
            sys.settrace(_tracer)
            try:
                exec(compile(code, "main.py", "exec"), g)
            finally:
                sys.settrace(None)
    except SystemExit:
        pass
    except BaseException as e:
        line = None
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "main.py":
                line = fr.lineno
        msg = "".join(traceback.format_exception_only(type(e), e)).strip()
        if isinstance(e, _HaiStop):
            msg = str(e)
        err = ("Line %s: " % line if line else "") + msg
    finally:
        builtins.input = old_input
    st = tmod.__hai_state__
    return json.dumps({
        "out": out.getvalue(),
        "err": err,
        "used": used[0],
        "turtle": {"lines": len(st["segs"]), "circles": st["circles"], "fills": len(st["fills"]),
                    "colors": len(set(s[4] for s in st["segs"]) | set(c for _p, c in st["fills"]))},
        "svg": _hai_svg(st),
    })
`;

export interface TurtleCheck {
  minLines?: number;
  minCircles?: number;
  minFills?: number;
  minColors?: number;
}

export interface HarnessResult {
  out: string;
  err: string;
  used: number;
  turtle: { lines: number; circles: number; fills: number; colors: number };
  svg: string;
}

export interface GradableTest {
  input: string;
  expected: string;
  keywords?: string[];
  allowEof?: boolean;
}

/** Lower-case, collapse whitespace and drop punctuation (decimal points survive). */
export const looseText = (s: string) =>
  s
    .toLowerCase()
    .replace(/\r\n/g, "\n")
    .replace(/[’‘]/g, "'")
    .replace(/(?<!\d)\.|\.(?!\d)/g, " ")
    .replace(/[^\p{L}\p{N}_.\-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** One keyword: "re:<regex>" | "a|b" alternatives | plain text, matched on word boundaries. */
const keywordMatcher = (kw: string): RegExp => {
  if (kw.startsWith("re:")) {
    let src = kw.slice(3);
    let flags = "i";
    if (src.startsWith("(?m)")) {
      src = src.slice(4);
      flags = "im";
    }
    return new RegExp(src, flags);
  }
  const alts = kw.split("|").map((a) => {
    const l = looseText(a);
    const suffix = /^-?\d+$/.test(l) ? "(?:\\.0+)?" : /^-?\d+\.\d+$/.test(l) ? "\\d*" : "";
    return `(?:^| )${escapeRe(l)}${suffix}(?= |$)`;
  });
  return new RegExp(alts.join("|"));
};

/** Keywords must all appear, in order. Regex keywords are checked anywhere in the raw output. */
export const matchesKeywords = (output: string, keywords: string[]) => {
  if (keywords.length === 0) return output.trim() !== "";
  let rest = looseText(output);
  for (const kw of keywords) {
    const re = keywordMatcher(kw);
    if (kw.startsWith("re:")) {
      if (!re.test(output)) return false;
      continue;
    }
    const m = re.exec(rest);
    if (!m) return false;
    rest = rest.slice(m.index + m[0].length);
  }
  return true;
};

export const passesTest = (res: HarnessResult, test: GradableTest, turtle?: TurtleCheck) => {
  if (res.err && !(test.allowEof && res.err.includes("EOFError"))) return false;
  if (test.input.trim() && res.used === 0) return false;
  if (turtle) {
    const t = res.turtle;
    return (
      t.lines >= (turtle.minLines ?? 0) &&
      t.circles >= (turtle.minCircles ?? 0) &&
      t.fills >= (turtle.minFills ?? 0) &&
      t.colors >= (turtle.minColors ?? 0)
    );
  }
  if (looseText(res.out) === looseText(test.expected)) return true;
  if (test.keywords) return matchesKeywords(res.out, test.keywords);
  return false;
};

export const stdinLines = (text: string) => (text === "" ? [] : text.replace(/\r\n/g, "\n").split("\n"));
