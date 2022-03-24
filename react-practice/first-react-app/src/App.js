import "./App.css";
import { useState } from "react";
// one particuluar function
import Title from "./components/Title";
import Modal from "./components/Modal";
import EventList from "./components/EventList";
import NewEventForm from "./components/NewEventForm";

function App() {
  const [showModal, setShowModal] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      return [...prevEvents, event];
    });
    setShowModal(false);
  };
  const handleClick = (id) => {
    // setEvents(
    //   events.filter((event) => {
    //     return id !== event.id;
    //   })
    // );
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id;
      });
    });
    console.log(id);
  };

  const subtitle = "All the latest events in Marioland";
  return (
    <div className="App">
      <Title title="Events in your Area" subtitle={subtitle} />
      <Title title="another title" subtitle="another subtitle" />
      {showEvents && (
        <div>
          <button onClick={() => setShowEvents(false)}>hide events</button>
        </div>
      )}
      {!showEvents && (
        <div>
          <button onClick={() => setShowEvents(true)}>show events</button>
        </div>
      )}
      {showEvents && <EventList events={events} handleClick={handleClick} />}
      {/* anonymous function: it isn't automatically invoked */}
      {/* automatically invoked: <button onClick = handleClick(event.id)} */}
      {showModal && (
        <Modal isSalesModal={false}>
          <NewEventForm addEvent={addEvent} />
        </Modal>
      )}
      <div>
        <button onClick={() => setShowModal(true)}>Add New Event</button>
      </div>
    </div>
  );
}

export default App;
