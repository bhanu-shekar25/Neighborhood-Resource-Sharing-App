import { NextRequest, NextResponse } from 'next/server';
import { mockItems } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = mockItems.find(item => item.id === params.id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = mockItems.find(item => item.id === params.id);
    
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    if (!item.available) {
      return NextResponse.json(
        { error: 'Item is not available for borrowing' },
        { status: 400 }
      );
    }

    // Mock random success/failure
    const success = Math.random() > 0.2; // 80% success rate

    if (success) {
      // Update item availability
      item.available = false;
      item.borrowedBy = "Current User"; // Mock user

      return NextResponse.json({
        success: true,
        status: "requested",
        message: 'Borrow request submitted successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to submit request. Please try again.'
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}