import React, { useEffect, useState } from 'react';

const Table = ({ key, headers, data, actions, getAllDatosList, limit, setLimit, totalPages, totalRegister, currentPage, setCurrentPage }) => {

  useEffect(() => {
    getAllDatosList(limit, currentPage);
  }, [currentPage, limit]);

  const renderCell = (item, header) => {
    if (header.key === 'actions') {
      return (
        <td>
          {actions.map((action, index) => (
            <button className={action.class} key={index} onClick={() => action.onClick(item)}>
              {action.label}
            </button>
          ))}
        </td>
      );
    }
    return <td>{item[header.key]}</td>;
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <table>
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header.label}</th>
                ))}
                </tr>
            </thead>
            <tbody key={key}>
                {data.length > 0 && 
                  data.map((item, index) => (
                    <tr key={index}>
                    {headers.map((header, index) => renderCell(item, header))}
                    </tr>
                  ))
                }
            </tbody>
        </table>
        {data.length > 0 ?
          <div className="pagination-container">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span className="pagination-info">{`Página ${currentPage} de ${totalPages} - Total registros ${totalRegister}`}</span>
            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div> :
          <div className='no-data-table'>
            <p>No hay datos que mostrar</p>
          </div>
        }
    </>
  );
};

export default Table;
