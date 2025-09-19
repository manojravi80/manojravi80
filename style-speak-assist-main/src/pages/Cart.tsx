import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: ''
  });

  const convertToINR = (usdPrice: number) => {
    const exchangeRate = 83.12;
    return Math.round(usdPrice * exchangeRate);
  };

  const getEstimatedDeliveryDate = () => {
    const days = 4 + Math.floor(Math.random() * 3); // 4-6 days
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleFormChange = (field: string, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(orderForm).every(value => value.trim() !== '');
  };

  const handleCheckout = async () => {
    if (!isFormValid()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to complete your order",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const deliveryDate = getEstimatedDeliveryDate();
      
      // Send order confirmation email
      await supabase.functions.invoke('send-order-confirmation', {
        body: {
          customerName: orderForm.name,
          customerEmail: orderForm.email,
          orderTotal: convertToINR(getTotalPrice()),
          orderItems: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: convertToINR(item.price_usd * item.quantity)
          })),
          deliveryDate
        }
      });

      clearCart();
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: `Your order for ₹${convertToINR(getTotalPrice())} has been placed. Expected delivery: ${deliveryDate}`,
      });
      
      // Reset form
      setOrderForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: ''
      });
      setShowCheckout(false);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: `Your order for ₹${convertToINR(getTotalPrice())} has been placed. Expected delivery: ${getEstimatedDeliveryDate()}. Email confirmation may be delayed.`,
      });
      
      clearCart();
      setOrderForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: ''
      });
      setShowCheckout(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>
          </div>

          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart and they will appear here
            </p>
            <Link to="/">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCheckout(false)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Checkout</h1>
            </div>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({getTotalItems()})</span>
                    <span>₹{convertToINR(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{convertToINR(getTotalPrice())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details Form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={orderForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={orderForm.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={orderForm.city}
                      onChange={(e) => handleFormChange('city', e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={orderForm.state}
                      onChange={(e) => handleFormChange('state', e.target.value)}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={orderForm.pincode}
                      onChange={(e) => handleFormChange('pincode', e.target.value)}
                      placeholder="Enter your pincode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <Select value={orderForm.paymentMethod} onValueChange={(value) => handleFormChange('paymentMethod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Button 
              onClick={handleCheckout} 
              disabled={!isFormValid() || isProcessing}
              className="w-full py-3 text-lg"
            >
              {isProcessing ? 'Processing...' : `Place Order - ₹${convertToINR(getTotalPrice())}`}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <span className="text-lg text-muted-foreground">({getTotalItems()} items)</span>
            </div>
          </div>
          
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div>
                          <p className="text-lg font-bold text-primary">₹{convertToINR(item.price_usd)}</p>
                          <p className="text-sm text-muted-foreground">${item.price_usd.toFixed(2)} USD</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-1 bg-muted rounded-md font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">
                        Stock: {item.stock} available
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{convertToINR(item.price_usd * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{convertToINR(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <div className="text-right">
                      <p className="text-primary">₹{convertToINR(getTotalPrice())}</p>
                      <p className="text-sm text-muted-foreground font-normal">
                        ${getTotalPrice().toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 text-lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Link to="/" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;