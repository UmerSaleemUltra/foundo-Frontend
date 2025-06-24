import React, { useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { post_data } from '../../api';
import toast from 'react-hot-toast';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';


const Contact = ({ screen }) => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        startButton: {
            background: '#EA580C',
            color: 'white',
        padding: '10px 15px',
            borderRadius: 3,
            fontSize: isMobile ? '13px' : '14px',
            boxShadow: 'none',
            textTransform: 'capitalize',
            zIndex: 10,
            '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#d0191f',
            },
        },
    }


 
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true)
            let payload = {
                first_name: formData?.firstName,
                last_name: formData?.lastName,
                email: formData?.email,
                phone: formData?.phone,
                message: formData?.message,
            }
            const response = await post_data('super-admin/send-contact-message', payload)
            if (response?.status) {
                setLoading(false)
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                setErrors({});
                toast.success('Message has been sent successfully!')
            }
            else {
                setLoading(false)
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                setErrors({});
                toast.error('Something went wrong')
            }
        }
    };

    return (
        <section className="contact-section" style={{ background: screen === 'contact' ? 'white' : '#F8F9FA' }}>
            <div className="contact-info">
                <div className="contact-header">
                    <div className="icon"><img src="/images/qa-img.svg" alt="Q&A Icon" /></div>
                    <h2 style={{ margin: 0, color: '#000' }}>GET IN TOUCH</h2>
                    <p style={{ width: '80%' }}>
                        We’re here to help! Whether you have questions, need assistance, or simply want to learn more about what we offer, don’t hesitate to reach out to us.
                        {/* Aenean faucibus in fusce sed urna purus. Eu consequat hendrerit facilisi ut. Lobortis viverra ac velit praesent. */}
                    </p>
                </div>
                <ul className="contact-details">
                    <li>
                        <span><MdOutlineMailOutline /></span>
                        <div>
                            <h4 style={{ margin: 0 }}>Chat with us</h4>
                            <p style={{ color: '#343A40', fontSize: 14 }}>Reach out to us at <a style={{ textDecoration: 'none', color: '#343A40' }} href="mailto:info@leegal.co">info@leegal.co</a></p>
                        </div>
                    </li>
                    <li>
                        <span><IoCallOutline /></span>
                        <div>
                            <h4 style={{ margin: 0 }}>Call us</h4>
                            <p style={{ color: '#343A40', fontSize: 14 }}>Ring us on <a style={{ textDecoration: 'none', color: '#343A40' }} href="tel:+919770015304">+91 9770015304</a></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+1 201-555-0123"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {errors.message && <p className="error-text">{errors.message}</p>}
                    </div>
                    <div className="form-footer">
                        <Button
                            sx={styles.startButton}
                            variant='contained'
                            endIcon={<IoIosArrowForward />}
                            type="submit" className="submit-btn"
                            disabled={loading}
                       
                        
                        >
                            {loading ? 'Submit...' : 'Submit'}
                        </Button>
                        <p style={{ fontSize: 13 }}>
                            By pressing the submit button, I agree to we contacting me by email and/or phone to share opportunities exclusively available to customers. I also understand that any information I’ve shared in this form is subject to our platform’s Privacy Policy.
                        </p>
                        <br />
                        {/* <strong>
                            Address: 17, Amit vihar colony, Near Leather Factory, 7 no. Chauraha, Jain Mandir, Morar, Gwalior, Madhya Pradesh
                        </strong> */}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
