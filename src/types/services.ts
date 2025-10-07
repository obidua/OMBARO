export type AttendanceStatus = 'present' | 'absent' | 'on-leave' | 'half-day';

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  notes?: string;
}

export const ATTENDANCE_STATUS: Record<AttendanceStatus, { label: string; color: string }> = {
  present: { label: 'Present', color: '#22C55E' },
  absent: { label: 'Absent', color: '#EF4444' },
  'on-leave': { label: 'On Leave', color: '#F59E0B' },
  'half-day': { label: 'Half Day', color: '#3B82F6' },
};

export interface MassageService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  benefits: string[];
  image: string;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

export const SERVICE_CATEGORIES = [
  { id: 'relaxation', name: 'Relaxation', icon: '🧘', color: '#8B5CF6' },
  { id: 'therapeutic', name: 'Therapeutic', icon: '💆', color: '#3B82F6' },
  { id: 'deep-tissue', name: 'Deep Tissue', icon: '💪', color: '#EF4444' },
  { id: 'aromatherapy', name: 'Aromatherapy', icon: '🌸', color: '#EC4899' },
  { id: 'hot-stone', name: 'Hot Stone', icon: '🔥', color: '#F59E0B' },
  { id: 'couple', name: 'Couple', icon: '💑', color: '#10B981' },
];

export const MASSAGE_CATALOG: MassageService[] = [
  {
    id: 'swedish',
    name: 'Swedish Massage',
    description: 'Gentle, relaxing massage using long strokes and kneading',
    duration: 60,
    price: 2999,
    category: 'relaxation',
    benefits: ['Stress relief', 'Improved circulation', 'Muscle relaxation'],
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Massage',
    description: 'Firm pressure massage targeting deep muscle layers',
    duration: 75,
    price: 3499,
    category: 'therapeutic',
    benefits: ['Pain relief', 'Muscle recovery', 'Injury rehabilitation'],
    image: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Massage',
    description: 'Relaxing massage with essential oils for mind and body',
    duration: 60,
    price: 3299,
    category: 'aromatherapy',
    benefits: ['Stress reduction', 'Mood enhancement', 'Better sleep'],
    image: 'https://images.pexels.com/photos/3865906/pexels-photo-3865906.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Massage',
    description: 'Therapeutic massage using heated smooth stones',
    duration: 90,
    price: 3999,
    category: 'hot-stone',
    benefits: ['Deep relaxation', 'Pain relief', 'Improved circulation'],
    image: 'https://images.pexels.com/photos/8142019/pexels-photo-8142019.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'thai',
    name: 'Thai Massage',
    description: 'Traditional massage with stretching and acupressure',
    duration: 90,
    price: 3799,
    category: 'therapeutic',
    benefits: ['Flexibility', 'Energy boost', 'Stress relief'],
    image: 'https://images.pexels.com/photos/6663324/pexels-photo-6663324.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'couple-massage',
    name: 'Couple Massage',
    description: 'Side-by-side massage experience for two',
    duration: 60,
    price: 5499,
    category: 'couple',
    benefits: ['Bonding time', 'Shared relaxation', 'Quality time'],
    image: 'https://images.pexels.com/photos/3865905/pexels-photo-3865905.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'foot-scrub',
    name: 'Foot Scrub',
    description: 'Exfoliating treatment for smooth, soft feet',
    price: 599,
    duration: 20,
    image: 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    description: 'Relaxing scalp and head massage',
    price: 499,
    duration: 15,
    image: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'aromatherapy-upgrade',
    name: 'Premium Aromatherapy',
    description: 'Upgrade with luxury essential oil blends',
    price: 799,
    duration: 0,
    image: 'https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'hot-compress',
    name: 'Hot Compress',
    description: 'Therapeutic heat treatment for sore muscles',
    price: 399,
    duration: 10,
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];
