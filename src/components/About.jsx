import { useLanguage } from '../context/LanguageContext';
import about1 from '../assets/sara-cafe-about1.jpg';
import about2 from '../assets/sara-cafe-about2.jpg';
import about3 from '../assets/sara-cafe-about3.jpg';
import about4 from '../assets/sara-cafe-about4.jpg';
import about5 from '../assets/sara-cafe-about5.jpg';
import about6 from '../assets/sara-cafe-about6.jpg';

const About = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    ar: {
      hero: {
        title: 'من نحن',
        subtitle: 'قصة مقهى سارة',
      },
      introduction: {
        title: 'مقدمة',
        text: 'مقهى سارة هو مقهى محلي يقع في جدة / شارع البترجي. تأسس في 21 فبراير 2014. يجمع المقهى بين الشرق والغرب مع الحفاظ على القيم التقليدية. يقدم أطباقاً متنوعة تتراوح من الوجبات الصحية إلى الإفطار والبرانش، وينتهي بمجموعة واسعة من خيارات القهوة. الأجواء هادئة ومشرقة ومليئة بالحياة. يجذب عملاء من جميع الأنواع ولكن خاصة البالغين. يوفر مساحة خاصة للنساء للاسترخاء والتجمع مع الأصدقاء في القسم العلوي من المقهى.',
      },
      founder: {
        title: 'المؤسس',
        name: 'سارة محجوب',
        role: 'المؤسس / الرئيس التنفيذي',
        description: 'سارة هي أم وزوجة وامرأة أعمال مجتهدة. كانت مصممة على إيجاد مساحة مخصصة للنساء وخالية من التدخين، وعندها أسست مقهى سارة للسيدات في 21 فبراير 2014، ليكون مقهى فريداً من نوعه يحتوي على قسم مخصص فقط للنساء. حلمها لم يكن مجرد تأسيس عمل تجاري، بل إنشاء مجتمع حوله يشارك نفس القيم.',
      },
      mission: {
        title: 'الرسالة',
        text: 'نحن في مقهى سارة نعد بتقديم تجربة استثنائية لعملائنا أثناء صنع طعام لذيذ وحقيقي ومخبوز طازجاً. بهدف وحيد وهو جعل يوم شخص ما يشعر بالنشاط والإيجابية.',
      },
      vision: {
        title: 'الرؤية',
        text: 'نهدف إلى خلق المزيد من الوعي حول مذاق الطعام الحقيقي، ونأمل في نشر الفرح والطاقة الإيجابية مع كل قضمة وكل تجربة.',
      },
      values: {
        title: 'القيم الأساسية',
        items: [
          'لا نستخدم أبداً المواد المضافة أو الألوان أو النكهات الاصطناعية.',
          'رضا عملائنا هو الأولوية رقم 1.',
          'فريقنا لطيف ومرحب وودود.',
          'المساحة بسيطة ومشرقة وطبيعية.',
        ],
      },
    },
    en: {
      hero: {
        title: 'About Us',
        subtitle: 'The Story of Sara Cafe',
      },
      introduction: {
        title: 'Introduction',
        text: 'Sara Cafe is a local cafe located in Jeddah / Al Batarji st. It was established on 21-February-2014. The cafe mixes between the east and the west whilst also holding traditional values. it offers various dishes ranging from healthy meals to breakfast and brunch and finishing with a wide range of coffee options. The atmosphere is calm, bright and full of life. It attracts customers of all sorts but specially Adults. It offers a private space for women to chill and gather with friends in the top section of the cafe.',
      },
      founder: {
        title: 'Founder',
        name: 'Sara Mahjoub',
        role: 'Founder/ CEO',
        description: 'Sara is a mom, a wife and a hard working business woman, She was determined to find a space where it is dedicated for women and is non-smoking thats when She has founded Sara Ladies Cafe in February 21-2014, with it being a one of a kind cafe that has a section dedicated only for women. her dream was to not just found a business, but to create a community around it that shares the same values.',
      },
      mission: {
        title: 'Mission Statement',
        text: 'We at Sara Cafe promise to provide our customers an out of the world experience while crafting tasty, real and freshly baked food. with the sole purpose to make someone\'s day feel energized and positive.',
      },
      vision: {
        title: 'Vision Statement',
        text: 'We aim to create more awareness about what real food tastes like, we hope to spread joy and positive vibes with every bite and every experience.',
      },
      values: {
        title: 'Core Values',
        items: [
          'We never use additives, colors or artificial flavorous.',
          'Our customer satisfaction is the number 1 priority.',
          'Our team is kind, welcoming and friendly.',
          'The space is simple, light and earthy.',
        ],
      },
    },
  };

  const t = content[language];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${about1})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sand-beige/80 via-sand-beige/60 to-sand-beige/80" />
        </div>
        <div className="absolute inset-0 bg-sand-beige/40" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm md:text-base text-olive-green/80 font-light tracking-[0.2em] uppercase mb-4">
            {t.hero.subtitle}
          </span>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-olive-green mb-6 leading-tight"
            style={{
              fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
              fontWeight: isArabic ? 600 : 400,
              textShadow: '0 2px 20px rgba(101, 132, 111, 0.2)',
            }}
          >
            {t.hero.title}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${isArabic ? 'lg:order-2' : ''}`}>
              <h2
                className="text-3xl md:text-4xl font-normal text-olive-green mb-6"
                style={{
                  fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                  fontWeight: isArabic ? 600 : 400,
                }}
              >
                {t.introduction.title}
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent mb-6"></div>
              <p
                className="text-lg text-warm-gray/90 leading-relaxed"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.introduction.text}
              </p>
            </div>
            <div className={`${isArabic ? 'lg:order-1' : ''}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={about2}
                    alt="Sara Cafe"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  <img
                    src={about3}
                    alt="Sara Cafe"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src={about4}
                    alt="Sara Cafe"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                  <img
                    src={about5}
                    alt="Sara Cafe"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gradient-to-b from-sand-beige/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${isArabic ? 'lg:order-2' : ''}`}>
              <img
                src={about6}
                alt={t.founder.name}
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
            <div className={`${isArabic ? 'lg:order-1' : ''}`}>
              <span
                className="inline-block text-sm md:text-base text-olive-green/80 font-light tracking-[0.2em] uppercase mb-4"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.founder.title}
              </span>
              <h2
                className="text-3xl md:text-4xl font-normal text-olive-green mb-2"
                style={{
                  fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                  fontWeight: isArabic ? 600 : 400,
                }}
              >
                {t.founder.name}
              </h2>
              <p
                className="text-lg text-olive-green/80 mb-6 font-medium"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.founder.role}
              </p>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent mb-6"></div>
              <p
                className="text-lg text-warm-gray/90 leading-relaxed"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.founder.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-normal text-olive-green mb-4"
              style={{
                fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                fontWeight: isArabic ? 600 : 400,
              }}
            >
              {isArabic ? 'رسالتنا ورؤيتنا وقيمنا' : 'Our Mission, Vision & Core Values'}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-olive-green/40 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-sand-beige/50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-olive-green/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-normal text-olive-green mb-4"
                style={{
                  fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                  fontWeight: isArabic ? 600 : 400,
                }}
              >
                {t.mission.title}
              </h3>
              <p
                className="text-warm-gray/90 leading-relaxed"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.mission.text}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-sand-beige/50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-olive-green/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-normal text-olive-green mb-4"
                style={{
                  fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                  fontWeight: isArabic ? 600 : 400,
                }}
              >
                {t.vision.title}
              </h3>
              <p
                className="text-warm-gray/90 leading-relaxed"
                style={{
                  fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                }}
              >
                {t.vision.text}
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-br from-sand-beige/50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-olive-green/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-olive-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3
                className="text-2xl font-normal text-olive-green mb-4"
                style={{
                  fontFamily: isArabic ? "'Zain', serif" : "'Playfair Display', serif",
                  fontWeight: isArabic ? 600 : 400,
                }}
              >
                {t.values.title}
              </h3>
              <ul className="space-y-3">
                {t.values.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-warm-gray/90"
                    style={{
                      fontFamily: isArabic ? "'Alexandria', sans-serif" : "'Montserrat', sans-serif",
                    }}
                  >
                    <svg className="w-5 h-5 text-olive-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

