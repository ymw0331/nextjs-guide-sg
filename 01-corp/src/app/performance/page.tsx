import performaceImg from 'public/images/performance.jpg'
import Hero from '@/components/hero';

// console.log(homeImg);

export default function PerformancePage() {
    return (
        <Hero
            imgData={performaceImg}
            imgAlt="Welding"
            title='We serve high performance applications'
        />

    );
}
