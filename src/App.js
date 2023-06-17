import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTasks] = useState({
    description: "",
    date: "",
    time: "",
    assignUser: "",
  });

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const url = "https://stage.api.sloovi.com/login?product=outreach";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = {
      email: "smithwills1989@gmail.com",
      password: "12345678",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      const accessToken = data.results.token;
      const companyId = data.results.company_id;

      setAccessToken(accessToken);
      setCompanyId(companyId);

      fetchTeamMembers(accessToken, companyId);
      addTaskRequest(accessToken, companyId);
      getAllTasks(accessToken, companyId);
      getTaskByIdRequest(accessToken, companyId);
      updateTaskRequest(accessToken, companyId);
      deleteTaskRequest(accessToken, companyId);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const fetchTeamMembers = async (accessToken, companyId) => {
    const url = `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      console.log("fetchTeamMembers:", data);
      console.log("fetchTeamMembers data:", data.results.data);
      const teamMembers = data.results.data;

      setTeamMembers(teamMembers);
    } catch (error) {
      console.error("Fetch team members error:", error);
    }
  };

  const getAllTasks = async (accessToken, companyId) => {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      console.log("getAllTasks:", data.results);
      // console.log("getAllTasks data:", data.results.data);
      const tasks = data.results;

      setTasks(tasks);
    } catch (error) {
      console.error("Get all tasks error:", error);
    }
  };

  const addTask = async () => {
    const assignedUserId = teamMembers.length > 0 ? teamMembers[0].id : "";
    console.log("AssignedUserId:", assignedUserId);
    const taskDate = "2023-06-16";
    const taskTime = 9000;
    const isCompleted = 0;
    const timeZone = 19800;
    const taskMsg = "Update the status of this month projects";

    await addTaskRequest(
      assignedUserId,
      taskDate,
      taskTime,
      isCompleted,
      timeZone,
      taskMsg,
      accessToken,
      companyId
    );
  };

  const addTaskRequest = async (
    assignedUserId,
    taskDate,
    taskTime,
    isCompleted,
    timeZone,
    taskMsg,
    accessToken,
    companyId
  ) => {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = {
      assigned_user: assignedUserId,
      task_date: taskDate,
      task_time: taskTime,
      is_completed: isCompleted,
      time_zone: timeZone,
      task_msg: taskMsg,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Task added successfully:", data);
    } catch (error) {
      console.error("Add task error:", error);
    }
  };

  async function getTaskById(taskId) {
    await getTaskByIdRequest(taskId, accessToken, companyId);
  }

  async function getTaskByIdRequest(taskId, accessToken, companyId) {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      console.log("getTaskByIdRequest:", data);
      // const task = data.results.id;

      // console.log("taskId:", task);
    } catch (error) {
      console.error("Get task by ID error:", error);
    }
  }

  async function updateTask(taskId) {
    const assignedUserId = teamMembers.length > 0 ? teamMembers[0].id : "";
    console.log("AssignedUserId for update:", assignedUserId);
    const taskDate = "2023-06-18";
    const taskTime = 9500;
    const isCompleted = 0;
    const timeZone = 19800;
    const taskMsg = "Update the status of last week projects";

    await updateTaskRequest(
      taskId,
      assignedUserId,
      taskDate,
      taskTime,
      isCompleted,
      timeZone,
      taskMsg
    );
  }

  async function updateTaskRequest(
    taskId,
    assignedUserId,
    taskDate,
    taskTime,
    isCompleted,
    timeZone,
    taskMsg
  ) {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = {
      assigned_user: assignedUserId,
      task_date: taskDate,
      task_time: taskTime,
      is_completed: isCompleted,
      time_zone: timeZone,
      task_msg: taskMsg,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Task updated successfully:", data);
    } catch (error) {
      console.error("Update task error:", error);
    }
  }

  async function deleteTask(taskId) {
    await deleteTaskRequest(taskId, accessToken, companyId);
  }

  async function deleteTaskRequest(taskId, accessToken, companyId) {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`;
    const headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      const data = await response.json();
      console.log("Task deleted successfully:", data);
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  const cancelAddTask = () => {
    
    setNewTasks({
      description: '',
      date: '',
      time: '',
      assignUser: ''
    });
  };

  return (
    <div className="container">
      <h2>Access Token: {accessToken}</h2>
      <h2>Company ID: {companyId}</h2>

      <div className="section">
        <h2>Team Members</h2>
        <ol>
          {teamMembers &&
            teamMembers.map((member) => <li key={member.id}>{member.name}</li>)}
        </ol>
      </div>

      <div className="section">
        <h2>Tasks</h2>
        <ol>
          {tasks && tasks.map((task) => <li key={task.id}>{task.task_msg}</li>)}
        </ol>
      </div>

      <div className="section">
            <h2>Add New Task</h2>
            <form className="task-form">

              <div>
                <label htmlFor="description">Task Description:</label>
                <input type="text" id="description" value={newTask.description} onChange={(e) => setNewTasks({...newTask, description: e.target.value})} />
              </div>

              <div>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" value={newTask.date} onChange={(e) => setNewTasks({...newTask, date: e.target.value})} />
              </div>

              <div>
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" value={newTask.time} onChange={(e) => setNewTasks({...newTask, time: e.target.value})} />
              </div>

              <div>
                <label htmlFor="assignUser">Assign User:</label>
                <select
                 id="assignUSer"
                 value={newTask.assignUser}
                 onChange={(e) => setNewTasks({...newTask, assignUser: e.target.value})}
                >
                  <option value="">Select User</option>
                  {teamMembers &&
                    teamMembers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                </select>
              </div>

              <div className="button">
                <button type="button" onClick={addTask}>Save</button>
                <button type="button" onClick={cancelAddTask}>Cancel</button>
              </div>



            </form>
      </div>




{/* Manual check for this fucnction */}



      <div className="button">
        <button onClick={addTask}>Add Task</button>
        <button
          onClick={() => getTaskById("task_d95f285df698407f8b1adca670b6b994")}
        >
          Get Task by ID
        </button>
        <button
          onClick={() => updateTask("task_d95f285df698407f8b1adca670b6b994")}
        >
          Update Task
        </button>
        <button
          onClick={() => deleteTask("task_c05514e1664340738132f14d4f9ddb4e")}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default App;
