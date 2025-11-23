import { describe, it, expect } from 'vitest';
import { formatDuration } from './time-utils';

describe('time-utils', () => {
  describe('formatDuration', () => {
    it('should format milliseconds to MM:SS when less than an hour', () => {
      const millis = 65000; // 1 minute 5 seconds
      expect(formatDuration(millis)).toBe('01:05');
    });

    it('should format milliseconds to HH:MM:SS when more than an hour', () => {
      const millis = 3665000; // 1 hour 1 minute 5 seconds
      expect(formatDuration(millis)).toBe('1:01:05');
    });

    it('should return --:-- for undefined', () => {
      expect(formatDuration(undefined)).toBe('--:--');
    });

    it('should return --:-- for NaN', () => {
      expect(formatDuration(NaN)).toBe('--:--');
    });

    it('should handle zero correctly', () => {
        expect(formatDuration(0)).toBe('00:00');
    });
  });
});
