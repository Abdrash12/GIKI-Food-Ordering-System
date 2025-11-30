import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, ArrowLeft } from 'lucide-react';

interface OTPVerificationProps {
  onVerify: () => void;
  onBack?: () => void;
}

export function OTPVerification({ onVerify, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto verify when all 4 digits are entered
    if (newOtp.every(digit => digit !== '')) {
      handleVerify(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (otpArray: string[]) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        onVerify();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col px-6">
      {onBack && !isVerified && (
        <div className="pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ backgroundColor: '#F7F8FA' }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isVerified ? 1 : 0.95 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mb-8"
        >
          {isVerified ? (
            <CheckCircle2 className="w-24 h-24" style={{ color: '#10B981' }} />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#007AFF10' }}
            >
              <Shield className="w-12 h-12" style={{ color: '#007AFF' }} />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-gray-900 mb-3">
            {isVerified ? 'Verified!' : 'Enter OTP'}
          </h1>
          <p className="text-gray-600">
            {isVerified 
              ? 'Delivery confirmed successfully' 
              : 'Ask the student for their 4-digit OTP'}
          </p>
        </motion.div>

        {!isVerified && (
          <>
            <div className="flex gap-4 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center rounded-2xl border-2 border-gray-200 focus:border-[#007AFF] outline-none transition-colors text-gray-900"
                  style={{ backgroundColor: '#F7F8FA' }}
                  disabled={isVerifying}
                />
              ))}
            </div>

            {isVerifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-gray-600"
              >
                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#007AFF' }} />
                <span>Verifying...</span>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}