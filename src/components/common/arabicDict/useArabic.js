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
    }
  };
  useEffect(() => {
    setTranslate(dict);
  }, []);
  return { translate };
}

export default useArabic;
