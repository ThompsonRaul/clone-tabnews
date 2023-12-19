test("GET to /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const resBody = await response.json();

  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();
  expect(resBody.updated_at).toEqual(parsedUpdatedAt);

  expect(resBody.dependencies.database.db_version).toEqual("16.0");
  expect(resBody.dependencies.database.max_connections).toEqual(100);
  expect(resBody.dependencies.database.open_connections).toEqual(1);
});
