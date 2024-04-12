function combineAndSortLatestData(obj1, obj2) {
  // Combine data from obj2 into obj1
  Object.keys(obj2).forEach((date) => {
    // If date exists in obj1, update the value if obj2's value is later
    if (obj1.hasOwnProperty(date)) {
      const time1 = new Date(obj1[date]).getTime();
      const time2 = new Date(obj2[date]).getTime();
      if (time2 > time1) {
        obj1[date] = obj2[date];
      }
    } else {
      // Add date-value pair to obj1
      obj1[date] = obj2[date];
    }
  });

  // Sort keys in obj1 and retain only the latest time for each day
  const sortedKeys = Object.keys(obj1).sort(
    (a, b) => new Date(b) - new Date(a)
  ); // Sort keys in descending order

  const result = {};
  sortedKeys.forEach((key) => {
    const currentDate = new Date(key).toDateString();
    // Check if the current date is already added, if not, add it to the result
    if (!result[currentDate]) {
      result[currentDate] = obj1[key];
    }
  });

  // Update obj1 with sorted and filtered result
  Object.keys(obj1).forEach((key) => {
    delete obj1[key];
  });

  Object.assign(obj1, result);
  return obj1;
}

module.exports = combineAndSortLatestData;

// // Example objects
// let obj1 = {
//     "Fri Dec 01 2023 05:30:00 GMT+0530 (India Standard Time)": 34,
//     "Thu Nov 30 2023 05:30:00 GMT+0530 (India Standard Time)": 35,
//     "Wed Nov 29 2023 05:30:00 GMT+0530 (India Standard Time)": 34,
//     "Wed Nov 26 2023 05:30:00 GMT+0530 (India Standard Time)": 20,
// };
// let obj2 = {
//     "Fri Dec 01 2023 04:30:00 GMT+0530 (India Standard Time)": 0,
//     "Thu Nov 30 2023 06:30:00 GMT+0530 (India Standard Time)": 40,
//     "Wed Nov 29 2023 05:30:00 GMT+0530 (India Standard Time)": 34,
//     "Wed Nov 28 2023 05:30:00 GMT+0530 (India Standard Time)": 30,
// };

// // Call the function to combine and sort latest data
// combineAndSortLatestData(obj1, obj2);

// // Output the updated obj1
// console.log(obj1);
