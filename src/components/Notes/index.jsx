import React, { useContext, useEffect, useState } from 'react';
import { getProfile, updateUser } from "../../services/authService";
import { Button, Card, Form } from 'react-bootstrap';
import { AuthContext } from '../Layout';
import { useToast } from '../../contexts/ToastContext';

function JobSearchNotes() {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        if (!user.accessToken) return;
        getProfile(user.accessToken)
            .then(res => setNotes(res.body.notes))
            .catch(err => console.log(err));
    }, [user.accessToken]);

    const handleSaveNotes = (e) => {
        e.preventDefault();

        const profile = { notes };

        updateUser(profile, user.accessToken)
            .then(res => {
                showToast('success', res.body.message);
            })
            .catch(err => {
                showToast('error', err.message);
                console.error(err);
            })
    };

    const handleInputChange = (e) => {
        setNotes(e.target.value);
    }

    return (
        <Card className='d-flex flex-column'>
            <Card.Body className='d-flex flex-column'>
                <Form>
                    <Form.Group controlId="jobSearchNotes" className='mb-3' style={{ maxHeight: '500px', overflow: 'auto' }}>
                        <Form.Label>To-do list</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name='notes'
                            value={notes}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSaveNotes}>
                    Submit
                </Button>
            </Card.Body>
        </Card>
    );
}

export default JobSearchNotes;