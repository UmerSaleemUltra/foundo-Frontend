import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';

export default function FeedbackModal({
    open,
    setOpen,
    isFeedback
}) {

    const { user_data } = useSelector(state => state.user);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 6
    };

    const [review, setReview] = React.useState('')
    const [rating, setRating] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (!rating || review.trim() === '') {
            toast.error('Please provide both a rating and a review.');
            return;
        }

        setLoading(true);

        let payload = {
            review: review,
            rating: rating,
            user_id: user_data?._id
        };

        try {
            const response = await post_data(`testimonial/create-testimonial`, payload);
            if (response?.status) {
                toast.success('Feedback submitted successfully');
                setOpen(false);
                setRating('')
                setReview('')
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info">
                        <div className="user-details">
                            <h4 className="user-name">
                                {isFeedback ? 'Your Feedback has been submitted!' : 'Submit your Feedback'}
                            </h4>
                        </div>
                    </div>

                    {
                        !isFeedback && (
                            <div className="company-selector-container">

                                <div style={{ marginBottom: '3%' }}>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating} // Use rating state here
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setRating(newValue); // Update rating state directly
                                        }}
                                    />
                                </div>


                                <div style={{ marginBottom: '3%' }}>
                                    <TextField fullWidth multiline rows={3}
                                        onChange={(e) => setReview(e.target.value)} value={review}
                                        id="outlined-basic" label="Review" variant="outlined" />
                                </div>


                                <button className="add-company-btn" onClick={handleSubmit}>
                                    {loading ? 'Submit...' : 'Submit'}
                                </button>
                            </div>
                        )
                    }

                </Box>
            </Modal>
        </div>
    );
}