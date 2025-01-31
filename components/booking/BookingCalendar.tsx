'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';

const  BookingCalendar = () => {

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const {toast} = useToast()

  // to block reserved days if user reserved day 1 to 10. no one else can reserve the same cabinet at the same time
  const currentDate = new Date();
  const bookings = useProperty((state) => state.bookings)
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  })

  const unavailableDates = generateDisabledDates(blockedPeriods)


  useEffect(() => {
    const selectedRange = generateDateRange(range)
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if(unavailableDates[date]) {
        setRange(defaultSelected)
        toast({
          description: 'Some dates are booked. Please select again'
        })
        return true
      }
      return false
    })
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;