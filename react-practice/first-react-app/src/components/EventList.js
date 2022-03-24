import styles from "./EventList.module.css";

export default function EventList(events, handleClick, id) {
  return (
    <div>
      {events.map((event, index) => (
        <div className={styles.card} key={event.id}>
          <h2>{event.title}</h2>
          <p>
            {event.location}-{event.date}
          <button onClick={() => handleClick(event.id)}>delete event</button>
        </div>
      ))}
    </div>
  );
}
