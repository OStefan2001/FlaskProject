import React, { useState } from 'react';
import './dashboard.css';
import AddMoneyModal from './addMoney';
import ViewIncome from './viewIncome';
import Cheltuieli from './Cheltuieli/cheltuieli'; 
import RaportLunar from './raportLunar'; 

interface SuccessComponentProps {
  userName: string;
  onLogout: () => void;
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ userName, onLogout }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showIncome, setShowIncome] = useState<boolean>(false);
  const [showCheltuieli, setShowCheltuieli] = useState<boolean>(false);
  const [showRaport, setShowRaport] = useState<boolean>(false);

  const renderComponent = () => {
    switch (true) {
      case showCheltuieli:
        return <Cheltuieli showC={showCheltuieli} onBackC={() => setShowCheltuieli(false)} />;
      case showIncome:
        return <ViewIncome show={showIncome} onBack={() => setShowIncome(false)} />;
      case showRaport:
        return <RaportLunar showR={showRaport} onBackR={() => setShowRaport(false)} />;
      default:
        return null; // Returnează null dacă niciunul nu este activat
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="card-nav mx-auto mt-0">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0 mx-auto">Bun venit!</h5>
            <h1 className="text-center">Hello, {userName}!</h1>
            <button className="btn btn-danger mx-auto" onClick={onLogout}>
              Delogare
            </button>
          </div>
        </div>

        {renderComponent()}

        {!(showCheltuieli || showIncome || showRaport) && (
          <div className="row mt-4">
            <div className="col-md-3 mb-1">
              <div className="card h-100 bg-white">
                <div className="card-body text-center">
                  <i className="bi bi-plus-circle fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">Adaugă Bani</h5>
                  <p className="card-text">Introduceți veniturile dumneavoastra lunare.</p>
                  <button className="btn btn-apple" onClick={() => setShowModal(true)}>
                    Adaugă
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-1">
              <div className="card h-100 bg-white mb-1">
                <div className="card-body text-center">
                  <i className="bi bi-bar-chart fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">Vizualizează Raport Lunar</h5>
                  <p className="card-text">Vizualizați raportul dvs. financiar lunar.</p>
                  <button className="btn btn-apple" onClick={() => setShowRaport(true)}>
                    Vizualizează
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-1">
              <div className="card h-100 bg-white mb-1">
                <div className="card-body text-center">
                  <i className="bi bi-wallet fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">Vizualizează Venituri</h5>
                  <p className="card-text">Vizualizați toate veniturile înregistrate.</p>
                  <button className="btn btn-apple" onClick={() => setShowIncome(true)}>
                    Vizualizează
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-1">
              <div className="card h-100 bg-white mb-1">
                <div className="card-body text-center">
                  <i className="bi bi-credit-card fs-1 text-primary mb-3"></i>
                  <h5 className="card-title">Vizualizează Cheltuieli</h5>
                  <p className="card-text">Vizualizați toate cheltuielile înregistrate.</p>
                  <button className="btn btn-apple" onClick={() => setShowCheltuieli(true)}>
                    Vizualizează
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <AddMoneyModal show={showModal} handleClose={() => setShowModal(false)} />
      </div>
    </>
  );
};

export default SuccessComponent;
