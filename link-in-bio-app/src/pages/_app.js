import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css"; // Make sure this is the correct path to your global styles

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
