'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, Calendar, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { forwardRef, useState, useEffect, useRef } from 'react';

const dateRangePickerVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1',
        md: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3',
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof dateRangePickerVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  value?: DateRange;
  defaultValue?: DateRange;
  placeholder?: string;
  onDateRangeChange?: (dateRange: DateRange) => void;
  disabled?: boolean;
  required?: boolean;
  success?: boolean;
  minDate?: Date;
  maxDate?: Date;
  maxDays?: number; // Maximum number of days allowed in range
}

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      size,
      variant,
      label,
      error,
      helperText,
      leftIcon,
      value,
      defaultValue,
      placeholder = 'Select date range',
      onDateRangeChange,
      disabled,
      required,
      success,
      minDate,
      maxDate,
      maxDays,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<DateRange>(
      value || defaultValue || { startDate: null, endDate: null }
    );
    const [currentMonth, setCurrentMonth] = useState(
      internalValue.startDate || new Date()
    );
    const [selectingStart, setSelectingStart] = useState(true);
    const dateRangePickerRef = useRef<HTMLDivElement>(null);

    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const effectiveVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    const selectedRange = value !== undefined ? value : internalValue;
    
    const formatDateRange = (range: DateRange) => {
      if (!range.startDate && !range.endDate) return placeholder;
      
      const formatDate = (date: Date | null) => 
        date ? date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) : '';

      if (range.startDate && range.endDate) {
        return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
      } else if (range.startDate) {
        return `${formatDate(range.startDate)} - `;
      } else {
        return placeholder;
      }
    };

    const displayText = formatDateRange(selectedRange);

    const handleDateSelect = (date: Date) => {
      if (disabled) return;
      
      // Check min/max date constraints
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;

      const newRange = { ...selectedRange };

      if (selectingStart) {
        newRange.startDate = date;
        // If end date is before start date, clear it
        if (newRange.endDate && date > newRange.endDate) {
          newRange.endDate = null;
        }
        setSelectingStart(false);
      } else {
        // Selecting end date
        if (!newRange.startDate || date >= newRange.startDate) {
          // Check maxDays constraint
          if (maxDays && newRange.startDate) {
            const daysDiff = Math.ceil((date.getTime() - newRange.startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff > maxDays) return;
          }
          
          newRange.endDate = date;
          setIsOpen(false);
          setSelectingStart(true);
        } else {
          // If selected date is before start date, make it the new start date
          newRange.startDate = date;
          newRange.endDate = null;
        }
      }

      if (value === undefined) {
        setInternalValue(newRange);
      }
      onDateRangeChange?.(newRange);
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSelectingStart(true);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      const clearedRange = { startDate: null, endDate: null };
      
      if (value === undefined) {
        setInternalValue(clearedRange);
      }
      onDateRangeChange?.(clearedRange);
      setSelectingStart(true);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dateRangePickerRef.current && !dateRangePickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSelectingStart(true);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

    // Calendar logic
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      
      // If selecting end date and maxDays is set
      if (!selectingStart && maxDays && selectedRange.startDate) {
        const daysDiff = Math.ceil((date.getTime() - selectedRange.startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > maxDays) return true;
      }
      
      return false;
    };

    const isSameDate = (date1: Date, date2: Date | null) => {
      if (!date2) return false;
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const isDateInRange = (date: Date) => {
      if (!selectedRange.startDate || !selectedRange.endDate) return false;
      return date >= selectedRange.startDate && date <= selectedRange.endDate;
    };

    const isDateRangeStart = (date: Date) => {
      return isSameDate(date, selectedRange.startDate);
    };

    const isDateRangeEnd = (date: Date) => {
      return isSameDate(date, selectedRange.endDate);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        if (direction === 'prev') {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isSelected = isDateRangeStart(date) || isDateRangeEnd(date);
        const isInRange = isDateInRange(date);
        const isStart = isDateRangeStart(date);
        const isEnd = isDateRangeEnd(date);
        const isDisabled = isDateDisabled(date);
        const isToday = isSameDate(date, new Date());

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => !isDisabled && handleDateSelect(date)}
            className={cn(
              'h-8 w-8 text-sm rounded hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring relative',
              isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90 z-10',
              isInRange && !isSelected && 'bg-primary/20 text-primary',
              isStart && 'rounded-r-none',
              isEnd && 'rounded-l-none',
              isToday && !isSelected && !isInRange && 'font-semibold text-primary',
              isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current'
            )}
            disabled={isDisabled}
          >
            {day}
          </button>
        );
      }

      return days;
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative" ref={dateRangePickerRef}>
          <div
            ref={ref}
            className={cn(
              dateRangePickerVariants({ size, variant: effectiveVariant }),
              leftIcon && 'pl-10',
              'pr-3 justify-between items-center min-w-0',
              isOpen && !disabled && 'ring-ring ring-2 ring-offset-2',
              className,
            )}
            onClick={handleToggle}
            role="button"
            aria-expanded={isOpen}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            {...props}
          >
            <span className={cn('truncate flex-1', !selectedRange.startDate && !selectedRange.endDate && 'text-muted-foreground')}>
              {displayText}
            </span>

            <div className="flex items-center space-x-1 flex-shrink-0">
              {hasError && <AlertCircle className="h-4 w-4 text-destructive" />}
              {hasSuccess && <Check className="h-4 w-4 text-green-500" />}
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {leftIcon && (
            <div className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              disabled ? "text-muted-foreground/50" : "text-muted-foreground"
            )}>
              {leftIcon}
            </div>
          )}

          {isOpen && !disabled && (
            <div className="absolute top-full z-50 mt-1 w-80 rounded-md border border-input bg-background shadow-lg p-3">
              {/* Selection Status */}
              <div className="mb-3 p-2 bg-muted rounded text-xs text-muted-foreground">
                {selectingStart ? '시작일을 선택해주세요' : '종료일을 선택해주세요'}
                {maxDays && ` (최대 ${maxDays}일)`}
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-accent rounded"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="font-semibold">
                  {currentMonth.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>
                
                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-accent rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="h-8 w-8 text-xs font-medium text-muted-foreground flex items-center justify-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendar()}
              </div>

              {/* Action buttons */}
              <div className="mt-3 pt-3 border-t border-border flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </button>
                
                {selectedRange.startDate && (
                  <button
                    type="button"
                    onClick={() => setSelectingStart(true)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Select start date
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';

export { DateRangePicker, dateRangePickerVariants };