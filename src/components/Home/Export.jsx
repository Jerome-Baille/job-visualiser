import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Layout';
import { useOpportunityService } from '../../services/opportunityService';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { getTokenAndUserId } from '../../utils/authUtils';

function ExportData() {
    const { exportOpportunities } = useOpportunityService();
    const { user } = useContext(AuthContext);
    const [selectedFormat, setSelectedFormat] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Download the data as an excel file or a PDF file
    const handleExportClick = () => {
        if (!user.userId || !user.accessToken) {
            let {userId } = getTokenAndUserId();
            exportOpportunities(selectedYear, selectedFormat, userId)
            .catch((err) => {
                console.log(err);
            });
        };
        exportOpportunities(selectedYear, selectedFormat, user.userId)
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            className='export-container'
        >
        <Form.Select
            value={selectedYear}
            id='export-year'
            onChange={(e) => setSelectedYear(e.target.value)}
        >
            <option value="">Select a year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="0000">All</option>
        </Form.Select>
        <Form.Select 
            value={selectedFormat} 
            id='export-format'
            onChange={(e) => setSelectedFormat(e.target.value)}
        >
            <option value="">Select a format</option>
            <option value="excel">Excel</option>
            <option value="pdf">PDF</option>
        </Form.Select>
        <Button 
            variant="outline-primary"
            onClick={handleExportClick} 
            disabled={!selectedFormat && !selectedYear}
        >
            Export
        </Button>
        </div>
    );
}

export default ExportData;
