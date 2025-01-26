
import { formatQuantiy } from "@/utils/format";


type PropertyDetailsProps = {
    details : {
        bedrooms : number;
        baths: number;
        guests : number;
        beds : number;
    }
}

const PropertiesDetails = ({details: {bedrooms,baths,beds,guests}} : PropertyDetailsProps) => {

    return (
        <p className="text-md font-light">
            <span>{formatQuantiy(bedrooms,'bedroom')} &middot;</span>
            <span>{formatQuantiy(baths,'bath')} &middot;</span>
            <span>{formatQuantiy(beds,'bed')} &middot;</span>
            <span>{formatQuantiy(guests,'guest')}</span>
        </p>
    )
}

export default PropertiesDetails;