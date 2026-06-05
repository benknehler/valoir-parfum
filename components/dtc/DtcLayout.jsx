import DtcHeader from './DtcHeader.jsx';
import DtcFooter from './DtcFooter.jsx';

export default function DtcLayout({ children }) {
  return (
    <>
      <DtcHeader />
      {children}
      <DtcFooter />
    </>
  );
}
