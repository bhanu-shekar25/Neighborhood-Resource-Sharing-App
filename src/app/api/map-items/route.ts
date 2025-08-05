import { NextResponse } from 'next/server';
import { mockMapItems } from '@/lib/bonus-data';

export async function GET() {
  try {
    return NextResponse.json(mockMapItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch map items' },
      { status: 500 }
    );
  }
}