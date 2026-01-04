import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BuyMeCoffee() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState(500); // Amount in KES

  const coffeeOptions = [
    { amount: 200, label: '☕ Small Coffee', emoji: '☕' },
    { amount: 500, label: '☕ Coffee', emoji: '☕' },
    { amount: 1000, label: '☕☕ Double Coffee', emoji: '☕☕' },
    { amount: 2000, label: '🍫 Coffee & Snack', emoji: '🍫' },
    { amount: 5000, label: '🍔 Coffee & Meal', emoji: '🍔' },
  ];

  // Paystack configuration - Use your PUBLIC KEY from .env
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const componentProps = {
    email: "supporter@example.com", // In a real app, you might collect this
    amount: amount * 100, // Paystack expects amount in kobo (multiply by 100)
    metadata: {
      custom_fields: [
        {
          display_name: "Donation For",
          variable_name: "donation_for",
          value: "Portfolio Support",
        }
      ]
    },
    publicKey,
    text: `Pay KES ${amount}`,
    onSuccess: (reference: any) => {
      // Payment was successful!
      console.log('Payment successful!', reference);
      alert(`Thank you for your support! Transaction reference: ${reference.reference}`);
      setIsDialogOpen(false); // Close the dialog
      // Here you can call your backend to verify the payment
    },
    onClose: () => {
      // User closed the payment modal
      alert("Payment was canceled. You can try again anytime!");
    },
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
            Quick Support
          </DialogTitle>
          <DialogDescription>
            Choose an amount and pay securely in one step.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Coffee Options - Simplified */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Choose your support</p>
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

          {/* Direct Payment Button */}
          <div className="pt-4">
            <PaystackButton 
              {...componentProps}
              className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
            />
            <p className="text-xs text-center text-muted-foreground mt-2">
              You'll be prompted for card or MPESA details. It's secure and fast.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}