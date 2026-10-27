import { MessageCircle } from "lucide-react";
import { brand } from "@/config/data";

export const whatsappHref = `https://wa.me/${brand.phone.replace(/\D/g, "")}?text=${encodeURIComponent(brand.whatsappMessage)}`;

/** Always-visible shortcut to chat with the team — the fastest path for most customers. */
export function FloatingWhatsApp() {
  return <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="floating-wa" aria-label="Chat dengan tim Kirim Mobilku via WhatsApp">
    <MessageCircle size={22} strokeWidth={2} />
    <span>Tanya via WhatsApp</span>
  </a>;
}
