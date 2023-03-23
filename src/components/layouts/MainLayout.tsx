import React, { Children, FC, ReactNode } from 'react';
import Footer from '@common/footer/Footer';
import Navbar from '@common/navbar/Navbar';

interface IMainLayout {
  children: ReactNode;
  showProfile?: boolean;
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <div>
      {/* <Navbar showProfile={showProfile} /> */}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
