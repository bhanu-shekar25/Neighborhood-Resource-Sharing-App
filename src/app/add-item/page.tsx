'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Package, Upload, Loader2 } from 'lucide-react';
import { categories, conditions } from '@/lib/data';
import Link from 'next/link';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    owner: 'Current User', // Mock user
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Item added successfully!');
        router.push('/');
      } else {
        alert(result.error || 'Failed to add item. Please try again.');
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateRandomImage = () => {
    const seeds = ['item', 'product', 'tool', 'household', 'gadget', 'equipment'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/seed/${randomSeed}/400/300.jpg`;
    handleInputChange('image', imageUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>
      </Link>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Item</h1>
          <p className="text-muted-foreground">
            Share your items with the neighborhood community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Item Information
            </CardTitle>
            <CardDescription>
              Fill in the details about the item you want to share
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Cordless Drill, Camping Tent"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your item, its features, and any important details..."
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Category and Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'All').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select 
                    value={formData.condition} 
                    onValueChange={(value) => handleInputChange('condition', value)}
                  >
                    <SelectTrigger className={errors.condition ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && (
                    <p className="text-sm text-red-500">{errors.condition}</p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={errors.image ? 'border-red-500' : ''}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateRandomImage}
                    className="whitespace-nowrap"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Random
                  </Button>
                </div>
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Enter a URL to an image of your item, or click "Random" to generate a placeholder
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="space-y-2">
                  <Label>Image Preview</Label>
                  <div className="aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding Item...
                    </>
                  ) : (
                    'Add Item to Community'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tips for Sharing Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be honest about the condition of your items</li>
              <li>• Include clear photos that show the item's actual state</li>
              <li>• Mention any special instructions or requirements</li>
              <li>• Respond to borrowing requests promptly</li>
              <li>• Establish clear return expectations with borrowers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}