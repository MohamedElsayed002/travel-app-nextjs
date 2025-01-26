
import { Amenity } from "@/utils/amenities";
import { LuFolderCheck } from "react-icons/lu";
import Title from "./Title";


const Amenities = ({amenities} : {amenities : string}) => {

    const amenitiesList : Amenity[] = JSON.parse(amenities as string)
    const noAmenities = amenitiesList.every((amenity) => !amenity.selected)
    if(noAmenities) return null

    return (
        <div className="mt-4">
            <Title text='What this place offers' />
            <div className="grid md:grid-cols-2 gap-x-4">
                {amenitiesList.map((amentiy) => {
                    if(!amentiy.selected) return null
                    return (
                        <div key={amentiy.name} className="flex items-center gap-x-4 mb-2">
                            <LuFolderCheck size={24} className="h-6 w-6 text-primary" />
                            <span className="font-light text-sm capitalize">{amentiy.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Amenities