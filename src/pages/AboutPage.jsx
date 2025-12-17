import About from '../components/About';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const AboutPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <>
      <SEO
        title={t.seo.about.title}
        description={t.seo.about.description}
        keywords={t.seo.about.keywords}
        image="/sara-logo.png"
        type="website"
      />
      <About />
    </>
  );
};

export default AboutPage;

