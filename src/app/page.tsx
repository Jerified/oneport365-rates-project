import Rate from "@/components/Rate";

export default async function Home() {

    return (
        <main className="py-8 px-5 max-w-8xl mx-auto bg-white min-h-screen ">
            <h1 className='font-medium text-4xl pb-8'>Special Rates</h1>
            <div className="">
                <Rate />
            </div>
        </main>
    );
}
