import { Target, TrendingUp, Shield, Zap, Clock, Heart } from 'lucide-react';
import { BenefitItem } from '../types/global';

export const benefitsItemsData: BenefitItem[] = [
  { key: 'appetite', icon: Target, gradient: 'from-primary-500 to-primary-600' }, // New sage green gradient
  { key: 'weight', icon: TrendingUp, gradient: 'from-primary-400 to-secondary-400' }, // Softer blend of new primary and secondary
  { key: 'immunity', icon: Shield, gradient: 'from-secondary-500 to-secondary-600' }, // New soft blue gradient
  { key: 'energy', icon: Zap, gradient: 'from-brandOrange-400 to-brandOrange-500' }, // Using existing orange for a warm accent
  { key: 'metabolism', icon: Clock, gradient: 'from-primary-300 to-primary-500' }, // Lighter sage green gradient
  { key: 'mood', icon: Heart, gradient: 'from-pink-400 to-pink-500' } // Soft pink gradient for mood
];