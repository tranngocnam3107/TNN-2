import React, { useEffect, useState } from 'react';
import './Form.scss';
import InputText from '../UI/InputText/InputText';
import TextArea from '../UI/TextArea/TextArea';
import CheckBox from '../UI/CheckBox/CheckBox';
import ButtonSoft from '../UI/ButtonSoft/ButtonSoft';
import Modal from '../Modal/Modal';
import { sendEmail } from '../../Utils/sendEmail';

const Form = () => {
  const [formData, setFormData] = useState({
    fName: '',
    bEmail: '',
    pEmail: '',
    phone: '',
    facebook: '',
    flag: false,
  });
  const [formSubmit, setFormSubmit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const isDataCorrect = () => {
    const mailMask =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneMask = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    const { bEmail, pEmail, phone } = formData;
    return (
      mailMask.test(bEmail) && mailMask.test(pEmail) && phoneMask.test(phone)
    );
  };
  const isFormDataComplete = () => {
    const { fName, bEmail, pEmail, phone, facebook, flag } = formData;
    if (flag) {
      return (
        fName.trim() !== '' &&
        bEmail.trim() !== '' &&
        pEmail.trim() !== '' &&
        phone.trim() !== '' &&
        facebook.trim() !== ''
      );
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (isFormDataComplete()) {
      if (isDataCorrect()) {
        setFormSubmit(true);
      }
    } else if (formSubmit && !isFormDataComplete()) {
      setFormSubmit(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleUserIP = () => {
    fetch('https://api.db-ip.com/v2/free/self/')
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('ip', json.ipAddress);
      });
  };

  const handleSubmit = () => {
    const content = `
    IP: ${localStorage.getItem('ip')}

    Full Name: ${formData.fName}
    Business email: ${formData.bEmail}
    Personal email: ${formData.pEmail}
    Phone number: ${formData.phone}
    Facebook page: ${formData.facebook}
    `;
    localStorage.setItem('form', JSON.stringify(formData));
    // sendEmail({ content });
    setIsModal(true);
  };

  useEffect(() => {
    handleUserIP();
  }, []);

  return (
    <form className="Form" onSubmit={(e) => e.preventDefault()}>
      <TextArea title="Please provide us information that will help us investigate" />
      <InputText name="fName" fun={handleChange}>
        Full Name
      </InputText>
      <InputText name="bEmail" fun={handleChange}>
        Business email address
      </InputText>
      <InputText name="pEmail" fun={handleChange}>
        Personal email address
      </InputText>
      <InputText name="phone" fun={handleChange}>
        Mobile phone number
      </InputText>
      <InputText name="facebook" fun={handleChange}>
        Facebook Page Name
      </InputText>
      <div className="Form__checkbox">
        <CheckBox
          state={formData.flag}
          fun={() =>
            setFormData((state) => ({ ...state, flag: !state.flag } || {}))
          }
        />
      </div>
      <Modal isModal={isModal} setIsModal={setIsModal} />
      <ButtonSoft disabled={formSubmit} fun={handleSubmit}>
        Submit
      </ButtonSoft>
    </form>
  );
};

export default Form;