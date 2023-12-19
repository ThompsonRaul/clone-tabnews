import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const dbName = process.env.POSTGRES_DB;
  const openConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [dbName],
  });
  const openConnectionsValue = openConnections.rows[0].count;
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        db_version: dbVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        open_connections: openConnectionsValue,
      },
    },
  });
}

export default status;
