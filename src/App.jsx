import Home from './home';
import { Route, Routes } from 'react-router-dom';
import User from './user';
import NaveBar from './navebar';
import Vechialdetial from './vechialdetial';
import CustomerDetial from './customerDetial';
import Incomeform from './incomeform';
import Tripmodify from './TripModify';
import { FeedbackProvider } from './FeedbackContext';
import Incomemodify from './incomeeditpage';
import NewCustomer from './newcustomerform';
import Secreteuserdelete from './secretuserdelete';
import NewVechial from './newvechile';
import Secretevechiledelete from './sceretedelete';
const ExampleComponent = () => {
  return (
    <FeedbackProvider>
      <div>
        <NaveBar />
        <Routes>
          <Route path='/user' element={<User />} />
          <Route path='/vechialdetial/:id' element={<Vechialdetial />} />
          <Route path='/customerdetial/:id' element={<CustomerDetial />} />
          <Route path='/' element={<Home />} />
          <Route path='/addincome' element={<Incomeform />} />
          <Route path='/tripmodify/:id' element={<Tripmodify />} />
          <Route path='/incomeedit/:id' element={<Incomemodify />} />
          <Route path='/newcustomer' element={<NewCustomer />} />
          <Route path='/scereteuserdelete' element={<Secreteuserdelete />} />
          <Route path='/newvechile' element={<NewVechial />} />
          <Route path='/secretevechiledelete' element={<Secretevechiledelete/>} />
        </Routes>
      </div>
    </FeedbackProvider>
  );
};
export default ExampleComponent;