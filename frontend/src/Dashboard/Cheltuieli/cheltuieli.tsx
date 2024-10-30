import { useState } from "react";
import AddCheltuieliModal from "./adaugaCheltuieli";
import ViewExpenses from "./viewExpenses";

interface cheltuieliProps {
    showC: boolean;
    onBackC: () => void;
}

const Cheltuieli: React.FC<cheltuieliProps> = ({ showC, onBackC }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showExpenses, setShowExpenses] = useState<boolean>(false)
    if (!showC) return null;
    return (
        <>

            {showExpenses ? (<ViewExpenses show={showExpenses} onBack={() => setShowExpenses(false)} />) : (
                <>
                    <div className="text-center mt-2"><button className="btn btn-secondary mb-3" onClick={onBackC}>Înapoi</button></div>
                    <div className="row mt-4">
                        <div className="col-md-6 mb-1">
                            <div className="card h-100 bg-white mb-1">
                                <div className="card-body text-center">
                                    <i className="bi bi-credit-card fs-1 text-primary mb-3"></i>
                                    <h5 className="card-title">Vizualizează Cheltuieli</h5>
                                    <p className="card-text">Vizualizați toate cheltuielile înregistrate.</p>
                                    <button className="btn btn-apple" onClick={() => { setShowExpenses(true) }}>
                                        Vizualizează
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-1">
                            <div className="card h-100 bg-white mb-1">
                                <div className="card-body text-center">
                                    <i className="bi bi-plus-circle fs-1 text-primary mb-3"></i>
                                    <h5 className="card-title">Adaugă Cheltuieli</h5>
                                    <p className="card-text">Introduceți noi cheltuieli pentru bugetul dvs.</p>
                                    <button className="btn btn-apple" onClick={() => { setShowModal(true) }}>
                                        Adaugă
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


            <AddCheltuieliModal show={showModal} handleClose={() => setShowModal(false)} />
        </>
    );
}
export default Cheltuieli;