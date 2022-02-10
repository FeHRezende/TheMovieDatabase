const convertMinutesToHours = (minutes) => {
  const hours = parseInt(minutes / 60);
  minutes = minutes % 60;
  return `${hours}h ${minutes > 10 ? minutes : '0'+minutes}m`;
};

export { convertMinutesToHours };
