// "use client";

// import { usePathname } from 'next/navigation';
// import Navbar from './Navbar';

// export default function ConditionalNavbar() {
//   const pathname = usePathname();

//   // Define routes where navbar should be hidden
//   const hideNavbarRoutes = [
//     '/recruiter/login',
//     '/recruiter/dashboard',
//   "recruiter/jobs"
//     // add more as needed
//   ];

//   const shouldHide = hideNavbarRoutes.some(route => pathname?.startsWith(route));

//   if (shouldHide) {
//     return null;
//   }

//   return <Navbar />;
// }