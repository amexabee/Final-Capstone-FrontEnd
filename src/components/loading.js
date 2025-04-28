/* eslint-disable react/prop-types */
const Loading = ({ message }) => (
  <div className="d-flex m-5 justify-content-center align-items-center">
    <h4 className="no-class me-3">{message}</h4>
    {message === 'Loading...' && (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">.....</span>
      </div>
    )}
  </div>
);

export default Loading;
