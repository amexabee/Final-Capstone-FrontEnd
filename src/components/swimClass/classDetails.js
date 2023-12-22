import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClass, getSwimClasses } from '../../redux/swimClass/swimClass';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { swimClasses } = useSelector((store) => store.swimClasses);
  const item = swimClasses.filter((sc) => sc.id.toString() === id)[0];

  const handleDelete = (id) => {
    dispatch(deleteClass(id));
    dispatch(getSwimClasses());
    navigate('/swimClass');
  };

  return (
    <div className="container mt-5">
      {item && (
        <>
          <h3 className="text-center m-3">{item.name}</h3>
          <div className="swim-detail d-flex justify-content-center align-items-center item-details mb-5">
            <img src={item.image} alt="" className="img-detail" />
            <div className="details p-5">
              <div className="bg-light my-2">{`Fee: $${item.fee}`}</div>
              <div className="mb-2">{`Location: ${item.location}`}</div>
              <p>{`Description: ${item.description}`}</p>
              <p>
                Nestled within lush tropical landscapes, this refined seaside
                hotel is situated only 2 kilometers shy from Nyali Beach and 5
                kilometers away from the vibrant city center, offering guests
                the perfect balance between serene coastal beauty and convenient
                urban exploration.
              </p>
              <Link to="addReserve">
                <button className="btn btn-success m-4" type="button">
                  Reserve
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-danger m-4"
                onClick={() => handleDelete(item.id)}
              >
                Delete class
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassDetails;
