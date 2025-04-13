import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Uganda Police Documents Archive">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#F5F6F5] p-6 text-[#1A2526] lg:justify-center lg:p-8 dark:bg-[#1A2526] dark:text-[#E8ECEF]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-5xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-md border border-[#005B5E] px-5 py-1.5 text-sm leading-normal text-[#005B5E] hover:bg-[#005B5E] hover:text-white dark:border-[#00A3A6] dark:text-[#E8ECEF] dark:hover:bg-[#00A3A6] dark:hover:text-[#1A2526]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-md border border-transparent px-5 py-1.5 text-sm leading-normal text-[#005B5E] hover:border-[#005B5E] dark:text-[#E8ECEF] dark:hover:border-[#00A3A6]"
                                >
                                    Log in
                                </Link>
                                {/* <Link
                                    href={route('register')}
                                    className="inline-block rounded-md border border-[#005B5E] px-5 py-1.5 text-sm leading-normal text-[#005B5E] hover:bg-[#005B5E] hover:text-white dark:border-[#00A3A6] dark:text-[#E8ECEF] dark:hover:bg-[#00A3A6] dark:hover:text-[#1A2526]"
                                >
                                    Register
                            </Link> */}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-5xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(0,91,94,0.2)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#2A3637] dark:text-[#E8ECEF] dark:shadow-[inset_0px_0px_0px_1px_rgba(0,163,166,0.2)]">
                            <h1 className="mb-1 text-xl font-bold">Welcome to the Uganda Police Documents Archive</h1>
                            <p className="mb-2 text-[#6B7280] dark:text-[#A0A9AC]">
                                Access a secure and comprehensive repository of official Uganda Police documents.
                                <br />
                                Start exploring with these steps:
                            </p>

                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a
                                        href="/login"
                                        className="inline-block rounded-md border border-[#005B5E] bg-[#005B5E] px-5 py-1.5 text-sm leading-normal text-white hover:bg-[#004849] dark:border-[#00A3A6] dark:bg-[#00A3A6] dark:hover:bg-[#008B8E]"
                                    >
                                        Login
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#E8ECEF] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#2A3637]">
                            {/* Uganda Police Logo Placeholder */}
                            <img
                                src="https://publicopinions.net/wp-content/uploads/2023/07/police.png" // Replace with actual logo path
                                alt="Uganda Police Logo"
                                className="w-full h-auto object-contain translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-6 starting:opacity-0"
                            />
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(0,91,94,0.2)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_rgba(0,163,166,0.2)]" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
