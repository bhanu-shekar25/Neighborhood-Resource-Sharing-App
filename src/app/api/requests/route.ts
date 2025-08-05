import { NextResponse } from 'next/server';
import { mockRequests } from '@/lib/bonus-data';

export async function GET() {
  try {
    return NextResponse.json(mockRequests);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}