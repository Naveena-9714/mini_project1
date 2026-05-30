import React, { useState, useEffect } from "react";

const STUDENTS_KEY = "students";
const SESSION_KEY = "student_session";

function getStudents() {
  return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];
}

function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function saveSession(student) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(student));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function Signup({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    course: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  
  function handleSubmit(event) {
    event.preventDefault();

    const students = getStudents();
    const studentExists = students.find((student) => student.email === form.email);

    if (studentExists) {
      alert("Student already registered");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: form.name,
      roll: form.roll,
      course: form.course,
      email: form.email,
      password: form.password,
    };

    saveStudents([...students, newStudent]);
    alert("Signup Successful");

    setForm({
      name: "",
      roll: "",
      course: "",
      email: "",
      password: "",
    });

    setPage("login");
  }

  return (
    <div className="container">
      <div className="box">
        <div className="header-title">
          <span>Student</span>
          <span>Signup</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="roll"
            placeholder="Enter Roll Number"
            value={form.roll}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Enter Course"
            value={form.course}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p className="footer-text">
          Already have account?{" "}
          <span className="link-text" onClick={() => setPage("login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

function Login({ setPage, setStudent }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const students = getStudents();
    const foundStudent = students.find(
      (student) => student.email === form.email && student.password === form.password
    );

    if (!foundStudent) {
      alert("Invalid Email or Password");
      return;
    }

    saveSession(foundStudent);
    setStudent(foundStudent);
    alert("Login Successful");

    setForm({
      email: "",
      password: "",
    });

    setPage("dashboard");
  }

  return (
    <div className="container">
      <div className="box">
        <div className="header-title">
          <span>Student</span>
          <span>Login</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="footer-text">
          Don't have account?{" "}
          <span className="link-text" onClick={() => setPage("signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ student, logout }) {
  return (
    <div className="container">
      <div className="box dashboard-box">
        <div className="header-title">
          <span>Student</span>
          <span>Dashboard</span>
        </div>

        <h2 className="welcome-msg">Welcome, {student.name}!</h2>
        
        <div className="dashboard-details">
          <p><strong>Roll No:</strong> {student.roll}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Email:</strong> {student.email}</p>
        </div>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("signup");
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setStudent(session);
      setPage("dashboard");
    }
  }, []);

  function logout() {
    clearSession();
    setStudent(null);
    setPage("login");
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #5BC0BE; 
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      .box {
        width: 350px;
        background: white;
        padding: 30px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        text-align: center;
      }

      .header-title {
        display: flex;
        flex-direction: column;
        gap: 4px; 
        font-size: 28px;
        font-weight: bold;
        color: #333;
        margin-bottom: 25px;
        line-height: 1.2;
      }

      input {
        width: 100%;
        padding: 12px;
        margin-top: 12px;
        border: 1px solid #444;
        background-color: #3a3a3a; 
        color: #ffffff;            
        border-radius: 5px;
        box-sizing: border-box;
      }

      input::placeholder {
        color: rgba(255, 255, 255, 0.75); 
        opacity: 1;
      }

      button {
        width: 100%;
        padding: 12px;
        margin-top: 20px;
        border: none;
        background: #F3E5AB; 
        color: #4A3E1B; 
        font-weight: 800;    
        font-size: 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.2s;
      }

      button:hover {
        background: #EEDC9A; 
      }

      .welcome-msg {
        color: #222;
        font-weight: 800; 
        margin-bottom: 15px;
        font-size: 20px;
      }

      .dashboard-details p {
        font-size: 15px;
        margin: 10px 0;
        color: #444;
        font-weight: 700; 
      }

      .dashboard-details strong {
        color: #000;
        font-weight: 900; 
      }

      .footer-text {
        margin-top: 15px;
        color: #666;
      }

      .link-text {
        color: #5BC0BE; 
        cursor: pointer;
        font-weight: bold;
      }
      
      .link-text:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }

  if (page === "login") {
    return <Login setPage={setPage} setStudent={setStudent} />;
  }

  return <Dashboard student={student} logout={logout} />;
}