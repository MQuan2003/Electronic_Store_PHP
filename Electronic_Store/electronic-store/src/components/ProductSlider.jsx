import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import styles from "../css/ProductSlider.module.css";
import laptopImg from "../assets/Laptop.jpg";

const ProductSlider = ({ products }) => {
  // Filter only products with a discount
  const saleProducts = products.filter(product => parseFloat(product.discount) > 0);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderBanner}>
          <h3>Products On Sale</h3>
          <p>Shop Now!</p>
        </div>

        {saleProducts.length === 0 ? (
          <h3 style={{ textAlign: "center", padding: "20px" }}>No products on sale</h3>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              1024: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              0: { slidesPerView: 1, spaceBetween: 5 },
            }}
            className={styles.productSlider}
          >
            {saleProducts.map((product) => {
              const price = parseFloat(product.price);
              const discount = parseFloat(product.discount);
              const discountedPrice = (price * (1 - discount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              const formattedOriginalPrice = price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });


              return (
                <SwiperSlide key={product.id}>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className={styles.productCard}>
                      <span className={styles.discountBadge}>-{(discount * 100).toFixed(0)}%</span>
                      <img src={product.image_url} alt={product.name} />
                      <h4>{product.name}</h4>
                      <p className={styles.oldPrice}>${formattedOriginalPrice}</p>
                      <p className={styles.newPrice}>${discountedPrice}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;