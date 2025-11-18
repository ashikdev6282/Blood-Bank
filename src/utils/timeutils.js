export const generateTimeOptions = () => {
    const times = [];
    const periods = ['AM', 'PM'];
  
    periods.forEach((period) => {
      for (let hour = 1; hour <= 12; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const hr = hour.toString().padStart(2, '0');
          const min = minute.toString().padStart(2, '0');
          times.push(`${hr}:${min} ${period}`);
        }
      }
    });
  
    return times;
  };
  