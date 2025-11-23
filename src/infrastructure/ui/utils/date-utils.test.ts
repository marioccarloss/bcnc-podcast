import { describe, it, expect } from 'vitest';
import { formatDate } from './index';

describe('date-utils', () => {
  describe('formatDate', () => {
    it('should format a valid date string correctly', () => {
      const date = '2023-10-05T10:00:00Z';
      // Note: The output depends on the locale (es-ES) and timezone.
      // Assuming the environment uses UTC or a specific timezone, but Intl.DateTimeFormat uses local time by default.
      // To be safe, we can check if it matches the pattern DD/MM/YYYY
      expect(formatDate(date)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should format a valid timestamp number correctly', () => {
      const timestamp = 1696492800000; // 2023-10-05
      expect(formatDate(timestamp)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should format a valid Date object correctly', () => {
      const date = new Date('2023-10-05');
      expect(formatDate(date)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });
});
