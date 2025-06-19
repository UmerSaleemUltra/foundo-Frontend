

import { Avatar, Box, Card, CardContent, Typography, Rating, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
    {
        name: "Ravi Kumar Vykuntham",
        title: "Seamless and Fast Company Registration with Leegal.co",
        review:
            "I had an excellent experience with Leegal.co! They helped me register my company in the US, and the entire process was seamless...",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/644e95fb90bfde001273297c/73x73.png",
        company: 'HighLevel crafters LLC'
    },
    {
        name: "MD Anwer",
        title: "Exceptional service by Leegal.co",
        review:
            "Leegal.co provided exceptional service in forming Solvagence Inc. Their 24/7 availability and legal expertise made the experience stress-free.",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/67f22aaeb0327a0ab8392e50/73x73.png",
        company: 'Solvagence Inc'
    },
    {
        name: "Vamsi P",
        title: "Leegal LLC gave me a very good",
        review:
            "Leegal LLC gave me a very good experience for setting up my business. Their pricing was clear, support was personal, and they knew all the legal steps well, which made the process smooth...",
        starRating: 5,
        company: 'BridgePoint Recruiters LLC'
    },
    {
        name: "Abdul Roshan",
        title: "Good Supporting staff",
        review:
            "Good Supporting staff.",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/6815e8475ad665f7fe3c8477/73x73.png",
        company: 'Wothus LLC'
    },
    {
        name: "Sumant Patra",
        title: "Smooth and Easy LLC Setup",
        review:
            "Leegal LLC made the process of forming my LLC in the United States incredibly smooth and effortless.",
        starRating: 5,
        company: 'Winfluency LLC'
    },
    {
        name: "Azagar Aali Shaik",
        title: "Much appreciated to you work and effort",
        review:
            "Hi This is Ali from AALITECH LLC, thank you so much for the company registration process,very much appreciated to you work and effort done the work before the time given great efforts, sincerely thanks to Leegal LLC",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/6512d1f9012bc00013a5220a/73x73.png",
        company: 'AALITECH LLC'
    },
    {
        name: "Your Wellness Products LLC",
        title: "Very fast service and up-to-date updates",
        review:
            "I love the service of Leegal. I suggest Leegal to everyone who is trying to open an LLC in the USA.",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/6809e96fbbc6234ad709d866/73x73.png",
        company: 'Your Wellness Products LLC'
    },
    {
        name: "ChandraShekhar",
        title: "One of the best companies",
        review:
            "They are really helpful and best when it comes to support. Go for it without any doubt!",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/67c9fba79a70263e009cbb00/73x73.png",
    },
    {
        name: "Sumit Singh",
        title: "Quick and to the Point",
        review:
            "Great service from the team.",
        starRating: 5,
        company: 'Delaware Digital Agency LLC'
    },
    {
        name: "Sanju Thakur",
        title: "I really like the service provided",
        review:
            "I really like the service provided and all my queries were handled very well, I am very satisfied with the response of my company formation process",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/681505e94db5a02c34e68d7f/73x73.png",
        company: 'ARK Technology LLC'
    },
    {
        name: "JAAAGA",
        title: "Good service with quick response",
        review:
            "Good service with quick response",
        starRating: 5,
        avtar: "https://user-images.trustpilot.com/68138eb55ad66584d33a378b/73x73.png",
        company: 'Biz Network LLC'
    },
    {
        name: "Timesquare Holidays",
        title: "Nicely and timely delivered",
        review:
            "Nicely and timely delivered whatever they committed.",
        starRating: 5,
        company: 'Timesquare Holidays LLC'
    },
];



const TestimonialCard = ({ testimonial }) => (
    <Card sx={{ minWidth: 300, maxWidth: 300, mx: 2, minHeight: 320, mx: 1.5, flexShrink: 0, borderRadius: 3, boxShadow: 'none', border: '1px solid #ccc', position: 'relative' }}>
        <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={testimonial.avtar} alt={testimonial.name} sx={{ mr: 2 }} />
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                    </Typography>
                    {/* <Typography variant="caption" color="text.secondary">
                        {testimonial.title}
                    </Typography> */}
                </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" style={{ color: 'black', fontSize: 15, fontWeight: 500 }}>
                {testimonial.title}
            </Typography><br /><br />
            <Typography variant="body2" color="text.secondary" mb={2}>
                {testimonial.review}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                {testimonial.company ? '- ' + testimonial.company : ''}
            </Typography>
            <img src="/images/trustpilot-star.png" style={{ width: 20, position: "absolute", top: '4%', right: '4%' }} />
            <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" style={{ width: 80, position: "absolute", bottom: '7%' }} />
        </CardContent>
    </Card>
);

const animation = {
    x: ['-50%', '0%'],
    transition: {
        duration: 60,
        ease: 'linear',
        repeat: Infinity,
    },
};


const Testimonials = () => {
    const theme = useTheme();
    const cards = [...testimonials, ...testimonials];
    const [isPaused, setIsPaused] = useState(false);

    return (
        <Box
            sx={{
                overflow: "hidden",
                py: 4,
                // background: `linear-gradient(135deg, ${theme.palette.grey[100]}, white)`,
            }}
        >
            <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
                Hear From Our Clients
                <img src="/images/text-high.svg" alt="highlight" />
                <center>
                    <img src="/images/underline.svg" style={{ width: 200 }} alt="underline" />
                </center>

            </Typography>
            <Box position="relative" overflow="hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    style={{ display: 'flex', width: 'max-content' }}
                    animate={isPaused ? {} : animation}
                    drag="x"
                    dragConstraints={{ left: -1000, right: 0 }}
                    dragElastic={0.1}
                >
                    {cards.map((t, index) => (
                        <TestimonialCard key={index} testimonial={t} />
                    ))}
                </motion.div>
            </Box>
        </Box>
    );
};

export default Testimonials;
