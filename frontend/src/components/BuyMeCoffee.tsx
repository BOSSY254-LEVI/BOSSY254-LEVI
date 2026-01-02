import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Loader2 } from 'lucide-react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BuyMeCoffee() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState(500); // Default amount
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const coffeeOptions = [
    { amount: 200, label: '☕ Small Coffee', emoji: '☕' },
    { amount: 500, label: '☕ Coffee', emoji: '☕' },
    { amount: 1000, label: '☕☕ Double Coffee', emoji: '☕☕' },
    { amount: 2000, label: '🍫 Coffee & Snack', emoji: '🍫' },
    { amount: 5000, label: '🍔 Coffee & Meal', emoji: '🍔' },
  ];

  const handleBuyCoffee = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/payment/initiate', {
        email: email,
        amount: amount,
        description: message || 'Buy me a coffee',
      });

      console.log('Payment response:', response.data);

      // Handle different response structures
      const authUrl = response.data?.data?.authorization_url || 
                     response.data?.authorization_url || 
                     response.data?.url;

      if (authUrl) {
        window.location.href = authUrl;
      } else {
        console.error('No authorization URL found:', response.data);
        alert('Payment initiated! Check your email for payment link.');
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      console.error('Failed to initiate payment:', error);
      alert(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
        >
          <Coffee className="w-4 h-4" />
          Buy me a coffee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            Support my work
          </DialogTitle>
          <DialogDescription>
            Your support helps me continue creating amazing content. Thank you! 💛
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Coffee Options */}
          <div className="space-y-3">
            <Label>Choose your coffee</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {coffeeOptions.map((option) => (
                <Button
                  key={option.amount}
                  type="button"
                  variant={amount === option.amount ? "default" : "outline"}
                  className={`flex flex-col h-auto py-3 ${
                    amount === option.amount 
                      ? 'bg-amber-600 hover:bg-amber-700' 
                      : ''
                  }`}
                  onClick={() => setAmount(option.amount)}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-sm font-medium mt-1">
                    KES {option.amount}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Or custom amount (KES)</Label>
            <Input
              id="custom-amount"
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-center text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Minimum: KES 100
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email for receipt</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Optional message (optional)</Label>
            <Input
              id="message"
              type="text"
              placeholder="Keep up the great work! 🚀"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleBuyCoffee}
            disabled={isLoading || !email}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Coffee className="mr-2 h-4 w-4" />
                Support with KES {amount}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}