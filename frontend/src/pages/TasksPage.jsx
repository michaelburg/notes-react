import React, { useEffect } from "react";
import NotePlaceholder from "../components/NotePlaceholder";
import TaskList from "../components/TaskList";
import { useTasks } from "../TasksContext";

function TasksPage() {
  const { tasks, error, fetchTasks } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks();
    };

    fetchData();
  }, [fetchTasks]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <NotePlaceholder />
      <TaskList tasks={tasks.filter((task) => task.isPinned)} />
      <TaskList tasks={tasks.filter((task) => !task.isPinned)} />
    </>
  );
}

export default TasksPage;
