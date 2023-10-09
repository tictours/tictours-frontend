export const formatDate = (date, type = "en-CA") => {
  const value = new Date(date).toLocaleDateString(type); // formated date
  return value;
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
