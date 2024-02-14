import React, { useState } from "react";
import "../components/Booking.css";

const Booking = () => {
  const [array2D, setArray2D] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 12 }, () => false))
  );
  const [showSlots, setShowSlots] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 12 }, () => 0))
  );
  const [doctorsList, setDoctorsList] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [userName, setUserName] = useState("");
  const [showbookingForm, setShowBookingForm] = useState(false);
  const [userDay, setUserDay] = useState("");
  const [userTime, setUserTime] = useState("");
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "",
    "8:00am",
    "8:45am",
    "9:30am",
    "10:15am",
    "11:00am",
    "11:45am",
    "12:30pm",
    "1:15pm",
    "2:00pm",
    "2:45pm",
    "3:30pm",
    "4:15pm",
  ];
  const timeSlotsmap = [
    "8:00am",
    "8:45am",
    "9:30am",
    "10:15am",
    "11:00am",
    "11:45am",
    "12:30pm",
    "1:15pm",
    "2:00pm",
    "2:45pm",
    "3:30pm",
    "4:15pm",
  ];

  const handleCheckboxChange = (rowIndex, cellIndex) => {
    const newArray2D = array2D.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === cellIndex ? !cell : cell)) : row
    );
    setArray2D(newArray2D);
  };

  // const handleCheckboxChangeUsers = (rowIndex, cellIndex) => {
  //   const newArray2Dd = showSlots.map((row, i) =>
  //     i === rowIndex ? row.map((cell, j) => (j === cellIndex ? --cell : cell)) : row
  //   );
  //   setShowSlots(newArray2Dd);
  // };

  const handleSubmitUser = (event) => {
    // console.log(userDay, " ", userTime);
    event.preventDefault();

    if (userName.length === 0) {
      alert("Please enter a Name");
    } else if (userDay.length === 0) {
      alert("Please select a day");
    } else if (userTime.length === 0) {
      alert("Please select a Time");
    } else {
      for (let i = 0; i < showSlots.length; i++) {
        for (let j = 0; j < showSlots[i].length; j++) {
          // console.log(showSlots[i][j]);
          if (i === parseInt(userDay) && j === parseInt(userTime) && showSlots[i][j] >= 1) {
            showSlots[i][j]--;
            alert(`Congrats ${userName.toUpperCase()}!!! Your slot has been Booked Succesfully`);
            setUserDay("");
            setUserTime("");
            setUserName("");
          } else if (i === parseInt(userDay) && j === parseInt(userTime) && showSlots[i][j] < 1) {
            alert("This Slot is not available please choose any other slot");
          }
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (doctorId.length === 0) {
      alert("please enter your Doctor Id");
    } else if (doctorName.length === 0) {
      alert("please enter your Doctor Name");
    } else {
      for (let i = 0; i < array2D.length; i++) {
        for (let j = 0; j < array2D[i].length; j++) {
          if (array2D[i][j] === true) {
            showSlots[i][j]++;
          }
        }
      }

      const obj = {
        doctorId: doctorId,
        doctorName: doctorName,
        timeSlots: array2D,
      };

      const newArray2D = Array.from({ length: 6 }, () => Array.from({ length: 12 }, () => false));
      setArray2D(newArray2D);
      setDoctorId("");
      setDoctorName("");

      setDoctorsList((doctorsList) => [...doctorsList, obj]);
      // console.log(doctorsList);
    }
  };

  const handleDoctoridChange = (event) => {
    setDoctorId(event.target.value);
    // console.log(doctorId);
  };

  const handleDoctornameChange = (event) => {
    setDoctorName(event.target.value);
    // console.log(doctorName);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    // console.log(userName);
  };

  const handleUserDay = (event) => {
    setUserDay(event.target.value);
    // console.log(userDay);
  };

  const handleUserTime = (event) => {
    setUserTime(event.target.value);
    // console.log(userTime);
  };

  const handleChangeShowFormToTrue = () => {
    setShowBookingForm(true); // Toggle the value
  };
  const handleChangeShowFormToFalse = () => {
    setShowBookingForm(false); // Toggle the value
  };

  useState(() => {}, []);

  return (
    <div>
      <div className="bg-gray-900 py-10" style={{ display: "flex", justifyContent: "center" }}>
        <div className="userChoice  bg-indigo-500 flex text-white font-medium border-gray-200 text-lg py-2 px-8 ">
          <div
            className="pr-5 hover:text-indigo-900"
            onClick={handleChangeShowFormToTrue}
            style={{ cursor: "pointer" }}
          >
            Users
          </div>
          <div
            className="pl-5 hover:text-indigo-900"
            onClick={handleChangeShowFormToFalse}
            style={{ cursor: "pointer" }}
          >
            Doctors
          </div>
        </div>
      </div>

      {showbookingForm && (
        <>
          <div
            className="min-w-screen bg-gray-900 flex items-center justify-center px-5 pb-28 pt-5"
            id="bookingformm"
          >
            <div
              className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
              style={{ maxWidth: "1100px" }}
            >
              <div className="w-full">
                <div className="p-5">
                  <h2 className="text-center py-5 font-bold text-2xl">
                    Select A Slot to Book Appointment
                  </h2>
                  <form onSubmit={handleSubmitUser}>
                    <div className="w-full px-3 mb-3 mt-2">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        User Name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          name="username"
                          value={userName}
                          onChange={handleUserNameChange}
                          type="text"
                          className="w-full -ml-10 pl-4 pr-3 py-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Enter your Full Name"
                        />
                      </div>
                    </div>
                    <div className="px-5 pt-6 " style={{ overflowX: "auto" }}>
                      <table>
                        <tr className="text-gray-500">
                          {timeSlots.map((timeSlot, index) => {
                            return (
                              // <div style={{ width: "200px" }}>
                              <th key={index} style={{ padding: " 6px 4px" }}>
                                {timeSlot}
                              </th>
                              /* </div> */
                            );
                          })}
                        </tr>
                        {showSlots.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td style={{ padding: " 4px 6px" }}>{daysOfWeek[rowIndex]}</td>
                            {row.map((cell, cellIndex) => (
                              <td style={{ padding: "4px 6px" }}>
                                {/* <div>{cell}</div> */}
                                <div
                                  key={cellIndex}
                                  className="custom-checkbox"
                                  style={{
                                    backgroundColor: cell > 0 ? "green" : "#D61A3C",
                                  }}
                                  // onChange={() => handleCheckboxChangeUsers(rowIndex, cellIndex)}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    </div>

                    <div className="flex px-6 pt-5">
                      <div className="mr-5 text-xs">
                        <div
                          className="custom-checkbox1"
                          style={{
                            backgroundColor: "green",
                          }}
                        ></div>
                        <p>Available</p>
                      </div>
                      <div className="text-xs">
                        <div
                          className="custom-checkbox1"
                          style={{
                            backgroundColor: "#C40233",
                          }}
                        ></div>
                        <p>Not Available</p>
                      </div>
                    </div>

                    <div className="flex mt-2 px-5 justify-center">
                      <div className="mr-10">
                        <label
                          for="day"
                          class="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
                        >
                          Select a Day
                        </label>
                        <select
                          id="day"
                          value={userDay}
                          onChange={handleUserDay}
                          class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a day</option>
                          {daysOfWeek.map((days, index) => {
                            return <option value={index}> {days}</option>;
                          })}
                        </select>
                      </div>
                      <div className="">
                        <label
                          for="time"
                          class="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
                        >
                          Select a Time
                        </label>
                        <select
                          id="time"
                          value={userTime}
                          onChange={handleUserTime}
                          class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a time</option>
                          {timeSlotsmap.map((time, index) => {
                            return <option value={index}> {time}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="text-center pt-10">
                      <button
                        type="submit"
                        className=" bg-indigo-500 text-white font-medium border-gray-200 px-10 py-2"
                        style={{ borderRadius: "30px" }}
                      >
                        Book
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!showbookingForm && (
        <>
          <div
            className="min-w-screen bg-gray-900 flex items-center justify-center px-5 pb-28 pt-5"
            id="bookingformm"
          >
            <div
              className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
              style={{ maxWidth: "1100px" }}
            >
              <div className="w-full">
                <div className="p-5">
                  <h2 className="text-center py-5 font-bold text-2xl">
                    Add your Available Time Slots
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Doctor Id :
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          name="doctorid"
                          value={doctorId}
                          onChange={handleDoctoridChange}
                          type="number"
                          className="w-full -ml-10 pl-4 pr-3 py-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Enter your doctor id "
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Doctor Name :
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          name="doctorname"
                          onChange={handleDoctornameChange}
                          value={doctorName}
                          type="Text"
                          className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Enter your name "
                        />
                      </div>
                    </div>

                    <div className="px-5 pt-6 " style={{ overflowX: "auto" }}>
                      <table>
                        <tr className="text-gray-500">
                          {timeSlots.map((timeSlot, index) => {
                            return (
                              <th key={index} style={{ padding: " 4px 8px" }}>
                                {timeSlot}
                              </th>
                            );
                          })}
                        </tr>
                        {array2D.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td style={{ padding: " 4px 8px" }}>{daysOfWeek[rowIndex]}</td>
                            {row.map((cell, cellIndex) => (
                              <td className="text-center" style={{ padding: "4px 8px" }}>
                                <input
                                  key={cellIndex}
                                  style={{ width: "25px", height: "15px" }}
                                  type="checkbox"
                                  checked={cell}
                                  onChange={() => handleCheckboxChange(rowIndex, cellIndex)}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    </div>

                    <div className="text-center pt-10">
                      <button
                        type="submit"
                        className=" bg-indigo-500 text-white font-medium border-gray-200 px-10 py-2"
                        style={{ borderRadius: "30px" }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {doctorsList.length !== 0 ? (
            <>
              <div className="px-6 bg-gray-900 text-white">
                <h1 className="text-3xl text-center">Doctors List : </h1>

                {doctorsList.map((doctor, index) => {
                  return (
                    <div className="py-10 px-5">
                      <div className="flex text-gray-400 ">
                        <h2>Doctor-Id : </h2>
                        <h2 className="pl-2 text-gray-300"> {doctor.doctorId}</h2>
                      </div>
                      <div className="flex text-gray-400">
                        <h2>Doctor-Name : </h2>
                        <h2 className="pl-2 text-gray-300"> {doctor.doctorName}</h2>
                      </div>
                      <div className="text-gray-500" style={{ overflowX: "auto" }}>
                        <table>
                          <tr className="text-gray-500">
                            {timeSlots.map((timeSlot, index) => {
                              return (
                                <th key={index} style={{ padding: " 6px 4px" }}>
                                  {timeSlot}
                                </th>
                              );
                            })}
                          </tr>
                          {doctor.timeSlots.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td style={{ padding: " 4px 6px" }}>{daysOfWeek[rowIndex]}</td>
                              {row.map((cell, cellIndex) => (
                                <td style={{ padding: "4px 6px" }}>
                                  {/* <div>{cell}</div> */}
                                  <div
                                    key={cellIndex}
                                    className="custom-checkbox2"
                                    style={{
                                      backgroundColor: cell > 0 ? "green" : "#D61A3C",
                                    }}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Booking;
