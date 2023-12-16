/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from './api';
import { setPath } from '../../redux/swimClass/swimClass';

const SignUpForm = ({ onSignIn }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(setPath('signup'));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email can't be left blank");
      return;
    }

    if (password.length < 6) {
      setError("Password can't be less than 6 characters!");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords don't match!");
      return;
    }

    try {
      await signUp(email, password, passwordConfirmation);
      onSignIn({ email });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-outline mb-4">
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-outline mb-4">
        <input
          className="form-control"
          placeholder="Confirm password"
          type="password"
          id="password-confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="d-flex justify-content-center">
        <button className="btn btn-success mb-4" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
