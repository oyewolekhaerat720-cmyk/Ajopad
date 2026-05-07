import { MdHome, MdGroup, MdWork, MdSchool, MdStar, MdHandshake, MdEmojiEvents, MdDiamond, MdDarkMode, MdAttachMoney, MdLocationCity } from "react-icons/md";

// Helper functions

export const helperFunction = () => {
  // Helper logic
};

export const formatMoney = (amount) => {
  return `₦${amount.toLocaleString()}`;
};

const ICON_MAP = {
  home: MdHome,
  group: MdGroup,
  work: MdWork,
  school: MdSchool,
  star: MdStar,
  handshake: MdHandshake,
  trophy: MdEmojiEvents,
  diamond: MdDiamond,
  moon: MdDarkMode,
  money: MdAttachMoney,
  location_city: MdLocationCity,
};

export const GROUP_ICON_KEYS = Object.keys(ICON_MAP);

export const getRandomGroupIcon = () => {
  const keys = GROUP_ICON_KEYS;
  return keys[Math.floor(Math.random() * keys.length)];
};

export const getGroupIcon = (iconName, props = {}) => {
  const Icon = ICON_MAP[iconName] || MdHome;
  return <Icon {...props} />;
};

const colorPalette = [
  { bg: '#FF6B6B', c: '#FFFFFF' },
  { bg: '#4ECDC4', c: '#FFFFFF' },
  { bg: '#45B7D1', c: '#FFFFFF' },
  { bg: '#96CEB4', c: '#FFFFFF' },
  { bg: '#FFEAA7', c: '#2D3436' },
  { bg: '#DDA0DD', c: '#FFFFFF' },
  { bg: '#98D8C8', c: '#FFFFFF' },
  { bg: '#F7DC6F', c: '#2D3436' },
  { bg: '#BB8FCE', c: '#FFFFFF' },
  { bg: '#85C1E9', c: '#FFFFFF' },
];

export const getColorForName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
};