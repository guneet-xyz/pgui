import { NextResponse } from "next/server"
import { getServerConfig } from "@/lib/db/config"
import { getTables } from "@/lib/db/queries"

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ serverId: string; dbName: string; schema: string }>
  },
) {
  const { serverId, dbName, schema } = await params
  const config = await getServerConfig(serverId)

  if (!config) {
    return NextResponse.json({ error: "Server not found" }, { status: 404 })
  }

  try {
    const tables = await getTables(
      config,
      decodeURIComponent(dbName),
      decodeURIComponent(schema),
    )
    return NextResponse.json(tables)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load tables" },
      { status: 500 },
    )
  }
}
