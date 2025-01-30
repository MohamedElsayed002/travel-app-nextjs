import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

const HomePage = async ({ searchParams }: { searchParams: { category?: string; search?: string } }) => {

  const category = searchParams?.category || undefined
  const search = searchParams?.search || undefined


  return (
    <section>


      <CategoriesList
        category={category}
        search={search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={category}
          search={search}
        />
      </Suspense>
    </section>
  )
}

export default HomePage;