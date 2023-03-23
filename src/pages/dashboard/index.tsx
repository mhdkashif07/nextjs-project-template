import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/auth-context';

const Dashboard = () => {
  return (
    <div className="dashboard__section">
      <div className="container">
        <div className="dashboard__container">
          <h1>Dashboard page</h1>
        </div>
      </div>
    </div>
  );
};

export const NestedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    // checks if the user is authenticated
    console.log(authContext.isUserAuthenticated());
    authContext.isUserAuthenticated()
      ? router.push('/dashboard')
      : router.push('/login');
  }, []);
  useEffect(() => {
    router.push('/dashboard');
  }, []);
  return (
    <>
      <Navbar />
      <div className="containe">
        <div className="main__section">
          <div className="layout">
            <div className="dashboard__sidebar">
              <ul>
                <li>
                  <Link href="/dashboard/cart">
                    <a href="">Cart</a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile">
                    <a href="">Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="layout__content--main">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <NestedLayout>{page}</NestedLayout>;
};

export default Dashboard;
