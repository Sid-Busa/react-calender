import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  ViewsDirective,
  ViewDirective,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { handleSetCalenderData } from "./utills/handleSetCalenderData";
import Form from "./Form/form";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const App = () => {
 
  // toggle for model pop up
  const handleToggle = () => {
    setModel((preState) => !preState);
  };

  useEffect(() => {
    const getSessionOfCurrentMonth = async () => {
      // get current Date and there session
      const getCurrentDate = new Date(2020, 11, 1);
      const year = getCurrentDate.getFullYear();
      const month = getCurrentDate.getMonth() + 1;

      const calenderData = await handleSetCalenderData(
        year,
        month,
        handleToggle
      );
      if (!calenderData) return setDate([]);
      setDate(calenderData);
    };
    getSessionOfCurrentMonth();
  }, []);

  // call when navigate to one to next or previous
  const onNavigating = async (e) => {
    if (e.action === "date") {
      // console.log("e",e)
      const updatedDate = e.currentDate;
      const month = updatedDate.getMonth() + 1;
      const year = updatedDate.getFullYear();
      console.log(updatedDate.getMonth() + 1);
      console.log(updatedDate.getFullYear());
      const calenderData = await handleSetCalenderData(
        year,
        month,
        handleToggle
      );
      if (!calenderData) return setDate([]);
      setDate(calenderData);
    }
  };
  const [date, setDate] = useState([]);
  const [model, setModel] = useState(false);

  return (
    <>
      {model && (
        <Modal
          isOpen={model}
          onRequestClose={handleToggle}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="close" onClick={handleToggle}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <Form handleClosePopup={handleToggle} />
        </Modal>
      )}
      {/* ScheduleComponent for Calender  */}
      <ScheduleComponent
        height="100%"
        readonly={true}
        selectedDate={new Date(2020, 11, 1)}
        navigating={onNavigating}
        eventSettings={{ dataSource: date }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" isSelected />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>

      <button onClick={handleToggle}>Register Model </button>
    </>
  );
};

export default App;
