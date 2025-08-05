'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, User, Calendar } from 'lucide-react';
import { Item, categories } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory, availabilityFilter]);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by availability
    if (availabilityFilter === 'Available') {
      filtered = filtered.filter(item => item.available);
    } else if (availabilityFilter === 'Borrowed') {
      filtered = filtered.filter(item => !item.available);
    }

    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Neighborhood Resource Sharing</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Borrow and lend household items with your neighbors
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/add-item">
            <Button>Add New Item</Button>
          </Link>
          <Link href="/my-requests">
            <Button variant="outline">My Requests</Button>
          </Link>
          <Link href="/map">
            <Button variant="outline">Map View</Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Items</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Borrowed">Borrowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={item.available ? "default" : "secondary"}>
                    {item.available ? "Available" : "Borrowed"}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{item.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Condition: {item.condition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{item.category}</span>
                  </div>
                  {!item.available && item.borrowedBy && (
                    <p className="text-sm text-muted-foreground">
                      Borrowed by: {item.borrowedBy}
                    </p>
                  )}
                </div>
                <Link href={`/items/${item.id}`} className="mt-4 block">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}