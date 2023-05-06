import './HomePage.scss';

import { useNavigate, useSearchParams } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import { ROUTES } from '../../routes/routes';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');

  useEffect(() => {
    if (employeeIdParam) {
      if (location.pathname === '/') {
        navigate(`${ROUTES.SKILLS}?employeeId=${employeeIdParam}`);
        return;
      }
    } else {
      if (location.pathname === '/') {
        navigate(`${ROUTES.SKILLS}?filter=my`);
        return;
      }
    }
    navigate(location.pathname + location.search);
  }, []);

  return (
    <main>
      <Header />
      <img src="https://logosandtypes.com/wp-content/uploads/2022/03/Cognizant.png" alt="" className="img"></img>
      {/* <TabPanel index={0} value={0} /> */}
      <Main />
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
