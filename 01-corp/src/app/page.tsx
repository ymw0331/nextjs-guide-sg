import homeImg from 'public/images/home.jpg';
import Hero from '@/components/hero';

// console.log(homeImg);

export default function Home() {
  return (
    <Hero
      imgData={homeImg}
      imgAlt="Car Factory"
      title='Professional Cloud Hosting'
    />

  );
}
