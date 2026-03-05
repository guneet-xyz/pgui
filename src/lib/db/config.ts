import type { ServerConfig } from "@/types/database"

/**
 * Parse DB_N_* environment variables into ServerConfig objects.
 * Scans for DB_1_*, DB_2_*, DB_3_*, ... stopping at the first gap.
 *
 * Each group configures a Postgres *server*, not a specific database.
 * The app discovers databases automatically by connecting to the
 * `postgres` maintenance database on each server.
 */
export function getServerConfigs(): ServerConfig[] {
  const configs: ServerConfig[] = []

  for (let i = 1; ; i++) {
    const prefix = `DB_${i}_`
    const name = process.env[`${prefix}NAME`]
    const host = process.env[`${prefix}HOST`]
    const user = process.env[`${prefix}USER`]
    const password = process.env[`${prefix}PASSWORD`]

    // Stop scanning when we hit a gap (no NAME or HOST defined for this index)
    if (!name && !host) {
      break
    }

    if (!host || !user) {
      console.warn(
        `Server config DB_${i} is incomplete (missing HOST or USER). Skipping.`,
      )
      continue
    }

    configs.push({
      id: String(i),
      name: name || `Server ${i}`,
      host,
      port: parseInt(process.env[`${prefix}PORT`] || "5432", 10),
      user,
      password: password || "",
      ssl: process.env[`${prefix}SSL`] === "true",
    })
  }

  return configs
}

export function getServerConfig(id: string): ServerConfig | undefined {
  return getServerConfigs().find((c) => c.id === id)
}
