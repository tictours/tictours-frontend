export const formatDate = (date, type = "en-CA") => {
  const value = new Date(date).toLocaleDateString(type); // formated date
  return value;
};
export const parseDate = (date) => {
  if(date){
  const value = new Date(date); // parse date
    return value;
  }
};

export const dateComparison = (date) => {
  // Create a date object representing today's date
  const today = new Date();
  
  // Create a date object for the date you want to compare (replace with your desired date)
  const otherDate = new Date(date); // This is just an example, replace it with your date

  // Compare the two date objects
  const isGreaterThanToday = otherDate > today;
  return isGreaterThanToday
  }

export const formatTimeToHis = (timeString) => {
  const [hours, minutes] = timeString.split(':');

  // Create a new Date object
  const time = new Date();
  time.setHours(parseInt(hours, 10));
  time.setMinutes(parseInt(minutes, 10));

  // Format the time as "H:i:s"
  const formattedTime = time.toTimeString().split(' ')[0];
  return formattedTime
}
export const parseTime = (time) => {
  const [hr, min] = time.split(':');
  const parse = `${hr}:${min}`
  return parse
};
