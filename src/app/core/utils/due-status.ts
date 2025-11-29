export function getDueStatus(dueDate: string | null): string {
  if (!dueDate) return 'NoDueDate';

  const due = new Date(dueDate);

  if (isNaN(due.getTime())) return 'NoDueDate';

  const now = new Date();
  const diffDays = Math.round((due.getTime() - now.getTime()) / 86400000);

  if (diffDays > 0) return `${diffDays} days left`;
  if (diffDays === 0) return 'Due today';
  return `${Math.abs(diffDays)} days overdue`;
}
