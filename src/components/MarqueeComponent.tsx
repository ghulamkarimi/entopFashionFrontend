import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
    return (
       <div>
        <Marquee
            className="bg-marquee text-white font-semibold text-sm py-3 shadow-md "
            speed={50}
            gradient={false}
            pauseOnHover={true}
        >
            <span className="mx-10">Willkommen bei Entop Fashion, dein Moment!</span>  
            <span className="mx-10">Kostenloser Versand ab 50€ Bestellwert!</span>
            <span className="mx-10">Snappen Sie jetzt unsere Angebote!</span>
        
            </Marquee>
       </div>
    )
    }
export default MarqueeComponent;