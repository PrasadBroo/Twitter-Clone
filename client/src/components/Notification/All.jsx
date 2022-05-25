import React from "react";
import { useSelector } from "react-redux";
import SimpleSpinner from "../Loader/SimpleSpinner";
import Notification from "./Notification";

export default function All() {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const fetching = useSelector((state) => state.notifications.fetching);
  const fetchError = useSelector((state) => state.notifications.fetchingError);
  return (
    <div className="all-notifications">
      {fetching && <SimpleSpinner topCenter />}
      {notifications &&
        notifications.map((e) => <Notification data={e} key={e._id} />)}
      {fetchError && <p className="error-text">{fetchError}</p>}
    </div>
  );
}
