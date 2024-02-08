import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

export const ViewerModal = ({ file, showModal, handleClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>PDF Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: 'transparent' }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.open(file, '_blank')} download>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
