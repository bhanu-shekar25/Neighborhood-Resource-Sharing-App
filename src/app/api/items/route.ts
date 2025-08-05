import { NextRequest, NextResponse } from 'next/server';
import { mockItems } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(mockItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'owner', 'condition', 'image'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new item
    const newItem = {
      id: `itm${String(mockItems.length + 1).padStart(3, '0')}`,
      name: body.name,
      description: body.description,
      category: body.category,
      owner: body.owner,
      condition: body.condition,
      available: true,
      image: body.image,
      borrowedBy: null
    };

    // In a real app, this would be saved to a database
    mockItems.push(newItem);

    // Mock random success/failure
    const success = Math.random() > 0.2; // 80% success rate

    if (success) {
      return NextResponse.json({
        success: true,
        item: newItem,
        message: 'Item added successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to add item. Please try again.'
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}