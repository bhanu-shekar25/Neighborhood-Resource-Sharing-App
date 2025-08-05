'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  Package, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  Bell
} from 'lucide-react';
import { BorrowRequest } from '@/lib/bonus-data';
import Link from 'next/link';

export default function MyRequests() {
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests');
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setLoading(false);
    }
  };

  const handleCancelRequest = async (requestId: string) => {
    if (!confirm('Are you sure you want to cancel this request?')) {
      return;
    }

    try {
      // Mock API call - in a real app, this would call a cancel endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setRequests(prev => prev.filter(req => req.id !== requestId));
      alert('Request cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel request:', error);
      alert('Failed to cancel request. Please try again.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'returned':
        return <RotateCcw className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'approved':
        return 'default';
      case 'returned':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">My Borrow Requests</h1>
        <p className="text-muted-foreground">
          Track the status of your borrowing requests
        </p>
      </div>

      {/* Notifications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Your request for "Camping Tent" has been approved!</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span>Pending approval for "Cordless Drill"</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any borrowing requests yet.
              </p>
              <Link href="/">
                <Button>Browse Items</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.itemName}</CardTitle>
                    <CardDescription>
                      Request ID: {request.id}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(request.status)} className="flex items-center gap-1">
                    {getStatusIcon(request.status)}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Requested by: {request.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Item ID: {request.itemId}</span>
                  </div>
                </div>

                {/* Status-specific actions and messages */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {request.status === 'pending' && (
                      <p className="text-yellow-600">
                        Your request is waiting for approval from the owner.
                      </p>
                    )}
                    {request.status === 'approved' && (
                      <p className="text-green-600">
                        Your request has been approved! Please coordinate with the owner for pickup.
                      </p>
                    )}
                    {request.status === 'returned' && (
                      <p className="text-blue-600">
                        Item has been returned. Thank you for using our community sharing platform!
                      </p>
                    )}
                    {request.status === 'rejected' && (
                      <p className="text-red-600">
                        Your request was not approved. Please feel free to request other items.
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelRequest(request.id)}
                      >
                        Cancel Request
                      </Button>
                    )}
                    {request.status === 'approved' && (
                      <Button variant="outline" size="sm">
                        Mark as Returned
                      </Button>
                    )}
                    <Link href={`/items/${request.itemId}`}>
                      <Button variant="ghost" size="sm">
                        View Item
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Statistics */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Request Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {requests.filter(r => r.status === 'returned').length}
              </div>
              <div className="text-sm text-muted-foreground">Returned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}