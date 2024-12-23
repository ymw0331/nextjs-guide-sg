import scaleImg from 'public/images/scale.jpg';
import Hero from '@/components/hero';

// console.log(homeImg);

export default function ScalePage() {
    return (
        <Hero
            imgData={scaleImg}
            imgAlt="Steel Factory"
            title='Scale your ap to infinity'
        />

    );
}
