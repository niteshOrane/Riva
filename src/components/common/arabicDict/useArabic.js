import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useArabic() {
  const { language } = useSelector((state) => state?.common?.store);
  const [translate, setTranslate] = useState(null);

  const dict = {
    home: {
      ALL: language === "Arabic" ? "الكل،" : "All",
      BEST_SELLING:
        language === "Arabic"
          ? "المنتجات الأفضل مبيعًا،"
          : "Best Selling Product",
      FEATURE: language === "Arabic" ? "المنتجات الأبرز." : "Featured Products",
      NEW: language==="Arabic" ? "الجديد في" :"NEW IN",
      SPRING: language==="Arabic" ? "ربيع - صيف 2021" :"SPRING-SUMMER 2021",
      COL: language==="Arabic" ? "مجموعة" :"COLLECTION",
      SHOP: language==="Arabic" ? "تسوق حسب":"SHOP BY",
      CAT:language==="Arabic"?"الفئة":"Category"
    },
    footer:{
        TOUCH:language === "Arabic" ? "ابقوا على تواصل،" :"STAY IN TOUCH",
        DEALS: language === "Arabic" ?"واحصلي على عروض مميّزة ما لها مثيل،":"Get exclusive deals you will not find anywhere else straight to",
        SUBS:language === "Arabic" ?"يشترك" :"SUBSCRIBE",
        CARE:language === "Arabic"? "خدمة العملاء،" : "Customer care",
        STAY:language === "Arabic"? "ابق على اتصال" : "STAY CONNECTED",
        APP: language==="Arabic"? "تطبيق ريفا،" : "RIVA APP",
        WHATS: language==="Arabic"? "واتساب خدمة العملاء،" : "WhatsApp Customer Care",
        COPY: language==="Arabic"? "جميع الحقوق محفوظة RIVA FASHION@،": "Copyright @ 2021 RIVA FASHION. All Right Reserved,",
        SERVICE: language==="Arabic"? "خدمة العملاء": "CUSTOMER SERVICE",
        WE: language==="Arabic"? "نحن نقبل": "WE ACCEPT",
    },
    nav:{
      SER: language==="Arabic" ? "خدمة العملاء": "Search",
      WEL: language==="Arabic" ? "أهلا بك": "WELCOME",
      MYAC: language==="Arabic" ? "حسابي": "MY ACCOUNT",
      WISH: language==="Arabic"?"بحث،":"Wishlist",
      ACC: language==="Arabic"?"قائمة الأمنيات،":"Account",
      CART: language==="Arabic"?"عربة التسوّق،":"Cart",
      TYPE:  language==="Arabic"?"اكتب هنا للبحث":"Type here to search",
      LOG:  language==="Arabic"?"تسجيل خروج":"LOGOUT",
      IN:  language==="Arabic"?"ضيف ، تسجيل الدخول":"GUEST, SIGN IN",
    },
    details:{
        HOME: language==="Arabic"?"المنزل":"Home",
        BEST: language==="Arabic"?"الأفضل مبيعًا":"BEST SELLER",
        RATE: language==="Arabic"?"التقييمات":"rating",
        WAS: language==="Arabic"?"كان":"was",
        NOW: language==="Arabic"?"الآن":"Now",
        COLOR: language==="Arabic"?"اللون":"Color",
        SIZE: language==="Arabic"?"الحجم":"Size",
        STOCK: language==="Arabic"?"سنعلمك حالما يتوفّر":"We will let you know when its in stock",
        FIND: language==="Arabic"?"احصلي على مقاسك":"   Find your size",
        POPULAR: language==="Arabic"?"الأكثر شهرة":"POPULAR",
        LOOK:language==="Arabic"? "يتفقّدون هذا المنتج الآن":"are looking at this right now",
        TIMES: language==="Arabic"?"مرات في الأيام السابقة":"times in last few days",
        QUANT: language==="Arabic"?"الكمية":"Quantity",
        AVAIL: language==="Arabic"?"التوفّر":"Availability",
        CARD: language==="Arabic"?"إضافة إلى العربة":"Add to Cart",
        GUIDE: language==="Arabic"? "دليل المقاسات" : "size guide",
        THIS: language==="Arabic" ? "" : "Rate This Product",
        STORE:language==="Arabic"? "ابحث في المتجر": "Search In Store",
        DEL: language==="Arabic"?"التسليم والإرجاع":"Delivery & Returns",
        REV: language==="Arabic"?"إعادة النظر":"Review",
        SHARE: language==="Arabic"?"شارك":"Share"
    }
  };
  useEffect(() => {
    setTranslate(dict);
  }, []);
  return { translate };
}

export default useArabic;
