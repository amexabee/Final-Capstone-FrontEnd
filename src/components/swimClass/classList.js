import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading';
import { setPath, getSwimClasses } from '../../redux/swimClass/swimClass';

const ClassList = () => {
  const { swimClasses: sc, status } = useSelector((store) => store.swimClasses);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const asterisks = '* '.repeat(30);

  useEffect(() => {
    dispatch(getSwimClasses());
    dispatch(setPath('/'));
  }, []);

  const left = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  };

  const right = () => {
    if (index >= sc.length - 3) return;
    setIndex(index + 1);
  };

  let filtered = sc;
  if (window.innerWidth >= 768 && sc?.length >= 3) filtered = sc.slice(index, index + 3);

  return (
    <div className="container overflow-auto mb-5" id="overflow">
      <h1 className="text-center mt-5">Welcome to Swimming Class</h1>

      {filtered?.length === 0
        && (status === 'success' ? (
          <div className="d-flex flex-column m-5 align-items-center">
            <h4 className="mx-4">You have no swimming classes yet</h4>
            <button type="button" className="btn btn-success m-3 detail-btn">
              <Link to="/add-class">Create</Link>
            </button>
          </div>
        ) : (
          <Loading message="Loading..." />
        ))}

      {filtered?.length > 0 && (
        <>
          <h4 className="text-center my-5">
            Make a splash with our swimming classes!
          </h4>
          <div className="classes-container">
            <button
              className={index <= 0 ? 'arrow bg-gray' : 'arrow'}
              type="button"
              onClick={() => left()}
            >
              <FaIcons.FaArrowLeft />
            </button>
            <ul className="classes">
              {filtered.map((swimClass) => (
                <li key={swimClass?.id}>
                  <img src={swimClass?.image} alt={swimClass?.name} />
                  <h4 className="text-center m-3">{swimClass?.name}</h4>
                  <div className="asterisks">
                    <p className="text-center text-muted">{asterisks}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-around mt-2">
                    <div className="green text-center d-flex align-items-center">
                      <FaIcons.FaStar size={23} />
                      <p className="mx-2 my-0">
                        {(Math.random() * 2 + 3).toFixed(1)}
                      </p>
                    </div>
                    <div className="circle" />
                    <div className="green text-center d-flex align-items-center">
                      <FaIcons.FaLocationArrow />
                      <p className="mx-2 my-0">{swimClass?.location}</p>
                    </div>
                  </div>
                  <h5 className="text-center m-3">
                    Fee:
                    <span className="green">{` $${swimClass?.fee}`}</span>
                  </h5>
                  <p className="text-center mb-0">{swimClass?.description}</p>
                  <p className="text-center mx-2">
                    <small className=" text-muted">
                      Nestled within lush tropical landscapes, this refined
                      seaside hotel is situated only 2 kilometers shy from Nyali
                      Beach and 5 kilometers away from...
                    </small>
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success m-3 detail-btn"
                    >
                      <Link to={`/swimClass/${swimClass?.id}`}>
                        Class Details
                      </Link>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className={index >= sc.length - 3 ? 'arrow bg-gray' : 'arrow'}
              type="button"
              onClick={() => right()}
            >
              <FaIcons.FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ClassList;
