import { ROUTES } from '../components/routes/routes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: ROUTES | number;
}

export default TabPanelProps;
