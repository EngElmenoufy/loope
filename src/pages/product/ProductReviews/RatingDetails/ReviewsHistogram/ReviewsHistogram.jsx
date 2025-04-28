import "./ReviewsHistogram.css";

const ratings = [
  {
    star: 5,
    reviewersPercent: "48%",
  },
  {
    star: 4,
    reviewersPercent: "14%",
  },
  {
    star: 3,
    reviewersPercent: "10%",
  },
  {
    star: 2,
    reviewersPercent: "5%",
  },
  {
    star: 1,
    reviewersPercent: "23%",
  },
];

function ReviewsHistogram() {
  return (
    <div className="mt-5">
      {ratings.map((rate) => (
        <div key={rate.star} className="flex items-center gap-4">
          <span className="w-11">{rate.star} star</span>
          <div className={`histogram`}>
            <div style={{ width: rate.reviewersPercent }}></div>
          </div>
          <span>{rate.reviewersPercent}</span>
        </div>
      ))}
    </div>
  );
}

export default ReviewsHistogram;
