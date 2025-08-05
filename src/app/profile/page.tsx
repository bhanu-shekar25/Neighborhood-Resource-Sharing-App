'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  User, 
  Star, 
  Package, 
  Calendar, 
  Edit,
  Save,
  X,
  TrendingUp,
  Award,
  MessageCircle,
  MapPin
} from 'lucide-react';
import { TrustScore } from '@/lib/bonus-data';
import { Item } from '@/lib/data';
import Link from 'next/link';

export default function Profile() {
  const [trustScore, setTrustScore] = useState<TrustScore | null>(null);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    joinedDate: '2024-01-01'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trustResponse, itemsResponse] = await Promise.all([
        fetch('/api/trust-score/usr123'),
        fetch('/api/items')
      ]);

      const trustData = await trustResponse.json();
      const itemsData = await itemsResponse.json();

      setTrustScore(trustData);
      setUserItems(itemsData.filter((item: Item) => item.owner === trustData.name));
      
      // Set profile data
      setProfileData({
        name: trustData.name,
        email: 'alice.johnson@email.com',
        bio: 'I love sharing items with my neighbors and building community spirit!',
        location: 'Block A, Sector 45',
        joinedDate: '2024-01-01'
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    // Mock save - in a real app, this would call an API
    setEditing(false);
    alert('Profile updated successfully!');
  };

  const getTrustLevel = (score: number) => {
    if (score >= 9.5) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 8.0) return { level: 'Great', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 6.0) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!trustScore) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load profile.</p>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const trustLevel = getTrustLevel(trustScore.trustScore);

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
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and view your community statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                {!editing ? (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {new Date(profileData.joinedDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trust Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">
                    {trustScore.trustScore}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                  </div>
                </div>
                <Badge className={`${trustLevel.bg} ${trustLevel.color} border-current`}>
                  {trustLevel.level}
                </Badge>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(trustScore.trustScore / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on community feedback and borrowing history
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats and Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {trustScore.lendingCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Items Lent</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {trustScore.borrowingCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Items Borrowed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {trustScore.positiveFeedback}%
                  </div>
                  <div className="text-sm text-muted-foreground">Positive Feedback</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Items ({userItems.length})
              </CardTitle>
              <CardDescription>
                Items you've shared with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't shared any items yet.
                  </p>
                  <Link href="/add-item">
                    <Button>Add Your First Item</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="pt-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.category} • {item.condition}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant={item.available ? "default" : "secondary"}>
                                {item.available ? "Available" : "Borrowed"}
                              </Badge>
                              <Link href={`/items/${item.id}`}>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Community Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium">First Share</p>
                  <p className="text-xs text-muted-foreground">Shared your first item</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium">Trusted Lender</p>
                  <p className="text-xs text-muted-foreground">5+ items lent</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">Good Communicator</p>
                  <p className="text-xs text-muted-foreground">Prompt responses</p>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Community Hero</p>
                  <p className="text-xs text-muted-foreground">10+ items shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}