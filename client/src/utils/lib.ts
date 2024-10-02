

export const dateToString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (getMonth() returns 0-based index)
    const year = date.getFullYear(); // Get full year
  
    return `${day}-${month}-${year}`;
  };

export const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number); // Split by '-' and convert each part to a number
    return new Date(year, month - 1, day); // Create a Date object (month is 0-indexed)
  };