import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/styles/Bookings.css';
import { setPath } from '../../redux/swimClass/swimClass';
import { getBookings } from '../../redux/bookings/bookings';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  const user = JSON.parse(localStorage.getItem('user'));
  const myBookings = user ? bookings.filter((b) => b.user_id === user.id) : [];
  const { swimClasses: scs } = useSelector((state) => state.swimClasses);

  useEffect(() => {
    dispatch(getBookings());
    dispatch(setPath('reservations'));
  }, []);

  const findClass = (item) => {
    const sc = scs.filter((sc) => sc.id === item.swim_class_id)[0];
    return sc
      ? {
        name: sc.name,
        description: sc.description,
        location: sc.location,
        fee: sc.fee,
      }
      : null;
  };

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
          {myBookings.map((item) => (
            <tr key={item.id}>
              <td>{findClass(item)?.name}</td>
              <td>{findClass(item)?.description}</td>
              <td>{findClass(item)?.location}</td>
              <td>
                {findClass(item)?.fee}
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
