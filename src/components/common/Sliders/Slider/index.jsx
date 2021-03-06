import React from 'react';
import SlickCarousel from 'react-slick';
import SectionHeader from '../../SectionHeader/SectionHeader';

const Slider = React.forwardRef((props, ref) => {
  const {
    recomended,
    bgImage,
    bgImageUrl,
    className = '',
    slidesToShow = 5,
    rows = 1,
    items = [],
    render = () => {},
    header = [],
    arrows = true,
    carouselOptions = {
      loop: false,
      margin: 0,
      dots: false,
      arrows,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      slidesToShow,
      swipeToSlide: true,
      rows,
    },
  } = props;

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          right: 0,
          width:"37px",
          height:"115px",
          marginBottom:"15px"
        }}
        onClick={onClick}
      >
        <span >›</span>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          left: "25px",
          zIndex: 1,
          width:"37px",
          height:"115px",
        }}
        onClick={onClick}
      >
        <span>‹</span>
      </div>
    );
  }

  if (items.length < slidesToShow)
    carouselOptions['slidesToShow'] = items.length;

  return (
    <div
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImageUrl})`,
              // backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }
          : null
      }
      className={className}
    >
      {header && header.length === 2 && (
        <div className="d-flex-all-center __category-heading-slider__">
          <SectionHeader roboto={header[0]} dancing={header[1]} />
        </div>
      )}
      <SlickCarousel {...carouselOptions} ref={ref}>
        {items?.map((item, index) => (
          <div key={index}>{render(item, index)}</div>
        ))}
      </SlickCarousel>
    </div>
  );
});

export default Slider;
