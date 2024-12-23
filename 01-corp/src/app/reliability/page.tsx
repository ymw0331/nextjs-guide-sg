import reliabilityImg from 'public/images/reliability.jpg';
import Hero from '@/components/hero';

// console.log(homeImg);

export default function ReliabilityPage() {
    return (
        <Hero
            imgData={reliabilityImg}
            imgAlt="Welding"
            title='Super high reliability hosting'
        />

    );
}
