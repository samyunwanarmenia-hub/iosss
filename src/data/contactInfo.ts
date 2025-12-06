import { MapPin, Phone, Clock } from 'lucide-react';
import { ContactInfoItem } from '../types/global';
import { CONTACT_ADDRESS_HTML, CONTACT_HOURS_HTML } from '@/config/siteConfig';

export const contactInfoData: ContactInfoItem[] = [
  {
    key: 'address',
    icon: MapPin,
    titleKey: 'address',
    details: CONTACT_ADDRESS_HTML,
    color: 'from-brandRed-500 to-brandOrange-500',
  }, // Using existing brand red/orange
  { 
    key: 'phone', 
    icon: Phone, 
    titleKey: 'phone', 
    details: '', // This will be replaced by t.contact.phoneNumbers.description in the component
    color: 'from-primary-500 to-secondary-500' // New sage green to soft blue gradient
  },
  {
    key: 'hours',
    icon: Clock,
    titleKey: 'hours',
    details: CONTACT_HOURS_HTML,
    color: 'from-purple-500 to-pink-500',
  }, // Using existing Tailwind purple/pink
];
