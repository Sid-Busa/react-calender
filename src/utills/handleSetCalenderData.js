import API from "../API/axios";
import "../App.css";

export const handleSetCalenderData = async (year, month, handleToggle) => {
  // fetch data by using year and month
  try {
    const getDataByYeatAndMonth = await API(`/timing/${year}/${month}`);

    // if month did not have any session then do nothing
    if (!getDataByYeatAndMonth.status) return false;

    const datesSession = getDataByYeatAndMonth.timing.dates;

    // arrange dates session into proper formate
    const newData = datesSession.map((item) => {
      const day = item.date;
      let arrangeNewData = [];
      item.data.map((item) => {
        // convert hour and min from 10:AM/PM to 24 formate
        var hrs = Number(item.time.match(/^(\d+)/)[1]);
        var mnts = Number(item.time.match(/:(\d+)/)[1]);
        var format = item.time.match(/\s(.*)$/)[1];
        if (format === "PM" && hrs < 12) hrs = hrs + 12;
        if (format === "AM" && hrs === 12) hrs = hrs - 12;
        var hours = hrs.toString();
        var minutes = mnts.toString();
        if (hrs < 10) hours = "0" + hours;
        if (mnts < 10) minutes = "0" + minutes;

        let StartTime = new Date(year, month - 1, day, hours, minutes);
        let EndTime = new Date(StartTime);
        EndTime.setMinutes(StartTime.getMinutes() + parseInt(item.duration));

        arrangeNewData = [
          ...arrangeNewData,
          {
            ...item,
            Subject: item.session_name,
            StartTime,
            EndTime,
            Description:`<button class="register_user" onClick="${handleToggle}" > Register </button>`,
            time: `${day}-${month}-${year}`,
          },
        ];
      });
      return arrangeNewData;
    });

    // merge dates because it containe array inside arrsay
    const mergeData = [].concat.apply([], newData);

    return mergeData;
  } catch (e) {
    return false;
  }
};
