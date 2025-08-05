import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              Oops! The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>This might have happened because:</p>
              <ul className="list-disc list-inside space-y-1 text-left max-w-xs mx-auto">
                <li>You mistyped the URL</li>
                <li>The page was moved or deleted</li>
                <li>There was a temporary server issue</li>
                <li>You don't have permission to access this page</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Items
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please contact our support team or try refreshing the page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}