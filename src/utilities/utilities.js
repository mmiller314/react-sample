export function getProjectById(projects, id) {
  const project = projects.filter(p => p.id == id);
  if (project.length) return project[0];
  return null;
}

export function getTaskById(tasks, id) {
  const task = tasks.filter(t => t.id == id);
  if (task.length) return task[0];
  return null;
}

export function sumTaskHours(tasks) {
  let total = 0;
  tasks.forEach(function(item, index) {
    total += parseInt(item.hours, 10);
  });

  return total;
}
