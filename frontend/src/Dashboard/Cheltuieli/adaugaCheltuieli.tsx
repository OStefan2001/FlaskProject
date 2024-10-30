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
    const [category, setCategory] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const handleAddExpenses = async (amount: number, description: string) => {
        try {
            const response = await fetch('/api/add_cheltuieli', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, description, category }),
            });
            if (!response.ok) {
                throw new Error('Eroare la adăugarea banilor');
            } else {
                setSuccessMessage('Suma a fost adaugata cu succes!');
            }
        } catch (error) {
            console.error('Eroare:', error);
            setErrorMessage('Eroare: ' + error);
        } finally {
            setTimeout(() => {
                handleClose();
                setSuccessMessage('');
                setErrorMessage('');
                setAmount(0);
            }, 1500);
        }
    };

    const handleSubmit = async () => {
        if (!amount || !description || !category) {
            setErrorMessage('Te rog să completezi toate câmpurile!');
            return; // Oprește execuția dacă câmpurile sunt goale
        }
        await handleAddExpenses(Number(amount), description);
    };

    return (
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title>Adaugă Cheltuieli</Modal.Title>
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
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categorie cheltuială</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Selectați o categorie</option>
                            <option value="utilitati">Utilități</option>
                            <option value="mancare">Mâncare</option>
                            <option value="personale">Personale</option>
                            <option value="autovehicul">Autovehicul</option>
                        </Form.Select>
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
