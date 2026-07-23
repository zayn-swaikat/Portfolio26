export async function getStats() {
  const response = await fetch("/api/stats");

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}