import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/styles/Bookings.css';
import { setPath } from '../../redux/swimClass/swimClass';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  // const { swimClasses } = useSelector((state) => state.swimClasses);

  useEffect(() => {
    dispatch(setPath('reservations'));
  }, []);

  // const findClass = (item) => {
  //   const sc = swimClasses.filter((sc) => sc.id === item.id)[0];
  //   return sc ? sc.name : '';
  // };

  return (
    <section className="bookings">
      <h1>Reservations</h1>
      <table className="bookings-list">
        <thead className="thead">
          <tr>
            <th>Class</th>
            <th>Description</th>
            <th>Location</th>
            <th>Monthly Fee</th>
          </tr>
        </thead>
        <tbody className="thead">
          {bookings.map((item) => (
            <tr key={item.bookingId}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.location}</td>
              <td>
                {item.fee}
                $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default Bookings;
