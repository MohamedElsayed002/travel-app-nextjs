import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import RatingInput from "@/components/form/RatingInput";
import Amenities from "@/components/properties/Amenities";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import { DynamicMap } from "@/components/properties/DynamicMap";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertiesDetails from "@/components/properties/PropertyDetials";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server'
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";



const DynamicBookingWrapper = dynamic(
    () => import('@/components/booking/BookingWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />
    }
)



async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = await fetchPropertyDetails(params.id)
    if (!property) redirect('/')
    const { baths, bedrooms, beds, guests } = property
    const details = { baths, bedrooms, beds, guests }

    const firstName = property.profile.firstName
    const profileImage = property.profile.profileImage


    const { userId } = auth()
    const isNotOwner = property.profile.clerkId !== userId
    const reviewDoesNotExist = userId && isNotOwner && !(await findExistingReview(userId, property.id))



    return (
        <section>
            <BreadCrumbs name={property.name} />
            <header className='flex justify-between items-center mt-4'>
                <h1 className='text-4xl font-bold'>{property.tagline}</h1>
                <div className='flex items-center gap-x-4'>
                    {/* share button */}
                    <ShareButton name={property.name} propertyId={property.id} />
                    <FavoriteToggleButton propertyId={property.id} />
                </div>
            </header>
            <ImageContainer mainImage={property.image} name={property.name} />
            <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
                <div className='lg:col-span-8'>
                    <div className='flex gap-x-4 items-center'>
                        <h1 className='text-xl font-bold'>{property.name}</h1>
                        <PropertyRating inPage propertyId={property.id} />
                    </div>
                    <PropertiesDetails details={details} />
                    <UserInfo profile={{ firstName, profileImage }} />
                    <Separator className="mt-4" />
                    <Description description={property.description} />
                    <Amenities amenities={property.amenities} />
                    <DynamicMap countryCode={property.country} />
                </div>
                <div className='lg:col-span-4 flex flex-col items-center'>
                    {/* calendar */}    
                    <DynamicBookingWrapper
                        propertyId={property.id}
                        price={property.price}
                        bookings={property.bookings}
                    />

                </div>
            </section>
            {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
            <PropertyReviews propertyId={property.id} />
        </section>
    )

}

export default PropertyDetailsPage