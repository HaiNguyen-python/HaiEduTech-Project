import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const topics = [
  {
    titleVi: "Biến và Kiểu dữ liệu",
    titleEn: "Variables & Data Types",
    code: `# Variables & Data Types
name = "HaiEduTech"          # str
age = 25                  # int
gpa = 3.85                # float
is_student = True         # bool
skills = ["Python", "AI"] # list

print(f"Name: {name}, Age: {age}")
print(type(gpa))  # <class 'float'>`,
    noteVi: "Python tự nhận diện kiểu dữ liệu, không cần khai báo kiểu.",
    noteEn: "Python infers types automatically — no type declaration needed.",
  },
  {
    titleVi: "Vòng lặp For & While",
    titleEn: "For & While Loops",
    code: `# For loop
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

# While loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# List comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, ...]`,
    noteVi: "List comprehension giúp viết code ngắn gọn và pythonic hơn.",
    noteEn: "List comprehension makes code more concise and Pythonic.",
  },
  {
    titleVi: "Hàm (Functions)",
    titleEn: "Functions",
    code: `# Basic function
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Hai"))        # Hello, Hai!
print(greet("Hai", "Hi"))  # Hi, Hai!

# Lambda function
double = lambda x: x * 2
print(double(5))  # 10

# *args and **kwargs
def info(*args, **kwargs):
    print(args)    # tuple
    print(kwargs)  # dict`,
    noteVi: "Hàm giúp tái sử dụng code. *args nhận nhiều đối số, **kwargs nhận keyword arguments.",
    noteEn: "Functions enable code reuse. *args for positional, **kwargs for keyword arguments.",
  },
  {
    titleVi: "Dictionary & Set",
    titleEn: "Dictionary & Set",
    code: `# Dictionary
student = {
    "name": "An",
    "age": 16,
    "scores": [8.5, 9.0, 7.5]
}
print(student["name"])      # An
student["grade"] = "10A"    # Add key

# Dictionary comprehension
squares = {x: x**2 for x in range(6)}

# Set - no duplicates
unique = {1, 2, 2, 3, 3}
print(unique)  # {1, 2, 3}`,
    noteVi: "Dictionary lưu dữ liệu key-value. Set tự loại bỏ phần tử trùng.",
    noteEn: "Dictionaries store key-value pairs. Sets auto-remove duplicates.",
  },
  {
    titleVi: "Xử lý File & Exception",
    titleEn: "File Handling & Exceptions",
    code: `# Writing to file
with open("notes.txt", "w") as f:
    f.write("Hello from Python!")

# Reading file
with open("notes.txt", "r") as f:
    content = f.read()
    print(content)

# Exception handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("Done.")`,
    noteVi: "Luôn dùng 'with' khi mở file để tự động đóng. Try-except bắt lỗi runtime.",
    noteEn: "Always use 'with' for file operations. Try-except catches runtime errors.",
  },
];

const PythonReview = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-foreground">
            🐍 Python Review
          </h3>
          <p className="text-sm text-muted-foreground">Essential knowledge recap</p>
        </div>
      </div>

      <div className="space-y-3">
        {topics.map((topic, i) => (
          <div key={i} className="bg-secondary rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-3 text-left"
            >
              <span className="font-semibold text-foreground">{topic.titleEn}</span>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4">
                <pre className="bg-background rounded-lg p-4 text-sm text-foreground overflow-x-auto mb-3">
                  <code>{topic.code}</code>
                </pre>
                <p className="text-sm text-primary font-medium">💡 {t(topic.noteVi, topic.noteEn)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PythonReview;
