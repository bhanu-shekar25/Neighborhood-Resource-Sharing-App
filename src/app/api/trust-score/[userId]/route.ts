import { NextResponse } from 'next/server';
import { mockTrustScore } from '@/lib/bonus-data';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // In a real app, you would fetch data based on the userId
    // For now, we'll return the mock data
    return NextResponse.json(mockTrustScore);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trust score' },
      { status: 500 }
    );
  }
}