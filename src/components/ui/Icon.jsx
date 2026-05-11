import React from 'react';
import HeartActive from '@/assets/icons/heart-active.svg?react';
import HeartLost from '@/assets/icons/heart-lost.svg?react';
import StarActive from '@/assets/icons/star-active.svg?react';
import StarInactive from '@/assets/icons/star-inactive.svg?react';
import PauseIcon from '@/assets/icons/pause.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import LockIcon from '@/assets/icons/lock.svg?react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import CheckIcon from '@/assets/icons/check.svg?react';
import XMark from '@/assets/icons/x-mark.svg?react';
import EyeIcon from '@/assets/icons/eye.svg?react';
import BookIcon from '@/assets/icons/book.svg?react';
import InfoIcon from '@/assets/icons/info.svg?react';

const iconMap = {
  'heart-active': HeartActive,
  'heart-lost': HeartLost,
  'star-active': StarActive,
  'star-inactive': StarInactive,
  'pause': PauseIcon,
  'play': PlayIcon,
  'lock': LockIcon,
  'arrow-left': ArrowLeft,
  'check': CheckIcon,
  'x-mark': XMark,
  'eye': EyeIcon,
  'book': BookIcon,
  'info': InfoIcon,
};

export default function Icon({ name, size = 24, className = '' }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component width={size} height={size} className={className} />;
}
