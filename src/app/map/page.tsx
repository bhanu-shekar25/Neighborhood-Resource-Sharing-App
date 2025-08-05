'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  MapPin, 
  Filter, 
  Package, 
  User,
  Search,
  Maximize2,
  Navigation
} from 'lucide-react';
import { MapItem  } from '@/lib/bonus-data';
import { Item, categories } from '@/lib/data';
import Link from 'next/link';

interface MapLocation extends MapItem {
  available?: boolean;
}

export default function MapView() {
  const [mapItems, setMapItems] = useState<MapLocation[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredMapItems, setFilteredMapItems] = useState<MapLocation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MapLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterMapItems();
  }, [mapItems, allItems, selectedCategory, availabilityFilter]);

  const fetchData = async () => {
    try {
      const [mapResponse, itemsResponse] = await Promise.all([
        fetch('/api/map-items'),
        fetch('/api/items')
      ]);

      const mapData = await mapResponse.json();
      const itemsData = await itemsResponse.json();

      setMapItems(mapData);
      setAllItems(itemsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch map data:', error);
      setLoading(false);
    }
  };

  const filterMapItems = () => {
    let filtered = mapItems.map(mapItem => {
      const item = allItems.find(item => item.id === mapItem.itemId);
      return {
        ...mapItem,
        available: item?.available
      };
    });

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

    setFilteredMapItems(filtered);
  };

  const getPinColor = (available?: boolean) => {
    return available ? 'bg-green-500' : 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Map View</h1>
        <p className="text-muted-foreground">
          Explore items available in your neighborhood
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
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
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Neighborhood Map
                </span>
                <Button variant="outline" size="sm">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Fullscreen
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
                {/* Mock Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
                  {/* Grid lines for streets */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-px bg-gray-400 left-1/4"></div>
                    <div className="h-full w-px bg-gray-400 left-2/4"></div>
                    <div className="h-full w-px bg-gray-400 left-3/4"></div>
                    <div className="w-full h-px bg-gray-400 top-1/4"></div>
                    <div className="w-full h-px bg-gray-400 top-2/4"></div>
                    <div className="w-full h-px bg-gray-400 top-3/4"></div>
                  </div>

                  {/* Map Pins */}
                  {filteredMapItems.map((item, index) => {
                    // Convert lat/lng to percentage positions for mock map
                    const latPercent = ((item.lat - 28.45) / 0.02) * 100;
                    const lngPercent = ((item.lng - 77.02) / 0.04) * 100;
                    
                    return (
                      <button
                        key={item.itemId}
                        className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${getPinColor(item.available)} ${selectedItem?.itemId === item.itemId ? 'ring-4 ring-blue-300 scale-125' : ''}`}
                        style={{
                          left: `${lngPercent}%`,
                          top: `${latPercent}%`
                        }}
                        onClick={() => setSelectedItem(item)}
                        title={item.name}
                      >
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <div className="text-sm font-semibold mb-2">Legend</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Borrowed</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Item Details */}
          {selectedItem ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {selectedItem.name}
                </CardTitle>
                <CardDescription>
                  {selectedItem.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="outline">{selectedItem.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant={selectedItem.available ? "default" : "secondary"}>
                      {selectedItem.available ? "Available" : "Borrowed"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedItem.address}</span>
                  </div>
                  <div className="pt-2">
                    <Link href={`/items/${selectedItem.itemId}`}>
                      <Button className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Click on a map pin to view item details</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Items List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Items on Map
              </CardTitle>
              <CardDescription>
                {filteredMapItems.length} items found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredMapItems.map((item, index) => (
                  <button
                    key={item.itemId}
                    className={`w-full text-left p-2 rounded-lg border transition-colors hover:bg-gray-50 ${selectedItem?.itemId === item.itemId ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${getPinColor(item.available)}`}></div>
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.address}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}