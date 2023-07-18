import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dashName = searchParams.get('dashName');
  const ownerName = searchParams.get('ownerName');
 
  try {
    if (!dashName || !ownerName) throw new Error('DashName and Owner names required');
    await sql`INSERT INTO Dashboards (Name, Owner) VALUES (${dashName}, ${ownerName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Dashboards;`;
  return NextResponse.json({ pets }, { status: 200 });
}