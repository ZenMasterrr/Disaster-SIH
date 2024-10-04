// pages/help.js
import Head from 'next/head';
import ModalsComponent from '../components/Modals';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8 [mask-image:linear-gradient(to_bottom,white,rgba(255,255,255,0.6))] pointer-events-none" />
            <div className="relative z-10 bg-white/15 backdrop-blur-md rounded-lg shadow-xl p-10 max-w-2xl w-full">
            <Head>
                <title>Modal</title>
            </Head>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Help Center</h1>
            <div className="mt-8">
                <ModalsComponent />
            </div>
            </div>
        </div>
    );
}

