import React from 'react'

const Card = ({
  deleteCard,
  editCard,
  id,
  name,
  color,
  schwierigkeit,
  zauberdauer,
  kosten,
  reichweite,
  wirkungsdauer,
  wirkung,
  erfolgsgrade
}) => (
  <div className={`block`} style={{backgroundColor: color}}>
   
    <div className="buttonBar">
     {deleteCard && <button className="deleteButton" onClick={() => deleteCard(id)}>Löschen</button>}
     {editCard && <button className="updateButton" onClick={() => editCard(id , {id, name, color, schwierigkeit, zauberdauer, kosten,reichweite, wirkungsdauer, wirkung, erfolgsgrade} )}>Editieren</button>}
    </div>
    <table>
      <tbody>
      <tr>
        <th colSpan="6" className="name">
          <h2>{name}</h2>
        </th>
      </tr>
      <tr>
        <th className="">{schwierigkeit && 'Schw.:'}</th>
        <td className="schwierigkeit" colSpan="2">{schwierigkeit}</td>
        <th className="">{zauberdauer && 'ZD:'}</th>
        <td className="zauberdauer" colSpan="2">{zauberdauer}</td>
      </tr>
      <tr>
        <th className="">{kosten && 'Fokus:'}</th>
        <td className="kosten">{kosten}</td>
        <th className="">{reichweite && 'RW:'}</th>
        <td className="reichweite">{reichweite}</td>
        <th className="">{wirkungsdauer && 'WD:'}</th>
        <td className="wirkungsdauer">{wirkungsdauer}</td>
      </tr>
      <tr>
        <td className="wirkung" colSpan="6">
          {wirkung}
        </td>
      </tr>
      <tr>
        <th className="erfolgsgrade" colSpan="6">{erfolgsgrade && (erfolgsgrade.enchanted || erfolgsgrade.verbesserung) && 'Erfolgsgrade:'}</th>
      </tr>
      <tr>
        <td className="verbesserung" colSpan="6">{(erfolgsgrade && erfolgsgrade.verbesserung.join(', ')) || ''}</td>
      </tr>
      <tr>
        <td className="enchanted" colSpan="6">{(erfolgsgrade && erfolgsgrade.enchanted) || ''}</td>
      </tr>
      </tbody>
    </table>
  </div>
)

export default Card
