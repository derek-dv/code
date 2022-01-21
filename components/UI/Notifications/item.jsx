import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import Heading from "../Heading";

//

const NotificationItem = ({ id, text }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(NotificationActions.hideNotification(id));
  //   }, 5000);
  // }, []);

  return (
    <div className={`py-3 px-3 bg-green-500 shadow-md rounded-lg mb-2`}>
      <Heading type="smallHeading" removeBottomSpacing>
        <span className="text-white">{text}</span>
      </Heading>
    </div>
  );
};

export default NotificationItem;
