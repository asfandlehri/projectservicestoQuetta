
import React from 'react';
import { BookingStatus } from '../types';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const styles = {
    [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-700',
    [BookingStatus.ACCEPTED]: 'bg-blue-100 text-blue-700',
    [BookingStatus.ON_THE_WAY]: 'bg-indigo-100 text-indigo-700',
    [BookingStatus.COMPLETED]: 'bg-green-100 text-green-700',
    [BookingStatus.CANCELLED]: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};
