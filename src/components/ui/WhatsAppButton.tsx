"use client";

import { Button, ButtonProps } from "./Button";
import { brand } from "@/config/data";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps extends ButtonProps {
  message?: string;
}

export function WhatsAppButton({
  className,
  message = brand.whatsappMessage,
  children,
  ...props
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      {...props}
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      {children || "Hubungi via WhatsApp"}
    </Button>
  );
}
