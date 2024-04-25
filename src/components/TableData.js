import React from 'react';

const Table = ({ headers, data, actions }) => {
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
            <tbody>
                {data.length > 0 && 
                  data.map((item, index) => (
                    <tr key={index}>
                    {headers.map((header, index) => renderCell(item, header))}
                    </tr>
                  ))
                }
            </tbody>
        </table>
        {data.length === 0 &&
          <div className='no-data-table'>
            <p>No hay datos que mostrar</p>
          </div>
        }
    </>
  );
};

export default Table;