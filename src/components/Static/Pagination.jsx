import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="pagination">
            <Button
                variant="contained"
                color="primary"
                startIcon={<NavigateBeforeIcon />}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Précédent
            </Button>
            <Typography style={{margin: '0 10px'}}>
                Page {currentPage} de {totalPages}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                endIcon={<NavigateNextIcon />}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Suivant
            </Button>
        </div>
    );
};

export default Pagination;
