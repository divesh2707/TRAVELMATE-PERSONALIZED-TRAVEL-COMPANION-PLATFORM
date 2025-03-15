import React from "react";
import ReactDOM from "react-dom";
import "../styles/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, cityName }) => {
    if (!isOpen) return null; // Don't render if modal is not open

    return ReactDOM.createPortal(
        <div className="deleteConfirm-modal-overlay">
            <div className="deleteConfirm-modal-content">
                <h3>Are you sure you want to Delete <strong>{cityName}</strong>?</h3>
                <div className="deleteConfirm-modal-actions">
                    <button className="deleteConfirm-cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="deleteConfirm-delete-btn" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>,document.getElementById("deleteConfirm-modal-root")
    );
};

export default DeleteConfirmationModal;
