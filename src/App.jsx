import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import Modal from './components/common/Modal';
import BccChatbot from './components/chat/BccChatbot';
import LoginScreen from './components/common/LoginScreen';

// Modals
import PaymentModal from './components/modals/PaymentModal';
import MemberDetailModal from './components/modals/MemberDetailModal';
import NewApplicationModal from './components/modals/NewApplicationModal';
import EventDetailModal from './components/modals/EventDetailModal';
import PayrollModal from './components/modals/PayrollModal';

// Views
import DashboardView from './views/Dashboard/DashboardView';
import MembersView from './views/Members/MembersView';
import StaffView from './views/Staff/StaffView';
import StayView from './views/Stay/StayView';
import PosView from './views/Pos/PosView';
import FitnessView from './views/Fitness/FitnessView';
import PaymentsView from './views/Payments/PaymentsView';
import ReportsView from './views/Reports/ReportsView';
import EventsView from './views/Events/EventsView';
import ErpModuleView from './views/ErpModules/ErpModuleView';

export default function App() {
  const { view, modal, isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderActiveView = () => {
    switch (view) {
      case 'dash':
        return <DashboardView />;
      case 'members':
        return <MembersView />;
      case 'staff':
        return <StaffView />;
      case 'stay':
        return <StayView />;
      case 'pos':
        return <PosView />;
      case 'fit':
        return <FitnessView />;
      case 'pay':
        return <PaymentsView />;
      case 'rep':
        return <ReportsView />;
      case 'events':
        return <EventsView />;
      default:
        // Check if ERP module
        return <ErpModuleView moduleKey={view} />;
    }
  };

  return (
    <div className="app selection:bg-bcc-gold/30">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="min-w-0 flex flex-col">
        <Header />

        <div id="view" className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </div>
      </main>

      {/* Global Modals */}
      {modal.isOpen && (
        <Modal wide={modal.type === 'member_detail'}>
          {modal.type === 'payment' && <PaymentModal />}
          {modal.type === 'member_detail' && <MemberDetailModal />}
          {modal.type === 'new_app' && <NewApplicationModal />}
          {modal.type === 'event_detail' && <EventDetailModal />}
          {modal.type === 'payroll' && <PayrollModal />}
        </Modal>
      )}

      {/* Floating System Toast */}
      <Toast />

      {/* AI Member Assistant & Roadmap Chatbot */}
      <BccChatbot />
    </div>
  );
}
