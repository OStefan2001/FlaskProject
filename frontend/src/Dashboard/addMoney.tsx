import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface AddMoneyModalProps {
    show: boolean;
    handleClose: () => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ show, handleClose }) => {
    const [amount, setAmount] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const handleAddMoney = async (amount: number, description: string) => {
        try {
            const response = await fetch('/api/add_money', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, description }),
            });

            if (!response.ok) {
                setErrorMessage('Eroare la adăugarea banilor' );
                throw new Error('Eroare la adăugarea banilor');
            }else{
                setSuccessMessage('Banii au fost adaugati cu success!');
            }
        } catch (error) {
            console.error('Eroare:', error);
        }finally{
            setTimeout(() => {
                handleClose();
                setSuccessMessage('');
                setErrorMessage('');
                setAmount(0);
            }, 1500);
        }
    };

    const handleSubmit = async () => {
        // Verifică dacă ambele câmpuri sunt completate
        if (!amount || !description) {
            setErrorMessage('Te rog să completezi toate câmpurile!');
            return; // Oprește execuția dacă câmpurile sunt goale
        }
        await handleAddMoney(Number(amount), description);
    };

    return (
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title>Adaugă Bani</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form.Group controlId="formAmount">
                        <Form.Label>Suma</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Introduceți suma"
                            value={amount || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numberValue = Number(value)
                                setAmount(numberValue);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Descriere</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Introduceți descrierea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Închide
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Adaugă
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddMoneyModal;
