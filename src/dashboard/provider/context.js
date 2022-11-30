import React from 'react';
import { useRouter } from 'next/router';
// create new context
const Context = React.createContext({});

export default function DashboardProvider({ children }) {
  // const {data: session, status } = useSession()
  const [open, setOpen] = React.useState(false);

  const ref = React.useRef(null);
  const router = useRouter();

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // set the html tag style overflow to hidden
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, []);

  // check if user authenticated is allowed in the page
  // React.useEffect(() => {
  //   const role = {
  //     1: "/admin",
  //     2: "/agent",
  //     3: "/support",
  //     4: "/user"
  //   }
  //   if (session?.user?.role !== router.params(role(session?.user?.role))) {
  //     router.push('/auth/login');
  //   }
  //   return;

  // }, [status]);


  // close side navigation when route changes
  React.useEffect(() => {
    if (open) {
      router.events.on('routeChangeStart', () => {
        // <Loader />
        setOpen(false)
      });
    }

    return () => {
      if (open) {
        router.events.off('routeChangeStart', () => setOpen(false));
      }
    };
  }, [open, router]);

  // close side navigation on click outside
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!open) return;
        setOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [open, ref]);

  return (
    // <SessionProvider>
      <Context.Provider value={{ open, ref, toggle }}>
        {children}
      </Context.Provider>
    // </SessionProvider>
  );
}

// custom hook to consume all context values { open, ref, toggle }
export function useToggle() {
  return React.useContext(Context);
}
