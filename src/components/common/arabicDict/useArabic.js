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
      NEW: language === "Arabic" ? "الجديد في" : "NEW IN",
      SPRING: language === "Arabic" ? "ربيع - صيف 2021" : "SPRING-SUMMER 2021",
      COL: language === "Arabic" ? "مجموعة" : "COLLECTION",
      SHOP: language === "Arabic" ? "تسوق حسب" : "SHOP BY",
      CAT: language === "Arabic" ? "الفئة" : "Category",
    },
    footer: {
      TOUCH: language === "Arabic" ? "ابقوا على تواصل،" : "STAY IN TOUCH",
      DEALS:
        language === "Arabic"
          ? "واحصلي على عروض مميّزة ما لها مثيل،"
          : "Get exclusive deals you will not find anywhere else straight to",
      SUBS: language === "Arabic" ? "يشترك" : "SUBSCRIBE",
      CARE: language === "Arabic" ? "خدمة العملاء،" : "Customer care",
      STAY: language === "Arabic" ? "ابق على اتصال" : "STAY CONNECTED",
      APP: language === "Arabic" ? "تطبيق ريفا،" : "RIVA APP",
      WHATS:
        language === "Arabic"
          ? "واتساب خدمة العملاء،"
          : "WhatsApp Customer Care",
      COPY:
        language === "Arabic"
          ? "جميع الحقوق محفوظة RIVA FASHION@،"
          : "Copyright @ 2021 RIVA FASHION. All Right Reserved,",
      SERVICE: language === "Arabic" ? "خدمة العملاء" : "CUSTOMER SERVICE",
      WE: language === "Arabic" ? "نحن نقبل" : "WE ACCEPT",
    },
    nav: {
      SER: language === "Arabic" ? "خدمة العملاء" : "Search",
      WEL: language === "Arabic" ? "أهلا بك" : "WELCOME",
      MYAC: language === "Arabic" ? "حسابي" : "MY ACCOUNT",
      WISH: language === "Arabic" ? "بحث،" : "Wishlist",
      ACC: language === "Arabic" ? "قائمة الأمنيات،" : "Account",
      CART: language === "Arabic" ? "عربة التسوّق،" : "Cart",
      TYPE: language === "Arabic" ? "اكتب هنا للبحث" : "Type here to search",
      LOG: language === "Arabic" ? "تسجيل خروج" : "LOGOUT",
      IN: language === "Arabic" ? "ضيف ، تسجيل الدخول" : "GUEST, SIGN IN",
    },
    details: {
      HOME: language === "Arabic" ? "المنزل" : "Home",
      BEST: language === "Arabic" ? "الأفضل مبيعًا" : "BEST SELLER",
      RATE: language === "Arabic" ? "التقييمات" : "rating",
      WAS: language === "Arabic" ? "كان" : "was",
      NOW: language === "Arabic" ? "الآن" : "Now",
      COLOR: language === "Arabic" ? "اللون" : "Color",
      SIZE: language === "Arabic" ? "الحجم" : "Size",
      STOCK:
        language === "Arabic"
          ? "سنعلمك حالما يتوفّر"
          : "We will let you know when its in stock",
      FIND: language === "Arabic" ? "احصلي على مقاسك" : "   Find your size",
      POPULAR: language === "Arabic" ? "الأكثر شهرة" : "POPULAR",
      LOOK:
        language === "Arabic"
          ? "يتفقّدون هذا المنتج الآن"
          : "are looking at this right now",
      TIMES:
        language === "Arabic"
          ? "مرات في الأيام السابقة"
          : "times in last few days",
      QUANT: language === "Arabic" ? "الكمية" : "Quantity",
      AVAIL: language === "Arabic" ? "التوفّر" : "Availability",
      CARD: language === "Arabic" ? "إضافة إلى العربة" : "Add to Cart",
      GUIDE: language === "Arabic" ? "دليل المقاسات" : "size guide",
      THIS: language === "Arabic" ? "" : "Rate This Product",
      STORE: language === "Arabic" ? "ابحث في المتجر" : "Search In Store",
      DEL: language === "Arabic" ? "التسليم والإرجاع" : "Delivery & Returns",
      REV: language === "Arabic" ? "إعادة النظر" : "Review",
      SHARE: language === "Arabic" ? "شارك" : "Share",
    },
    dash: {
      MY: language === "Arabic" ? "حسابي" : "My Account",
      DASH: language === "Arabic" ? "لوحة تحكم التطبيق" : "Dashboard",
      ORDER: language === "Arabic" ? "طلباتي" : "My Orders",
      ORDERS: language === "Arabic" ? "الطلبات" : "Orders",
      DELIVERED: language === "Arabic" ? "تم تسليمها" : "Delivered",
      TRACK: language === "Arabic" ? "تتبّع الطلب" : "Track Orders",
      RETURN: language === "Arabic" ? "تم إعادتها" : "Returned",
      WISH: language === "Arabic" ? "قائمة أمنياتي" : "My Wishlist",
      ACCOUNT: language === "Arabic" ? "الحسابات" : "Account",
      PROFILE:
        language === "Arabic" ? "البيانات الشخصية" : "Profile Information",
      MANAGE: language === "Arabic" ? "تعديل العناوين" : "Manage Subscription",
      CHANGE: language === "Arabic" ? "تغيير كلمة المرور" : "Change Password",
      REVIEW: language === "Arabic" ? "آرائي" : "My Reviews",
      SUBS: language === "Arabic" ? "تعديل الاشتراك" : "Manage Subscription",
      NOTIFY: language === "Arabic" ? "أبلغني" : "Notify Me",
      LOG: language === "Arabic" ? "تسجيل الخروج" : "Logout",
      NUM: language === "Arabic" ? "رقم الأمر" : "Order Number",
      DETAILS: language === "Arabic" ? "حفظ التفاصيل" : "SAVE DETAILS",
      NEW: language === "Arabic" ? "أضف عنوان جديد" : "Add New Address",
      PASS:
        language === "Arabic"
          ? "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل مع حرف كبير واحد وحرف صغير وحرف رقمي واحد"
          : "Password must be at least 8 characters long with 1 Uppercase, 1 Lowercase & 1 Numeric character",
      MYSUBS: language === "Arabic" ? "اشتراكي" : "My Subscriptions",
      VIEW: language === "Arabic" ? "عرض المنتج" : "View Product",
      TYPE:
        language === "Arabic"
          ? "اكتبي كلمة المرور الحالية"
          : "Type Current Password",
      CURRENT:
        language === "Arabic"
          ? "اكتبي كلمة المرور الجديدة"
          : "Type New Password",
      RETYPE:
        language === "Arabic"
          ? "إعادة كتابة كلمة المرور الجديدة"
          : "Retype New Password",
    },
    orderConfirmation: {
      CONGO: language === "Arabic" ? "تهانينا!" : "Congratulations!",
      GO: language === "Arabic" ? "الذهاب إلى طلباتي" : "GO TO MY ORDERS",
    },
    deliveryAddress: {
      SHIP: language === "Arabic" ? "طريقة الشحن" : "SHIPPING METHOD",
      PLEASE:
        language === "Arabic"
          ? "الرجاء تحديد عنوان الشحن لإظهار طرق الشحن المتاحة."
          : "Please specify the shipping address to see available options.",
      RETURN: language === "Arabic" ? "العودة لعربة التسوّق" : "RETURN TO CART",
      CONT: language === "Arabic" ? "متابعة التسوّق" : "CONTINUE SHOPING",
      ORDER: language === "Arabic" ? "مراجعة الطلب" : "ORDER REVIEW",
      ENTER:
        language === "Arabic"
          ? "ادخلي رمز الخصم إن توفّر"
          : "Enter your coupon code if you have any.",
      APPLY: language === "Arabic" ? "تطبيق" : "APPLY",
      REMOVE: language === "Arabic" ? "إزالة" : "REMOVE",
      USE:
        language === "Arabic"
          ? "استعمال نقاط العملاء المميّزين  0 نقاط موجودة"
          : "Use Loyalty Cash 0 Available",
      YOU:
        language === "Arabic"
          ? "عليك ربح 50 نقطة على الأقل لاستخدامها في طلباتك المستقبلية"
          : "*You have to earn a minimum of 50 Loyalty Cash before you can redeem it in your future purchases.",
      CHOOSE:
        language === "Arabic" ? "اختيار سرعة الشحن" : "CHOOSE A DELIVERY SPEED",
      SUB: language === "Arabic" ? "المجموع الإجمالي" : "SUBTOTAL",
      DEL: language === "Arabic" ? "مصاريف التوصيل" : "DELIVERY CHARGES",
      TAX: language === "Arabic" ? "الضرائب" : "TAX",
      COUPON: language === "Arabic" ? "تم تطبيق القسيمة" : "Coupon Applied",
      GRAND: language === "Arabic" ? "المجموع الكامل" : "GRAND TOTAL ",
      SIGN:
        language === "Arabic" ? "اشتركي في نشرتنا" : "Sign up for Newsletter",
      WE:
        language === "Arabic"
          ? "بإمكانك تعبئة طلب الإرجاع حتى 14 يومًا من استلام الطلب. تطبّق الشروط والأحكام"
          : "  We offer easy returns up to 14 days. Terms & Conditions apply.",
      SECURE:
        language === "Arabic"
          ? "البيانات مؤمّنة ومشفّرة بنسبة 100%"
          : "100% SECURE DATA ENCRYPTION",
      SECURITY:
        language === "Arabic"
          ? "نضمن لكم أمان عملية الشراء."
          : "We guarantee security of every transaction.",
      EXPRESS:
        language === "Arabic"
          ? "يتميّز شحن الإكسبرس بتوصيل الطلب خلال 3-6 أيام عمل. سيتم تحويلك لموقع ماستر كارد (AMEX) لإتمام الدفع وثم العودة لموقع ريفا."
          : "Express Shipping in 3-6 Business Days. You will be redirected to the website of Mastercard Internet Gateway System (AMEX) when you place your order. And then you will automatically return to rivafashion.com.",
          LET: language==="Arabic" ? "تواصلي معنا على":"Let us hear from you at",
          BOX:language==="Arabic"?"نسعد بخدمتك 24 ساعة على مدار الأسبوع.":" we are available to serve you 24 hours all week long & always happy to help you",
          PRO:language==="Arabic"?"منتجات":"PRODUCTS"
    },
  };
  useEffect(() => {
    setTranslate(dict);
  }, []);
  return { translate };
}

export default useArabic;
