import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Coffee, CreditCard, Smartphone } from 'lucide-react';
import axios from 'axios';

// Load Paystack Inline.js
declare global {
  interface Window {
    PaystackPop: any;
  }
}

export function DirectPaymentForm() {
  const [amount, setAmount] = useState(500);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card');

  // Debug Paystack key on mount
   useEffect(() => {
    console.log('=== PAYSTACK DEBUG INFO ===');
    console.log('Public Key exists:', !!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
    console.log('Public Key length:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.length);
    console.log('Public Key first chars:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.substring(0, 10));
    console.log('Public Key type:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.startsWith('pk_test_') ? 'TEST' : 
    import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.startsWith('pk_live_') ? 'LIVE' : 'UNKNOWN');
    console.log('API URL:', import.meta.env.VITE_API_URL);
  }, 
  []);

  // Paystack configuration
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handlePayment = async () => {
    console.log('🚀 Starting payment process...');
    
    // Validation
    if (!email) {
      alert('📧 Please enter your email');
      return;
    }

    if (paymentMethod === 'mpesa' && !phone) {
      alert('📱 Please enter your MPESA phone number');
      return;
    }

    // Validate phone for MPESA
    if (paymentMethod === 'mpesa') {
      const phoneRegex = /^(07|\+2547|2547)\d{8}$/;
      if (!phoneRegex.test(phone)) {
        alert('📱 Please enter a valid MPESA phone number (e.g., 0712345678)');
        return;
      }
    }

    setIsLoading(true);

    try {
      console.log('📝 Step 1: Creating payment record...');
      
      // Step 1: Create payment record on backend
      const createResponse = await axios.post(`${API_URL}/api/payment/simple`, {
        email,
        amount,
      });

      console.log('✅ Backend response:', createResponse.data);

      if (!createResponse.data.success) {
        throw new Error(createResponse.data.message);
      }

      const { reference } = createResponse.data.data;
      console.log('💰 Reference generated:', reference);

      // Step 2: Initialize Paystack payment
      console.log('🎯 Step 2: Initializing Paystack...');
      
      // Format phone for MPESA
      let formattedPhone = phone;
      if (paymentMethod === 'mpesa') {
        // Convert to +254 format if needed
        if (phone.startsWith('07')) {
          formattedPhone = `+254${phone.substring(1)}`;
        } else if (phone.startsWith('2547')) {
          formattedPhone = `+${phone}`;
        }
      }

      // Paystack configuration
      const paystackConfig: any = {
        key: publicKey,
        email: email,
        amount: amount * 100, // 🚨 CRITICAL: Multiply by 100 for kobo
        reference: reference,
        currency: 'KES',
        metadata: {
          custom_fields: [
            {
              display_name: "Support Type",
              variable_name: "support_type",
              value: "Coffee Donation"
            }
          ]
        },
        
        onClose: () => {
          console.log('❌ Payment modal closed by user');
          setIsLoading(false);
        },
        
        callback: async (response: any) => {
          console.log('✅ Paystack callback received:', response);
          
          try {
            // Verify payment with backend
            const verifyResponse = await axios.get(
              `${API_URL}/api/payment/verify/${response.reference}`
            );
            
            console.log('✅ Verification response:', verifyResponse.data);
            
            if (verifyResponse.data.success) {
              alert('🎉 Thank you for your support! Payment successful.');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('❌ Verification error:', error);
            alert('Payment completed but verification failed. We\'ll check manually.');
          } finally {
            setIsLoading(false);
          }
        }
      };

      // Add payment method specific config
      if (paymentMethod === 'mpesa') {
        paystackConfig.channels = ['mobile_money'];
        paystackConfig.mobile_money = {
          phone: formattedPhone,
          provider: 'mpesa'
        };
      } else {
        paystackConfig.channels = ['card'];
      }

      console.log('🔧 Paystack config:', {
        ...paystackConfig,
        key: paystackConfig.key?.substring(0, 15) + '...' // Hide full key
      });

      // Check if Paystack is loaded
      if (!window.PaystackPop) {
        console.error('❌ Paystack not loaded in window');
        alert('Payment system not ready. Please refresh the page.');
        setIsLoading(false);
        return;
      }

      // Initialize Paystack
      const handler = window.PaystackPop.setup(paystackConfig);
      
      // Add error handling
      handler.openIframe();

    } catch (error: any) {
      console.error('❌ Payment error:', error);
      
      let errorMessage = 'Payment failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  const quickAmounts = [200, 500, 1000, 2000];

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 border rounded-lg shadow-lg bg-white">
      <div className="text-center">
        <Coffee className="w-12 h-12 mx-auto text-amber-600" />
        <h2 className="text-2xl font-bold mt-4">Buy Me a Coffee</h2>
        <p className="text-gray-600 mt-2">Quick support in just 2 steps</p>
      </div>

      {/* Amount Selection */}
      <div>
        <p className="font-medium mb-2">Choose amount (KES)</p>
        <div className="grid grid-cols-2 gap-2">
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              type="button"
              variant={amount === amt ? "default" : "outline"}
              className={`py-3 ${amount === amt ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
              onClick={() => setAmount(amt)}
            >
              {amt}
            </Button>
          ))}
        </div>
        
        <div className="mt-4">
          <Input
            type="number"
            placeholder="Or enter custom amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="100"
            className="text-center"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum: KES 100</p>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <p className="font-medium mb-2">Payment Method</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Card
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'mpesa' ? "default" : "outline"}
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => setPaymentMethod('mpesa')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            MPESA
          </Button>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email for receipt *
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* MPESA Phone (only shown for MPESA) */}
      {paymentMethod === 'mpesa' && (
        <div>
          <label className="block text-sm font-medium mb-2">
            MPESA Phone Number *
          </label>
          <Input
            type="tel"
            placeholder="07XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Format: 0712345678</p>
        </div>
      )}

      {/* Debug Info Button */}
      <Button
        variant="outline"
        onClick={() => {
          console.log('=== DEBUG INFO ===');
          console.log('Amount:', amount);
          console.log('Amount in kobo:', amount * 100);
          console.log('Email:', email);
          console.log('Phone:', phone);
          console.log('Payment Method:', paymentMethod);
          console.log('Public Key exists:', !!publicKey);
          alert('Debug info logged to console');
        }}
        className="w-full"
      >
        Show Debug Info
      </Button>

      {/* Pay Button */}
      <Button
        onClick={handlePayment}
        disabled={isLoading || !email || (paymentMethod === 'mpesa' && !phone)}
        className="w-full py-6 text-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Coffee className="w-5 h-5 mr-2" />
            Pay KES {amount}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Secure payment powered by Paystack. Your card details are never stored.
      </p>
    </div>
  );
}