//CSS
import './Header.css';

//REACT HOOKS
import React from 'react';

const Header = () => {
  return (
    <div>
      <h1 className='headerH1'> lab shopping list</h1>
      <h2 className='headerH2'>
        <h3>Bem vindos ao sistema de lista de compras:<br/></h3>
        <h3>Lab Shopping List.</h3>
        <li>Facilite o dia a dia criando uma lista personalizada de compras.<br /></li>
        <li>Altere o valor de cada item para auxiliar com os gastos.<br /></li>
        <li>Comece a utilizar agora mesmo, inserindo itens na lista.<br /></li>
      </h2>
    </div>
  )
}

export default Header;