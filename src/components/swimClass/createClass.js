import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ClassCreate.css';
import images from '../../assets/images/images';
import { postClass, getSwimClasses } from '../../redux/swimClass/swimClass';

const ClassCreate = () => {
  const [option, setOptions] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [classFee, setClassFee] = useState('');
  const [classDescription, setClassDescription] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { image } = images.filter((img) => img.name === option)[0];
    const classData = {
      name: option,
      location: classLocation,
      image,
      fee: classFee,
      description: classDescription,
    };
    dispatch(postClass(classData));
    dispatch(getSwimClasses());
    navigate('/swimClass');
  };

  const screen = (
    <>
      <section className="create-section">
        <h1>Create a class</h1>
        <form
          className="form-container"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="d-flex">
            {images.map((image) => (
              <span key={image.name} className="form-check mx-3">
                <label className="form-check-label" htmlFor="exampleRadios1">
                  <input
                    className="form-check-input mx-3"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value={image.name}
                    onChange={(e) => setOptions(e.target.value)}
                  />
                  <p>{image.name}</p>
                </label>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Location"
            name="classLocation"
            className="form-input"
            value={classLocation}
            onChange={(e) => setClassLocation(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            name="classDescription"
            className="form-input"
            value={classDescription}
            onChange={(e) => setClassDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Fee"
            name="classFee"
            className="form-input"
            value={classFee}
            onChange={(e) => setClassFee(e.target.value)}
            required
          />
          <button type="submit" className="form-button button">
            Create Class
          </button>
        </form>
      </section>
    </>
  );

  return screen;
};

export default ClassCreate;
