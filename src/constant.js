export const primaryColor = "#EA580C"

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    const outputDate = day + '-' + month + '-' + year;
    return outputDate;
}

export const formatPrice = (value) => {
    const formatted_price = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value || 0);
    return formatted_price
}

export const formatDollar = (value) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value || 0);
    return formattedPrice || 0;
};


export const getInitials = (name) => {
    return name
        .split(" ")
        .map(word => word?.charAt(0))
        .join("");
};


export const industryList = [
    "Accounting and tax preparation",
    "Accounting Software",
    "Accounting and Payroll Services",
    "Advertising",
    "Amazon FBA Wholesales",
    "Art and photography",
    "Artificial intelligence",
    "Augmented reality",
    "B2b",
    "Biotech",
    "Blockchain",
    "Business Intelligence Tools",
    "Call Center Software",
    "Community",
    "Construction",
    "Consulting",
    "Consumer",
    "Developer tools",
    "Drones",
    "Ecommerce",
    "Education",
    "Employment services",
    "Energy",
    "Enterprise",
    "Entertainment",
    "Financial services",
    "Freelancer",
    "Government",
    "HR Services",
    "Health services",
    "Healthcare",
    "Human Resources Software",
    "Insurance",
    "Insurance Software",
    "IT Services",
    "Legal services including law",
    "Manufacturing Software",
    "Marketplace",
    "Digital Marketing Agency",
    "Media",
    "Nonprofit",
    "Other",
    "Other food services",
    "Other Health and fitness services",
    "Other travel services",
    "Real estate",
    "Research",
    "Robotics",
    "Security",
    "Shopify Dropshipping",
    "Software House",
    "Sports teams and clubs",
    "Truck Dispatching",
    "Transportation",
    "Virtual reality"
];


export const states = [
    { label: "UK", fee: 101 },
    { label: "Wyoming", fee: 102, tagline: '(Most Popular)' },
    { label: "Delaware", fee: 140, tagline: '(Best for Startups)' },
    { label: "Florida", fee: 125, tagline: '(Ideal for E-commerce)' },
    { label: "Montana", fee: 35, tagline: '(Most Affordable)' },
    { label: "Texas", fee: 300 },
    { label: 'New Mexico', fee: 50 },
    { label: 'Missouri', fee: 50 },
    { label: 'Colorado', fee: 50 },
    { label: 'New Hampshire', fee: 102 },
    { label: 'Alabama', fee: 236 },
    { label: 'Alaska', fee: 250 },
    { label: 'Arizona', fee: 85 },
    { label: 'Arkansas', fee: 45 },
    { label: 'California', fee: 70 },
    { label: 'Connecticut', fee: 120 },
    { label: 'District of Columbia', fee: 99 },
    { label: 'Georgia', fee: 100 },
    { label: 'Hawaii', fee: 51 },
    { label: 'Idaho', fee: 101 },
    { label: 'Illinois', fee: 153 },
    { label: 'Indiana', fee: 97 },
    { label: 'Iowa', fee: 50 },
    { label: 'Kansas', fee: 166 },
    { label: 'Kentucky', fee: 40 },
    { label: 'Louisiana', fee: 105 },
    { label: 'Maine', fee: 175 },
    { label: 'Maryland', fee: 155 },
    { label: 'Massachusetts', fee: 520 },
    { label: 'Michigan', fee: 50 },
    { label: 'Minnesota', fee: 155 },
    { label: 'Mississippi', fee: 53 },
    { label: 'Nebraska', fee: 102 },
    { label: 'Nevada', fee: 425 },
    { label: 'New Jersey', fee: 129 },
    { label: 'New York', fee: 205 },
    { label: 'North Carolina', fee: 128 },
    { label: 'North Dakota', fee: 135 },
    { label: 'Ohio', fee: 99 },
    { label: 'Oklahoma', fee: 104 },
    { label: 'Oregon', fee: 100 },
    { label: 'Pennsylvania', fee: 125 },
    { label: 'Rhode Island', fee: 156 },
    { label: 'South Carolina', fee: 125 },
    { label: 'South Dakota', fee: 150 },
    { label: 'Tennessee', fee: 307 },
    { label: 'Utah', fee: 56 },
    { label: 'Vermont', fee: 125 },
    { label: 'Virginia', fee: 100 },
    { label: 'Washington', fee: 200 },
    { label: 'Washington DC', fee: 100 },
    { label: 'West Virginia', fee: 130 },
    { label: 'Wisconsin', fee: 130 },
];





export const waLink = 'https://api.whatsapp.com/send?phone=919770015304&text=Hi%20Leegal%20team!%20I%27m%20interested%20in%20registering%20my%20business%20in%20the%20United%20States.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20can%20get%20started%3F%0A'



export const addonServicesList = [
    {
        text: "Premium Business Address",
        amt: 150,
        category: 'Registered Agent',
        isPurchased: null,
        duration: 'Per Year',
        description: "A prestigious business address with a unique suite number enhances credibility, ensures Amazon approval, simplifies verification, and supports regulatory compliance for professional business operations.",
        image: '/images/insight.svg'
    },
    {
        text: 'ITIN Application',
        amt: 350,
        category: 'Bookkeeping',
        isPurchased: null,
        duration: 'One Time',
        description: "An ITIN is vital for non-residents to access financial services like PayPal, Stripe, banking, and credit, empowering seamless U.S.-based business operations and transactions.",
        image: '/images/insight.svg'
    },
    {
        text: 'Annual Report Filing',
        amt: 100,
        category: 'BOI Filing',
        isPurchased: null,
        duration: '+ State Fee',
        description: "Filing annual reports keeps your business compliant, avoids penalties, maintains good standing with authorities, and ensures your company remains active and legally recognized by the state.",
        image: '/images/insight.svg'
    },
    {
        text: 'Seller Permit / Resale Certificate',
        amt: 150,
        duration: 'One Time',
        category: 'BOI Filing',
        isPurchased: null,
        description: "A seller permit allows tax-free purchases for resale, enhances compliance, optimizes cash flow, and is essential for wholesalers and retailers operating in the U.S. market.",
        image: '/images/insight.svg'
    },
    {
        text: 'US Dedicated IP VPS',
        amt: 150,
        duration: 'Per Year',
        category: 'Business',
        isPurchased: null,
        description: "A U.S.-based Dedicated IP VPS enhances online security, ensures platform compatibility, speeds transactions, and boosts reliability for your business’s digital operations and services.",
        image: '/images/insight.svg'
    },
    {
        text: 'Business Website Setup',
        amt: 250,
        duration: 'One Time',
        category: 'Business',
        isPurchased: null,
        description: "We design tailored, user-friendly websites to establish your online presence, attract customers, build trust, and grow your business effectively in today’s digital marketplace.",
        image: '/images/insight.svg'
    },
    {
        text: 'Company Dissolution',
        amt: 199,
        duration: '+ State Fee',
        category: 'Company',
        isPurchased: null,
        description: "Dissolve your company smoothly with expert support for paperwork, obligations, and legal compliance, avoiding penalties while ensuring a stress-free closure process for your business.",
        image: '/images/insight.svg'
    },
    {
        text: 'Company Amendment',
        amt: 199,
        duration: '+ State Fee',
        category: 'Company',
        isPurchased: null,
        description: "Update business records, including name or structure changes, with our company amendment service. Ensure state compliance, avoid discrepancies, and keep your details accurate and current.",
        image: '/images/insight.svg'
    }
];


export const checkoutAddonServicesList = [
    {
        text: "Premium Business Address",
        amt: 150,
        category: 'Registered Agent',
        isPurchased: null,
        duration: 'Per Year',
        description: 'A business address with unique suite number ensures easy Amazon approval, boosts credibility, verification, and regulatory compliance efficiently.',
        image: '/images/insight.svg'
    },
    {
        text: 'ITIN Application',
        amt: 350,
        category: 'Bookkeeping',
        isPurchased: null,
        duration: 'One Time',
        description: 'Obtaining an ITIN is essential for PayPal and Stripe accounts. With it, you can later access credit and bank services.',
        image: '/images/insight.svg'
    },
    {
        text: 'Seller Permit / Resale Certificate',
        amt: 150,
        duration: 'One Time',
        category: 'BOI Filing',
        isPurchased: null,
        description: 'Register with our Amazon expert for full compliance assistance, helping you create a verified seller account and meet all requirements.',
        image: '/images/insight.svg'
    },
    {
        text: 'US Dedicated IP VPS',
        amt: 150,
        duration: 'Per Year',
        category: 'Business',
        isPurchased: null,
        description: 'File your IRS business taxes annually to guarantee accurate reporting, avoid penalties, and properly comply with regulations.',
        image: '/images/insight.svg'
    },
    {
        text: 'Business Website Setup',
        amt: 250,
        duration: 'One Time',
        category: 'Business',
        isPurchased: null,
        description: 'Open a bank account at institutions like Bank of America, Chase, or Wells Fargo for seamless, global financial transactions and access.',
        image: '/images/insight.svg'
    }
];