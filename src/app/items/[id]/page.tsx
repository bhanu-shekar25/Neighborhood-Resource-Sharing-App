'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Package, 
  CheckCircle, 
  XCircle,
  Loader2
} from 'lucide-react';
import { Item } from '@/lib/data';
import Link from 'next/link';

export default function ItemDetails() {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${itemId}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
      } else {
        router.push('/');
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch item:', error);
      setLoading(false);
      router.push('/');
    }
  };

  const handleBorrowRequest = async () => {
    if (!item) return;

    setBorrowing(true);
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        // Refresh item data
        await fetchItem();
        alert('Borrow request submitted successfully!');
      } else {
        alert(result.error || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit borrow request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Item not found.</p>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge 
                variant={item.available ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {item.available ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Borrowed
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            <p className="text-muted-foreground text-lg">{item.description}</p>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.owner}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.category}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Condition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.condition}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">
                  {item.available ? 'Available for borrowing' : 'Currently borrowed'}
                </p>
                {!item.available && item.borrowedBy && (
                  <p className="text-sm text-muted-foreground mt-1">
                    by {item.borrowedBy}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          <Card>
            <CardContent className="pt-6">
              {item.available ? (
                <Button 
                  onClick={handleBorrowRequest} 
                  disabled={borrowing}
                  className="w-full"
                  size="lg"
                >
                  {borrowing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    'Request to Borrow'
                  )}
                </Button>
              ) : (
                <Button disabled className="w-full" size="lg" variant="secondary">
                  <XCircle className="h-4 w-4 mr-2" />
                  Not Available
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Please return items in the same condition you received them</li>
                <li>• Coordinate pickup and return times with the owner</li>
                <li>• Be respectful of the owner's property</li>
                <li>• Report any damages immediately</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}