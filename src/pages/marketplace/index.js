import { useAccount } from '@components/hooks/web3'
import { useNetwork } from '@components/hooks/web3'
import { WalletBar } from "@/components/ui/web3"
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function Marketplace({courses}) {

    const { account } = useAccount()
    const { network } = useNetwork()

    return (
        <>
            <div className='py-4'>
                <WalletBar
                    account={account}
                    network={network.data}
                    isLoading={network.isLoading}
                    hasInitialResponse={network.hasInitialResponse}
                />
            </div>

            <CourseList
                courses={courses}
            >
                {
                    (course) => 
                        <CourseCard 
                            key={course.id} 
                            course={course}
                        />
                }
            </CourseList>
        </>
  )
}

Marketplace.Layout = BaseLayout