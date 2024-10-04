"use client";
import Link from 'next/link';
import { useAuth, SignOutButton, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Navbar1() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/sign-up?redirect=/UserInfoForm');
    };

    return (
        <header className="bg-black text-white z-10">
            <div className="container mx-auto flex items-center justify-between p-4">
                <nav className="flex items-center space-x-4 bg-gray-800 rounded-full p-1">
                    <Link href="/Home">
                        <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                            Home
                        </button>
                    </Link>
                    <Link href="/social">
                        <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                            Social
                        </button>
                    </Link>
                    <Link href="/Disaster">
                        <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                            Disaster
                        </button>
                    </Link>
                    <Link href="/help">
                        <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                            Help
                        </button>
                    </Link>
                </nav>
                <div className="flex items-center space-x-4 ml-auto">
                    {isLoaded && (
                        isSignedIn ? (
                            <SignOutButton>
                                <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        ) : (
                            <SignInButton mode="modal">
                                <button onClick={handleSignIn} className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300">
                                    Sign Up
                                </button>
                            </SignInButton>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}