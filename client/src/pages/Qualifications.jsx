import "./style.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { create, list } from '../api/api-qualification.js';
import '@fontsource/roboto/400.css';

export default function Qualification() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [qualifications, setQualifications] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    isError: false
  });

  // Load qualifications on component mount
  useEffect(() => {
    loadQualifications();
  }, []);

  const loadQualifications = async () => {
    try {
      const data = await list();
      if (data.error) {
        console.error('Error loading qualifications:', data.error);
      } else if (Array.isArray(data)) {
        setQualifications(data);
      }
    } catch (error) {
      console.error('Error loading qualifications:', error);
    }
  };

  const submitForm = async (data) => {
    try {
      const result = await create(data);
      
      if (result.error) {
        setNotification({
          show: true,
          message: result.error,
          isError: true
        });
      } else {
        setNotification({
          show: true,
          message: result.message || 'Qualification created successfully!',
          isError: false
        });
        reset();
        // Reload qualifications after successful creation
        await loadQualifications();
      }
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', isError: false });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({
        show: true,
        message: 'An unexpected error occurred. Please try again.',
        isError: true
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: '', isError: false });
      }, 5000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title-1">Qualifications</h1>

        {/* Qualifications List */}
        {qualifications.length > 0 && (
          <div className="qualifications-section">
            <ul className="projects">
              {qualifications.map((qual) => (
                <li key={qual._id} className="project">
                  <div className="qualification-card">
                    <h3 className="qualification-title">{qual.title || 'Untitled'}</h3>
                    <p className="qualification-name">
                      {qual.firstname} {qual.lastname}
                    </p>
                    <p className="qualification-email">{qual.email}</p>
                    <p className="qualification-date">
                      <strong>Completed:</strong> {formatDate(qual.completion)}
                    </p>
                    {qual.description && (
                      <p className="qualification-description">{qual.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Qualifications Form */}
        <div className="contact-form">
          <h2>Add New Qualification</h2>
          
          {notification.show && (
            <div className={notification.isError ? "error-message" : "success-message"}>
              {notification.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-field">
              <input
                type="text"
                placeholder="Title (e.g., Bachelor of Science)"
                {...register("title", { 
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters"
                  }
                })}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && (
                <span className="field-error">{errors.title.message}</span>
              )}
            </div>

            <div className="form-field">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstname", { 
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
                className={errors.firstname ? 'error' : ''}
              />
              {errors.firstname && (
                <span className="field-error">{errors.firstname.message}</span>
              )}
            </div>

            <div className="form-field">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastname", { 
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  }
                })}
                className={errors.lastname ? 'error' : ''}
              />
              {errors.lastname && (
                <span className="field-error">{errors.lastname.message}</span>
              )}
            </div>

            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-field">
              <input
                type="date"
                placeholder="Completion Date"
                {...register("completion", { 
                  required: "Completion date is required"
                })}
                className={errors.completion ? 'error' : ''}
              />
              {errors.completion && (
                <span className="field-error">{errors.completion.message}</span>
              )}
            </div>

            <div className="form-field">
              <textarea
                placeholder="Description"
                {...register("description", { 
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters"
                  }
                })}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && (
                <span className="field-error">{errors.description.message}</span>
              )}
            </div>

            <button type="submit" className="btn">
              Add Qualification
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}