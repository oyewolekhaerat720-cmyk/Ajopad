import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} size={14} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} size={14} />);
    } else {
      stars.push(<FaRegStar key={i} size={14} />);
    }
  }

  return <div className="stars-row">{stars}</div>;
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5,
      text: `"Finally, an app that understands how our savings circles work. My family ajo has never been this organised."`,
      name: "NGOZI ADEYEMI",
      location: "Lagos, Nigeria",
    },
    {
      rating: 5,
      text: `"We have 14 members in our group and tracking everyone used to be a nightmare. AjoPad changed everything."`,
      name: "TUNDE IBRAHIM",
      location: "Abuja, Nigeria",
    },
    {
      rating: 5,
      text: `"The payout schedule feature alone is worth it. No more arguments about whose turn it is — it's all there."`,
      name: "AMAKA OKAFOR",
      location: "Port Harcourt, Nigeria",
    },
  ];

  return (
    <div className="sec">
      <div className="eyebrow">Testimonials</div>

      <div className="sh">
        Trusted by <em>real Nigerians</em>
      </div>

      <div className="testi-grid">
        {testimonials.map((tm) => (
          <div key={tm.name} className="testi-card">
            <div className="testi-stars">
              <StarRating rating={tm.rating} />
            </div>

            <div className="testi-text">{tm.text}</div>

            <div className="testi-name">{tm.name}</div>

            <div className="testi-loc">{tm.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
};